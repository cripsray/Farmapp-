import React from 'react';

/**
 * MOCKUP VISUAL - Panel Administrador
 * CRUD completo de productos
 */
const AdminMockup = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header/Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-indigo-600">💊 FarmApp - Admin</h1>
            </div>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-gray-700 hover:text-indigo-600">Productos</a>
              <a href="#" className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700">Cerrar Sesión</a>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Panel de Administración</h2>
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transform hover:scale-105 transition">
            ➕ Agregar Producto
          </button>
        </div>

        {/* Tabla de Productos */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-indigo-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Imagen</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-blue-100 rounded flex items-center justify-center">
                    <span className="text-xl">💊</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">Paracetamol 500mg</div>
                  <div className="text-sm text-gray-500">Analgésico y antipirético</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Medicamentos</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-indigo-600">$5.99</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">50</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-3">✏️ Editar</button>
                  <button className="text-red-600 hover:text-red-900">🗑️ Eliminar</button>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded flex items-center justify-center">
                    <span className="text-xl">💉</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">Vitamina C 1000mg</div>
                  <div className="text-sm text-gray-500">Suplemento vitamínico</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Vitaminas</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-indigo-600">$12.99</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">30</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-3">✏️ Editar</button>
                  <button className="text-red-600 hover:text-red-900">🗑️ Eliminar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Modal de Agregar/Editar Producto */}
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full hidden" id="modal">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Agregar Producto</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg" rows="3"></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Precio</label>
                  <input type="number" step="0.01" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                  <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option>Medicamentos</option>
                  <option>Vitaminas</option>
                  <option>Cuidado Personal</option>
                  <option>Primeros Auxilios</option>
                </select>
              </div>
              <div className="flex space-x-3">
                <button type="submit" className="flex-1 bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700">
                  Guardar
                </button>
                <button type="button" className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-300">
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMockup;

