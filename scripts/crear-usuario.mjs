import { createHash } from 'node:crypto';

const argumentos = process.argv.slice(2);
const permanente = argumentos.includes('--permanente');
const [usuario, password] = argumentos.filter((a) => a !== '--permanente');

if (!usuario || !password) {
  console.log('Uso: node scripts/crear-usuario.mjs <key-user> <contrasena> [--permanente]');
  console.log('     --permanente crea un usuario que no caduca a los cinco dias.');
  process.exit(1);
}

const hash = createHash('sha256').update(`${usuario.toLowerCase()}:${password}`).digest('hex');
const extra = permanente ? ', "permanente": true' : '';

console.log('\nPega esta linea en src/auth/usuarios.json:\n');
console.log(`  { "usuario": "${usuario.toLowerCase()}", "hash": "${hash}"${extra} },\n`);
