import { migrate } from 'drizzle-orm/neon-http/migrator';
import { db } from '../lib/db';

async function main() {
  console.log('🚀 Migration en cours...');
  await migrate(db, { migrationsFolder: 'drizzle' });
  console.log('✅ Migration terminée !');
  process.exit(0);
}

main().catch((err) => {
  console.error('❌ Erreur migration:', err);
  process.exit(1);
});