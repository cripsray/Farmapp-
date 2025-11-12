import React from 'react';

/**
 * MOCKUP VISUAL - Página de Pago Simulado
 * Muestra datos del pedido y botón de confirmar pago
 */
const PaymentMockup = () => {
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
              <a href="#" className="text-gray-700 hover:text-indigo-600">Carrito</a>
              <a href="#" className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium">Cerrar Sesión</a>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">💳 Proceso de Pago</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Resumen del Pedido */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Resumen del Pedido</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-4 border-b">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">💊</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Paracetamol 500mg</h4>
                      <p className="text-sm text-gray-600">Cantidad: 2</p>
                    </div>
                  </div>
                  <span className="text-lg font-bold text-indigo-600">$11.98</span>
                </div>
                <div className="flex items-center justify-between pb-4 border-b">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">💉</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Vitamina C 1000mg</h4>
                      <p className="text-sm text-gray-600">Cantidad: 1</p>
                    </div>
                  </div>
                  <span className="text-lg font-bold text-indigo-600">$12.99</span>
                </div>
              </div>
            </div>

            {/* Información de Pago */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Información de Pago</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Método de Pago</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
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
              </form>
            </div>
          </div>

          {/* Total y Confirmar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Total a Pagar</h3>
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
                  <div className="flex justify-between text-2xl font-bold text-gray-900">
                    <span>Total</span>
                    <span className="text-indigo-600">$26.97</span>
                  </div>
                </div>
              </div>
              <button className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-green-700 transform hover:scale-105 transition mb-3">
                ✅ Confirmar Pago
              </button>
              <button className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition">
                ← Volver al Carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMockup;

