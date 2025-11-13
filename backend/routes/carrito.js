const express = require('express');
const router = express.Router();
const pool = require('../db/connection'); // pool de pg
const { authenticateToken } = require('../middleware/auth');

// Obtener carrito del usuario
router.get('/', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT c.id, c.id_producto, c.cantidad, c.total, 
              p.nombre, p.descripcion, p.precio, p.stock, p.categoria, p.imagen_url
       FROM carrito c
       INNER JOIN productos p ON c.id_producto = p.id
       WHERE c.id_usuario = $1`,
      [req.user.id]
    );

    const items = result.rows;

    const totalGeneral = items.reduce((sum, item) => sum + parseFloat(item.total), 0);

    res.json({ items, total: totalGeneral.toFixed(2) });
  } catch (error) {
    console.error('Error al obtener carrito:', error);
    res.status(500).json({ error: 'Error al obtener carrito' });
  }
});

// Agregar producto al carrito
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { id_producto, cantidad } = req.body;

    if (!id_producto || !cantidad || cantidad < 1) {
      return res.status(400).json({ error: 'ID de producto y cantidad válida son requeridos' });
    }

    // Verificar que el producto existe y tiene stock
    const productoRes = await pool.query(
      'SELECT * FROM productos WHERE id = $1',
      [id_producto]
    );
    if (productoRes.rows.length === 0) return res.status(404).json({ error: 'Producto no encontrado' });
    const producto = productoRes.rows[0];
    if (producto.stock < cantidad) return res.status(400).json({ error: 'Stock insuficiente' });

    // Verificar si ya está en carrito
    const existingRes = await pool.query(
      'SELECT * FROM carrito WHERE id_usuario = $1 AND id_producto = $2',
      [req.user.id, id_producto]
    );

    const total = producto.precio * cantidad;

    if (existingRes.rows.length > 0) {
      const newCantidad = existingRes.rows[0].cantidad + cantidad;
      const newTotal = producto.precio * newCantidad;

      if (producto.stock < newCantidad) return res.status(400).json({ error: 'Stock insuficiente' });

      await pool.query(
        'UPDATE carrito SET cantidad = $1, total = $2 WHERE id_usuario = $3 AND id_producto = $4',
        [newCantidad, newTotal, req.user.id, id_producto]
      );

      res.json({ message: 'Producto actualizado en el carrito' });
    } else {
      await pool.query(
        'INSERT INTO carrito (id_usuario, id_producto, cantidad, total) VALUES ($1, $2, $3, $4)',
        [req.user.id, id_producto, cantidad, total]
      );
      res.status(201).json({ message: 'Producto agregado al carrito' });
    }
  } catch (error) {
    console.error('Error al agregar al carrito:', error);
    res.status(500).json({ error: 'Error al agregar producto al carrito' });
  }
});

// Actualizar cantidad en el carrito
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { cantidad } = req.body;

    if (!cantidad || cantidad < 1) return res.status(400).json({ error: 'Cantidad válida es requerida' });

    const itemRes = await pool.query(
      `SELECT c.*, p.precio, p.stock 
       FROM carrito c
       INNER JOIN productos p ON c.id_producto = p.id
       WHERE c.id = $1 AND c.id_usuario = $2`,
      [id, req.user.id]
    );
    if (itemRes.rows.length === 0) return res.status(404).json({ error: 'Item no encontrado en el carrito' });

    const item = itemRes.rows[0];
    if (item.stock < cantidad) return res.status(400).json({ error: 'Stock insuficiente' });

    const total = item.precio * cantidad;

    await pool.query(
      'UPDATE carrito SET cantidad = $1, total = $2 WHERE id = $3',
      [cantidad, total, id]
    );

    res.json({ message: 'Carrito actualizado' });
  } catch (error) {
    console.error('Error al actualizar carrito:', error);
    res.status(500).json({ error: 'Error al actualizar carrito' });
  }
});

// Eliminar producto del carrito
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM carrito WHERE id = $1 AND id_usuario = $2 RETURNING *',
      [id, req.user.id]
    );

    if (result.rowCount === 0) return res.status(404).json({ error: 'Item no encontrado en el carrito' });

    res.json({ message: 'Producto eliminado del carrito' });
  } catch (error) {
    console.error('Error al eliminar del carrito:', error);
    res.status(500).json({ error: 'Error al eliminar producto del carrito' });
  }
});

// Limpiar carrito completo
router.delete('/', authenticateToken, async (req, res) => {
  try {
    await pool.query(
      'DELETE FROM carrito WHERE id_usuario = $1',
      [req.user.id]
    );
    res.json({ message: 'Carrito limpiado exitosamente' });
  } catch (error) {
    console.error('Error al limpiar carrito:', error);
    res.status(500).json({ error: 'Error al limpiar carrito' });
  }
});

module.exports = router;

