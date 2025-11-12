require('dotenv').config();
const mysql = require('mysql2/promise');

async function testConnection() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'farmapp',
      port: process.env.DB_PORT || 3306
    });
    
    console.log('✅ Conexión exitosa a la base de datos!');
    const [rows] = await connection.execute('SELECT COUNT(*) as count FROM productos');
    console.log(`📦 Productos en la base de datos: ${rows[0].count}`);
    await connection.end();
  } catch (error) {
    console.error('❌ Error de conexión:', error.message);
    console.log('\n💡 Soluciones:');
    console.log('1. Verifica que MySQL esté corriendo');
    console.log('2. Verifica la contraseña en C:\\backend\\.env');
    console.log('3. Si no tienes contraseña, deja DB_PASSWORD= vacío');
    console.log('4. Si tienes contraseña, agrega: DB_PASSWORD=tu_contraseña');
  }
}

testConnection();

