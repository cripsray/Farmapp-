const express = require('express');
const router = express.Router();
const pool = require('../db/connection'); // tu pool de PostgreSQL
const { authenticateToken, isAdmin } = require('../middleware/auth');

// Obtener todos los productos (público) con filtros
router.get('/', async (req, res) => {
  try {
    const { categoria, busqueda } = req.query;
    let query = 'SELECT * FROM productos WHERE 1=1';
    const params = [];
    let count = 1;

    if (categoria && categoria !== 'Todas las categorías') {
      query += ` AND categoria = $${count}`;
      params.push(categoria);
      count++;
    }

    if (busqueda) {
      query += ` AND (nombre ILIKE $${count} OR descripcion ILIKE $${count + 1})`;
      const searchTerm = `%${busqueda}%`;
      params.push(searchTerm, searchTerm);
      count += 2;
    }

    query += ' ORDER BY nombre ASC';

    const result = await pool.query(query, params);
    res.json({ productos: result.rows });
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// Obtener un producto por ID (público)
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM productos WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json({ producto: result.rows[0] });
  } catch (error) {
    console.error('Error al obtener producto:', error);
    res.status(500).json({ error: 'Error al obtener producto' });
  }
});

// Crear producto (solo admin)
router.post('/', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock, categoria, imagen_url } = req.body;

    if (!nombre || precio === undefined || stock === undefined || !categoria) {
      return res.status(400).json({ error: 'Nombre, precio, stock y categoría son requeridos' });
    }
    if (precio < 0 || stock < 0) {
      return res.status(400).json({ error: 'Precio y stock deben ser valores positivos' });
    }

    const insertResult = await pool.query(
      'INSERT INTO productos (nombre, descripcion, precio, stock, categoria, imagen_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
      [nombre, descripcion || null, precio, stock, categoria, imagen_url || null]
    );

    const newProduct = await pool.query(
      'SELECT * FROM productos WHERE id = $1',
      [insertResult.rows[0].id]
    );

    res.status(201).json({
      message: 'Producto creado exitosamente',
      producto: newProduct.rows[0]
    });
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).json({ error: 'Error al crear producto' });
  }
});

// Actualizar producto (solo admin)
router.put('/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, precio, stock, categoria, imagen_url } = req.body;

    const existing = await pool.query('SELECT id FROM productos WHERE id = $1', [id]);
    if (existing.rows.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    if (precio !== undefined && precio < 0) {
      return res.status(400).json({ error: 'El precio debe ser positivo' });
    }
    if (stock !== undefined && stock < 0) {
      return res.status(400).json({ error: 'El stock debe ser positivo' });
    }

    await pool.query(
      `UPDATE productos SET 
        nombre = COALESCE($1, nombre),
        descripcion = COALESCE($2, descripcion),
        precio = COALESCE($3, precio),
        stock = COALESCE($4, stock),
        categoria = COALESCE($5, categoria),
        imagen_url = COALESCE($6, imagen_url)
      WHERE id = $7`,
      [nombre || null, descripcion || null, precio || null, stock || null, categoria || null, imagen_url || null, id]
    );

    const updated = await pool.query('SELECT * FROM productos WHERE id = $1', [id]);
    res.json({
      message: 'Producto actualizado exitosamente',
      producto: updated.rows[0]
    });
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
});

// Eliminar producto (solo admin)
router.delete('/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await pool.query('SELECT id FROM productos WHERE id = $1', [id]);
    if (existing.rows.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    await pool.query('DELETE FROM productos WHERE id = $1', [id]);
    res.json({ message: 'Producto eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
});

module.exports = router;
