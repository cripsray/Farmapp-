const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');
require('dotenv').config();

async function createAdmin() {
  try {
    // Conectar a la base de datos
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'farmapp',
      port: process.env.DB_PORT || 3306
    });

    // Contraseña para admin
    const adminPassword = 'admin123';
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    // Eliminar admin existente si existe
    await connection.execute('DELETE FROM usuarios WHERE email = ?', ['admin@farmapp.com']);

    // Crear nuevo admin
    await connection.execute(
      'INSERT INTO usuarios (nombre, email, contraseña, rol) VALUES (?, ?, ?, ?)',
      ['Administrador', 'admin@farmapp.com', hashedPassword, 'admin']
    );

    console.log('✅ Usuario administrador creado exitosamente!');
    console.log('📧 Email: admin@farmapp.com');
    console.log('🔒 Contraseña: admin123');
    console.log('👤 Rol: admin');

    await connection.end();
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

createAdmin();

