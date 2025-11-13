const express = require('express');
const router = express.Router();
const pool = require('../db/connection'); // pool de pg
const { authenticateToken } = require('../middleware/auth');

// Procesar pago simulado
router.post('/simulado', authenticateToken, async (req, res) => {
  const client = await pool.connect();
  try {
    const { metodo_pago_simulado } = req.body;

    if (!metodo_pago_simulado) {
      return res.status(400).json({ error: 'Método de pago es requerido' });
    }

    // Obtener items del carrito
    const itemsRes = await client.query(
      `SELECT c.*, p.nombre, p.precio, p.stock
       FROM carrito c
       INNER JOIN productos p ON c.id_producto = p.id
       WHERE c.id_usuario = $1`,
      [req.user.id]
    );

    const items = itemsRes.rows;

    if (items.length === 0) {
      return res.status(400).json({ error: 'El carrito está vacío' });
    }

    // Calcular total
    const monto = items.reduce((sum, item) => sum + parseFloat(item.total), 0);

    // Verificar stock
    for (const item of items) {
      if (item.stock < item.cantidad) {
        return res.status(400).json({ error: `Stock insuficiente para ${item.nombre}` });
      }
    }

    // Iniciar transacción
    await client.query('BEGIN');

    try {
      // Registrar pago simulado
      const pagoResult = await client.query(
        'INSERT INTO pagos_simulados (id_usuario, monto, metodo_pago_simulado) VALUES ($1, $2, $3) RETURNING id',
        [req.user.id, monto, metodo_pago_simulado]
      );

      // Actualizar stock de productos
      for (const item of items) {
        await client.query(
          'UPDATE productos SET stock = stock - $1 WHERE id = $2',
          [item.cantidad, item.id_producto]
        );
      }

      // Limpiar carrito
      await client.query(
        'DELETE FROM carrito WHERE id_usuario = $1',
        [req.user.id]
      );

      await client.query('COMMIT');

      res.json({
        message: 'Pago procesado exitosamente (simulado)',
        pago: {
          id: pagoResult.rows[0].id,
          monto: monto.toFixed(2),
          metodo_pago_simulado,
          fecha: new Date()
        }
      });
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    }
  } catch (error) {
    console.error('Error al procesar pago:', error);
    res.status(500).json({ error: 'Error al procesar pago' });
  } finally {
    client.release();
  }
});

// Obtener historial de pagos del usuario
router.get('/historial', authenticateToken, async (req, res) => {
  try {
    const pagosRes = await pool.query(
      'SELECT * FROM pagos_simulados WHERE id_usuario = $1 ORDER BY fecha DESC',
      [req.user.id]
    );

    res.json({ pagos: pagosRes.rows });
  } catch (error) {
    console.error('Error al obtener historial:', error);
    res.status(500).json({ error: 'Error al obtener historial de pagos' });
  }
});

module.exports = router;
