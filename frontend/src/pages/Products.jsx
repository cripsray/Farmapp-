import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { productosAPI, carritoAPI } from '../services/api';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { formatCurrency } from '../utils/formatCurrency';

const Products = () => {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [categoria, setCategoria] = useState('Todas las categorías');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    loadProductos();
  }, [categoria, busqueda]);

  const loadProductos = async () => {
    try {
      setLoading(true);
      const params = {};
      if (categoria !== 'Todas las categorías') {
        params.categoria = categoria;
      }
      if (busqueda) {
        params.busqueda = busqueda;
      }
      const response = await productosAPI.getAll(params);
      setProductos(response.data.productos);
    } catch (error) {
      console.error('Error al cargar productos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (id) => {
    if (!user) {
      setMessage('Debes iniciar sesión para agregar productos al carrito');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    try {
      await carritoAPI.add({ id_producto: id, cantidad: 1 });
      setMessage('Producto agregado al carrito');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage(error.response?.data?.error || 'Error al agregar al carrito');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const categorias = ['Todas las categorías', 'Medicamentos', 'Vitaminas', 'Cuidado Personal', 'Primeros Auxilios'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Catálogo de Productos</h2>
        
        {message && (
          <div className={`mb-4 p-4 rounded-lg ${
            message.includes('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
          }`}>
            {message}
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="🔍 Buscar productos..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          >
            {categorias.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="text-gray-600">Cargando productos...</div>
          </div>
        ) : productos.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-600">No se encontraron productos</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {productos.map((producto) => (
              <div key={producto.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
                <div className="h-48 bg-gradient-to-br from-indigo-100 to-blue-100 flex items-center justify-center">
                  {producto.imagen_url ? (
                    <img src={producto.imagen_url} alt={producto.nombre} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-6xl">💊</span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{producto.nombre}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{producto.descripcion}</p>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-2xl font-bold text-indigo-600">{formatCurrency(producto.precio)}</span>
                    <span className={`text-sm px-2 py-1 rounded ${
                      producto.stock > 0 ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'
                    }`}>
                      Stock: {producto.stock}
                    </span>
                  </div>
                  <button
                    onClick={() => handleAddToCart(producto.id)}
                    disabled={producto.stock === 0}
                    className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transform hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    🛒 Agregar al Carrito
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;

