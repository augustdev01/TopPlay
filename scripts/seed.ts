import { seedDatabase } from '../lib/db/seed';

async function main() {
  await seedDatabase();
  process.exit(0);
}

main().catch((err) => {
  console.error('❌ Erreur seed:', err);
  process.exit(1);
});