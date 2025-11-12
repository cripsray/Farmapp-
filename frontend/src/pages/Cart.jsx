import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { carritoAPI } from '../services/api';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { formatCurrency } from '../utils/formatCurrency';

const Cart = () => {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
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
    } catch (error) {
      console.error('Error al cargar carrito:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (id, cantidad) => {
    if (cantidad < 1) return;
    try {
      await carritoAPI.update(id, { cantidad });
      loadCarrito();
    } catch (error) {
      alert(error.response?.data?.error || 'Error al actualizar cantidad');
    }
  };

  const removeItem = async (id) => {
    if (window.confirm('¿Eliminar este producto del carrito?')) {
      try {
        await carritoAPI.delete(id);
        loadCarrito();
      } catch (error) {
        alert(error.response?.data?.error || 'Error al eliminar producto');
      }
    }
  };

  const envio = 2.00;
  const totalConEnvio = total + envio;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Navbar />
        <div className="text-center py-12">Cargando carrito...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Carrito de Compras</h2>

        {items.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Tu carrito está vacío</h3>
            <p className="text-gray-600 mb-6">Agrega productos para continuar</p>
            <button
              onClick={() => navigate('/productos')}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700"
            >
              Ver Productos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-lg flex items-center justify-center">
                        {item.imagen_url ? (
                          <img src={item.imagen_url} alt={item.nombre} className="w-full h-full object-cover rounded-lg" />
                        ) : (
                          <span className="text-3xl">💊</span>
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{item.nombre}</h3>
                        <p className="text-sm text-gray-600">{formatCurrency(item.precio)} c/u</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.cantidad - 1)}
                          className="px-3 py-1 hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="px-4 py-1">{item.cantidad}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.cantidad + 1)}
                          className="px-3 py-1 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-lg font-bold text-indigo-600">{formatCurrency(item.total)}</span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Resumen de Compra</h3>
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
                    <div className="flex justify-between text-xl font-bold text-gray-900">
                      <span>Total</span>
                      <span className="text-indigo-600">{formatCurrency(totalConEnvio)}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/pago')}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transform hover:scale-105 transition mb-3"
                >
                  💳 Proceder al Pago
                </button>
                <button
                  onClick={() => navigate('/productos')}
                  className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
                >
                  ← Continuar Comprando
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

