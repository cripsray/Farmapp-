const bcrypt = require('bcryptjs');

/**
 * Script de utilidad para generar contraseñas hasheadas
 * Uso: node utils/generatePassword.js <contraseña>
 */

const password = process.argv[2];

if (!password) {
  console.error('Uso: node utils/generatePassword.js <contraseña>');
  process.exit(1);
}

bcrypt.hash(password, 10, (err, hash) => {
  if (err) {
    console.error('Error al generar hash:', err);
    process.exit(1);
  }
  console.log('\nContraseña original:', password);
  console.log('Hash generado:', hash);
  console.log('\nCopia este hash para usar en la base de datos.\n');
});

