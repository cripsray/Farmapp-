import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Bienvenido a FarmApp
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Tu farmacia de confianza con los mejores productos para tu salud
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                to="/productos"
                className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transform hover:scale-105 transition"
              >
                🛒 Ver Productos
              </Link>
              <Link
                to="/productos"
                className="bg-white text-indigo-600 border-2 border-indigo-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-50 transform hover:scale-105 transition"
              >
                📋 Catálogo
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition">
            <div className="text-4xl mb-4">💊</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Productos de Calidad</h3>
            <p className="text-gray-600">Medicamentos y productos farmacéuticos certificados</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition">
            <div className="text-4xl mb-4">🚚</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Entrega Rápida</h3>
            <p className="text-gray-600">Servicio de entrega eficiente y confiable</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition">
            <div className="text-4xl mb-4">👨‍⚕️</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Asesoría Profesional</h3>
            <p className="text-gray-600">Atención personalizada de farmacéuticos expertos</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

