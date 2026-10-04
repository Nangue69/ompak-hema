import { createHash } from 'node:crypto';

const [usuario, password] = process.argv.slice(2);

if (!usuario || !password) {
  console.log('Uso: node scripts/crear-usuario.mjs <key-user> <contrasena>');
  process.exit(1);
}

const hash = createHash('sha256').update(`${usuario.toLowerCase()}:${password}`).digest('hex');

console.log('\nPega esta linea en src/auth/usuarios.json:\n');
console.log(`  { "usuario": "${usuario.toLowerCase()}", "hash": "${hash}" },\n`);
