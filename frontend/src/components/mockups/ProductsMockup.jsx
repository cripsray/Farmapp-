import React from 'react';

/**
 * MOCKUP VISUAL - Página de Productos
 * Catálogo con buscador, filtros y botones de agregar al carrito
 */
const ProductsMockup = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header/Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-indigo-600">💊 FarmApp</h1>
            </div>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-gray-700 hover:text-indigo-600">Carrito (3)</a>
              <a href="#" className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium">Cerrar Sesión</a>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Título y Buscador */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Catálogo de Productos</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="🔍 Buscar productos..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <select className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
              <option>Todas las categorías</option>
              <option>Medicamentos</option>
              <option>Vitaminas</option>
              <option>Cuidado Personal</option>
              <option>Primeros Auxilios</option>
            </select>
          </div>
        </div>

        {/* Grid de Productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Producto 1 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
            <div className="h-48 bg-gradient-to-br from-indigo-100 to-blue-100 flex items-center justify-center">
              <span className="text-6xl">💊</span>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Paracetamol 500mg</h3>
              <p className="text-sm text-gray-600 mb-3">Analgésico y antipirético</p>
              <div className="flex justify-between items-center mb-3">
                <span className="text-2xl font-bold text-indigo-600">$5.99</span>
                <span className="text-sm text-green-600">Stock: 50</span>
              </div>
              <button className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transform hover:scale-105 transition">
                🛒 Agregar al Carrito
              </button>
            </div>
          </div>

          {/* Producto 2 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
            <div className="h-48 bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
              <span className="text-6xl">💉</span>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Vitamina C 1000mg</h3>
              <p className="text-sm text-gray-600 mb-3">Suplemento vitamínico</p>
              <div className="flex justify-between items-center mb-3">
                <span className="text-2xl font-bold text-indigo-600">$12.99</span>
                <span className="text-sm text-green-600">Stock: 30</span>
              </div>
              <button className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transform hover:scale-105 transition">
                🛒 Agregar al Carrito
              </button>
            </div>
          </div>

          {/* Producto 3 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
            <div className="h-48 bg-gradient-to-br from-pink-100 to-rose-100 flex items-center justify-center">
              <span className="text-6xl">🧴</span>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Jabón Antibacterial</h3>
              <p className="text-sm text-gray-600 mb-3">Cuidado personal</p>
              <div className="flex justify-between items-center mb-3">
                <span className="text-2xl font-bold text-indigo-600">$3.50</span>
                <span className="text-sm text-green-600">Stock: 100</span>
              </div>
              <button className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transform hover:scale-105 transition">
                🛒 Agregar al Carrito
              </button>
            </div>
          </div>

          {/* Producto 4 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
            <div className="h-48 bg-gradient-to-br from-yellow-100 to-amber-100 flex items-center justify-center">
              <span className="text-6xl">🩹</span>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Vendas Elásticas</h3>
              <p className="text-sm text-gray-600 mb-3">Primeros auxilios</p>
              <div className="flex justify-between items-center mb-3">
                <span className="text-2xl font-bold text-indigo-600">$8.99</span>
                <span className="text-sm text-green-600">Stock: 25</span>
              </div>
              <button className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transform hover:scale-105 transition">
                🛒 Agregar al Carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsMockup;

