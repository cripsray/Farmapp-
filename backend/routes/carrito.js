const express = require('express');
const router = express.Router();
const pool = require('../db/connection');
const { authenticateToken } = require('../middleware/auth');

// Obtener carrito del usuario
router.get('/', authenticateToken, async (req, res) => {
  try {
    const [items] = await pool.execute(
      `SELECT c.id, c.id_producto, c.cantidad, c.total, 
              p.nombre, p.descripcion, p.precio, p.stock, p.categoria, p.imagen_url
       FROM carrito c
       INNER JOIN productos p ON c.id_producto = p.id
       WHERE c.id_usuario = ?`,
      [req.user.id]
    );

    // Calcular total general
    const totalGeneral = items.reduce((sum, item) => sum + parseFloat(item.total), 0);

    res.json({
      items,
      total: totalGeneral.toFixed(2)
    });
  } catch (error) {
    console.error('Error al obtener carrito:', error);
    res.status(500).json({ error: 'Error al obtener carrito' });
  }
});

// Agregar producto al carrito
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { id_producto, cantidad } = req.body;

    // Validaciones
    if (!id_producto || !cantidad || cantidad < 1) {
      return res.status(400).json({ error: 'ID de producto y cantidad válida son requeridos' });
    }

    // Verificar que el producto existe y tiene stock
    const [productos] = await pool.execute(
      'SELECT * FROM productos WHERE id = ?',
      [id_producto]
    );

    if (productos.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    const producto = productos[0];

    if (producto.stock < cantidad) {
      return res.status(400).json({ error: 'Stock insuficiente' });
    }

    // Verificar si el producto ya está en el carrito
    const [existing] = await pool.execute(
      'SELECT * FROM carrito WHERE id_usuario = ? AND id_producto = ?',
      [req.user.id, id_producto]
    );

    const total = producto.precio * cantidad;

    if (existing.length > 0) {
      // Actualizar cantidad y total
      const newCantidad = existing[0].cantidad + cantidad;
      const newTotal = producto.precio * newCantidad;

      if (producto.stock < newCantidad) {
        return res.status(400).json({ error: 'Stock insuficiente' });
      }

      await pool.execute(
        'UPDATE carrito SET cantidad = ?, total = ? WHERE id_usuario = ? AND id_producto = ?',
        [newCantidad, newTotal, req.user.id, id_producto]
      );

      res.json({ message: 'Producto actualizado en el carrito' });
    } else {
      // Agregar nuevo item al carrito
      await pool.execute(
        'INSERT INTO carrito (id_usuario, id_producto, cantidad, total) VALUES (?, ?, ?, ?)',
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

    if (!cantidad || cantidad < 1) {
      return res.status(400).json({ error: 'Cantidad válida es requerida' });
    }

    // Obtener item del carrito
    const [items] = await pool.execute(
      `SELECT c.*, p.precio, p.stock 
       FROM carrito c
       INNER JOIN productos p ON c.id_producto = p.id
       WHERE c.id = ? AND c.id_usuario = ?`,
      [id, req.user.id]
    );

    if (items.length === 0) {
      return res.status(404).json({ error: 'Item no encontrado en el carrito' });
    }

    const item = items[0];

    if (item.stock < cantidad) {
      return res.status(400).json({ error: 'Stock insuficiente' });
    }

    const total = item.precio * cantidad;

    await pool.execute(
      'UPDATE carrito SET cantidad = ?, total = ? WHERE id = ?',
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

    const [result] = await pool.execute(
      'DELETE FROM carrito WHERE id = ? AND id_usuario = ?',
      [id, req.user.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Item no encontrado en el carrito' });
    }

    res.json({ message: 'Producto eliminado del carrito' });
  } catch (error) {
    console.error('Error al eliminar del carrito:', error);
    res.status(500).json({ error: 'Error al eliminar producto del carrito' });
  }
});

// Limpiar carrito completo
router.delete('/', authenticateToken, async (req, res) => {
  try {
    await pool.execute(
      'DELETE FROM carrito WHERE id_usuario = ?',
      [req.user.id]
    );

    res.json({ message: 'Carrito limpiado exitosamente' });
  } catch (error) {
    console.error('Error al limpiar carrito:', error);
    res.status(500).json({ error: 'Error al limpiar carrito' });
  }
});

module.exports = router;

