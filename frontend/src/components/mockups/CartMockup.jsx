import React from 'react';

/**
 * MOCKUP VISUAL - Página de Carrito de Compras
 * Muestra productos, cantidades, total y opción de pago
 */
const CartMockup = () => {
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
              <a href="#" className="text-gray-700 hover:text-indigo-600">Productos</a>
              <a href="#" className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium">Cerrar Sesión</a>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Carrito de Compras</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de Productos */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-3xl">💊</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Paracetamol 500mg</h3>
                    <p className="text-sm text-gray-600">$5.99 c/u</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button className="px-3 py-1 hover:bg-gray-100">-</button>
                    <span className="px-4 py-1">2</span>
                    <button className="px-3 py-1 hover:bg-gray-100">+</button>
                  </div>
                  <span className="text-lg font-bold text-indigo-600">$11.98</span>
                  <button className="text-red-500 hover:text-red-700">🗑️</button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg flex items-center justify-center">
                    <span className="text-3xl">💉</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Vitamina C 1000mg</h3>
                    <p className="text-sm text-gray-600">$12.99 c/u</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button className="px-3 py-1 hover:bg-gray-100">-</button>
                    <span className="px-4 py-1">1</span>
                    <button className="px-3 py-1 hover:bg-gray-100">+</button>
                  </div>
                  <span className="text-lg font-bold text-indigo-600">$12.99</span>
                  <button className="text-red-500 hover:text-red-700">🗑️</button>
                </div>
              </div>
            </div>
          </div>

          {/* Resumen de Compra */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Resumen de Compra</h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>$24.97</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Envío</span>
                  <span>$2.00</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-xl font-bold text-gray-900">
                    <span>Total</span>
                    <span className="text-indigo-600">$26.97</span>
                  </div>
                </div>
              </div>
              <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transform hover:scale-105 transition mb-3">
                💳 Proceder al Pago
              </button>
              <button className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition">
                ← Continuar Comprando
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartMockup;

