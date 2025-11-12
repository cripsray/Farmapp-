import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { carritoAPI, pagosAPI } from '../services/api';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { formatCurrency } from '../utils/formatCurrency';

const Payment = () => {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [metodoPago, setMetodoPago] = useState('Tarjeta de Crédito (Simulado)');
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    loadCarrito();
  }, [user, navigate]);

  const loadCarrito = async () => {
    try {
      setLoading(true);
      const response = await carritoAPI.get();
      setItems(response.data.items);
      setTotal(parseFloat(response.data.total));
      if (response.data.items.length === 0) {
        navigate('/carrito');
      }
    } catch (error) {
      console.error('Error al cargar carrito:', error);
      navigate('/carrito');
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    if (!metodoPago) {
      alert('Selecciona un método de pago');
      return;
    }

    setProcessing(true);
    try {
      await pagosAPI.procesarPago({ metodo_pago_simulado: metodoPago });
      alert('¡Pago procesado exitosamente! (Simulado)');
      navigate('/productos');
    } catch (error) {
      alert(error.response?.data?.error || 'Error al procesar el pago');
    } finally {
      setProcessing(false);
    }
  };

  const envio = 2.00;
  const totalConEnvio = total + envio;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Navbar />
        <div className="text-center py-12">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">💳 Proceso de Pago</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Resumen del Pedido</h3>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between pb-4 border-b">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-lg flex items-center justify-center">
                        {item.imagen_url ? (
                          <img src={item.imagen_url} alt={item.nombre} className="w-full h-full object-cover rounded-lg" />
                        ) : (
                          <span className="text-2xl">💊</span>
                        )}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{item.nombre}</h4>
                        <p className="text-sm text-gray-600">Cantidad: {item.cantidad}</p>
                      </div>
                    </div>
                    <span className="text-lg font-bold text-indigo-600">{formatCurrency(item.total)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Información de Pago</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Método de Pago</label>
                  <select
                    value={metodoPago}
                    onChange={(e) => setMetodoPago(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  >
                    <option>💳 Tarjeta de Crédito (Simulado)</option>
                    <option>🏦 Transferencia Bancaria (Simulado)</option>
                    <option>💰 Efectivo (Simulado)</option>
                  </select>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">
                    ⚠️ <strong>Nota:</strong> Este es un pago simulado. No se realizará ninguna transacción real.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Total a Pagar</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>{formatCurrency(total)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Envío</span>
                    <span>{formatCurrency(envio)}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-2xl font-bold text-gray-900">
                      <span>Total</span>
                      <span className="text-indigo-600">{formatCurrency(totalConEnvio)}</span>
                    </div>
                  </div>
                </div>
              <button
                onClick={handlePayment}
                disabled={processing}
                className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-green-700 transform hover:scale-105 transition disabled:opacity-50 mb-3"
              >
                {processing ? 'Procesando...' : '✅ Confirmar Pago'}
              </button>
              <button
                onClick={() => navigate('/carrito')}
                className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
              >
                ← Volver al Carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;

