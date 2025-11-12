const express = require('express');
const router = express.Router();
const pool = require('../db/connection');
const { authenticateToken, isAdmin } = require('../middleware/auth');

// Obtener todos los productos (público)
router.get('/', async (req, res) => {
  try {
    const { categoria, busqueda } = req.query;
    let query = 'SELECT * FROM productos WHERE 1=1';
    const params = [];

    if (categoria && categoria !== 'Todas las categorías') {
      query += ' AND categoria = ?';
      params.push(categoria);
    }

    if (busqueda) {
      query += ' AND (nombre LIKE ? OR descripcion LIKE ?)';
      const searchTerm = `%${busqueda}%`;
      params.push(searchTerm, searchTerm);
    }

    query += ' ORDER BY nombre ASC';

    const [productos] = await pool.execute(query, params);

    res.json({ productos });
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// Obtener un producto por ID (público)
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [productos] = await pool.execute(
      'SELECT * FROM productos WHERE id = ?',
      [id]
    );

    if (productos.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json({ producto: productos[0] });
  } catch (error) {
    console.error('Error al obtener producto:', error);
    res.status(500).json({ error: 'Error al obtener producto' });
  }
});

// Crear producto (solo admin)
router.post('/', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock, categoria, imagen_url } = req.body;

    // Validaciones
    if (!nombre || !precio || !stock || !categoria) {
      return res.status(400).json({ error: 'Nombre, precio, stock y categoría son requeridos' });
    }

    if (precio < 0 || stock < 0) {
      return res.status(400).json({ error: 'Precio y stock deben ser valores positivos' });
    }

    const [result] = await pool.execute(
      'INSERT INTO productos (nombre, descripcion, precio, stock, categoria, imagen_url) VALUES (?, ?, ?, ?, ?, ?)',
      [nombre, descripcion || null, precio, stock, categoria, imagen_url || null]
    );

    const [newProduct] = await pool.execute(
      'SELECT * FROM productos WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json({
      message: 'Producto creado exitosamente',
      producto: newProduct[0]
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

    // Verificar que el producto existe
    const [existing] = await pool.execute(
      'SELECT id FROM productos WHERE id = ?',
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // Validaciones
    if (precio !== undefined && precio < 0) {
      return res.status(400).json({ error: 'El precio debe ser un valor positivo' });
    }

    if (stock !== undefined && stock < 0) {
      return res.status(400).json({ error: 'El stock debe ser un valor positivo' });
    }

    await pool.execute(
      'UPDATE productos SET nombre = COALESCE(?, nombre), descripcion = COALESCE(?, descripcion), precio = COALESCE(?, precio), stock = COALESCE(?, stock), categoria = COALESCE(?, categoria), imagen_url = COALESCE(?, imagen_url) WHERE id = ?',
      [nombre || null, descripcion || null, precio || null, stock || null, categoria || null, imagen_url || null, id]
    );

    const [updatedProduct] = await pool.execute(
      'SELECT * FROM productos WHERE id = ?',
      [id]
    );

    res.json({
      message: 'Producto actualizado exitosamente',
      producto: updatedProduct[0]
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

    // Verificar que el producto existe
    const [existing] = await pool.execute(
      'SELECT id FROM productos WHERE id = ?',
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    await pool.execute('DELETE FROM productos WHERE id = ?', [id]);

    res.json({ message: 'Producto eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
});

module.exports = router;

