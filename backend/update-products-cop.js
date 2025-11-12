const mysql = require('mysql2/promise');
require('dotenv').config();

async function updateProducts() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'farmapp',
      port: process.env.DB_PORT || 3306
    });

    // Actualizar precios a COP (aproximadamente 1 USD = 4000 COP)
    // Y mejorar URLs de imágenes
    const updates = [
      {
        id: 1,
        nombre: 'Paracetamol 500mg',
        precio: 23960, // ~$5.99 USD
        imagen_url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop'
      },
      {
        id: 2,
        nombre: 'Vitamina C 1000mg',
        precio: 51960, // ~$12.99 USD
        imagen_url: 'https://images.unsplash.com/photo-1550572017-edd951b55104?w=400&h=400&fit=crop'
      },
      {
        id: 3,
        nombre: 'Jabón Antibacterial',
        precio: 14000, // ~$3.50 USD
        imagen_url: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop'
      },
      {
        id: 4,
        nombre: 'Vendas Elásticas',
        precio: 35960, // ~$8.99 USD
        imagen_url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop'
      },
      {
        id: 5,
        nombre: 'Ibuprofeno 400mg',
        precio: 30000, // ~$7.50 USD
        imagen_url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop'
      },
      {
        id: 6,
        nombre: 'Multivitamínico',
        precio: 63960, // ~$15.99 USD
        imagen_url: 'https://images.unsplash.com/photo-1550572017-edd951b55104?w=400&h=400&fit=crop'
      }
    ];

    for (const product of updates) {
      await connection.execute(
        'UPDATE productos SET precio = ?, imagen_url = ? WHERE id = ?',
        [product.precio, product.imagen_url, product.id]
      );
      console.log(`✅ Actualizado: ${product.nombre} - ${product.precio} COP`);
    }

    console.log('\n✅ Todos los productos actualizados a COP con imágenes mejoradas!');
    await connection.end();
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

updateProducts();

