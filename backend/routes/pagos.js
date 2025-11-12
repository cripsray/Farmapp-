const express = require('express');
const router = express.Router();
const pool = require('../db/connection');
const { authenticateToken } = require('../middleware/auth');

// Procesar pago simulado
router.post('/simulado', authenticateToken, async (req, res) => {
  try {
    const { metodo_pago_simulado } = req.body;

    if (!metodo_pago_simulado) {
      return res.status(400).json({ error: 'Método de pago es requerido' });
    }

    // Obtener items del carrito
    const [items] = await pool.execute(
      `SELECT c.*, p.nombre, p.precio, p.stock
       FROM carrito c
       INNER JOIN productos p ON c.id_producto = p.id
       WHERE c.id_usuario = ?`,
      [req.user.id]
    );

    if (items.length === 0) {
      return res.status(400).json({ error: 'El carrito está vacío' });
    }

    // Calcular total
    const monto = items.reduce((sum, item) => sum + parseFloat(item.total), 0);

    // Verificar stock antes de procesar
    for (const item of items) {
      if (item.stock < item.cantidad) {
        return res.status(400).json({ 
          error: `Stock insuficiente para ${item.nombre}` 
        });
      }
    }

    // Iniciar transacción
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
      // Registrar pago simulado
      const [pagoResult] = await connection.execute(
        'INSERT INTO pagos_simulados (id_usuario, monto, metodo_pago_simulado) VALUES (?, ?, ?)',
        [req.user.id, monto, metodo_pago_simulado]
      );

      // Actualizar stock de productos
      for (const item of items) {
        await connection.execute(
          'UPDATE productos SET stock = stock - ? WHERE id = ?',
          [item.cantidad, item.id_producto]
        );
      }

      // Limpiar carrito
      await connection.execute(
        'DELETE FROM carrito WHERE id_usuario = ?',
        [req.user.id]
      );

      await connection.commit();

      res.json({
        message: 'Pago procesado exitosamente (simulado)',
        pago: {
          id: pagoResult.insertId,
          monto: monto.toFixed(2),
          metodo_pago_simulado,
          fecha: new Date()
        }
      });
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error al procesar pago:', error);
    res.status(500).json({ error: 'Error al procesar pago' });
  }
});

// Obtener historial de pagos del usuario
router.get('/historial', authenticateToken, async (req, res) => {
  try {
    const [pagos] = await pool.execute(
      'SELECT * FROM pagos_simulados WHERE id_usuario = ? ORDER BY fecha DESC',
      [req.user.id]
    );

    res.json({ pagos });
  } catch (error) {
    console.error('Error al obtener historial:', error);
    res.status(500).json({ error: 'Error al obtener historial de pagos' });
  }
});

module.exports = router;

