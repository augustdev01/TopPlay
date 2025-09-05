import { db, competitions, players, admins } from './index';
import bcrypt from 'bcryptjs';

export async function seedDatabase() {
  console.log('🌱 Début du seed PostgreSQL...');

  // Créer un admin par défaut
  const adminEmail = 'admin@votesport.com';
  const adminPassword = 'admin123';
  
  const existingAdmin = await db.query.admins.findFirst({
    where: (admins, { eq }) => eq(admins.email, adminEmail)
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(adminPassword, 12);
    await db.insert(admins).values({
      email: adminEmail,
      passwordHash: hashedPassword
    });
    console.log(`👤 Admin créé: ${adminEmail} / ${adminPassword}`);
  }

  // Créer des compétitions de démonstration
  const competitionsData = [
    {
      slug: 'championnat-demo',
      name: 'Championnat de Démonstration',
      status: 'active',
      votePrice: 200,
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      description: 'Compétition de démonstration pour tester la plateforme',
      rules: 'Chaque vote coûte 200 FCFA. Vous pouvez voter autant de fois que vous voulez.'
    },
    {
      slug: 'coupe-jeunes',
      name: 'Coupe des Jeunes Talents',
      status: 'active',
      votePrice: 200,
      startDate: new Date(),
      endDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
      description: 'Compétition dédiée aux jeunes talents de moins de 21 ans',
      rules: 'Réservé aux joueurs de moins de 21 ans.'
    }
  ];

  for (const compData of competitionsData) {
    const existing = await db.query.competitions.findFirst({
      where: (competitions, { eq }) => eq(competitions.slug, compData.slug)
    });

    if (!existing) {
      const [competition] = await db.insert(competitions).values(compData).returning();
      console.log(`🏆 Compétition créée: ${competition.name}`);

      // Créer des joueurs pour cette compétition
      const playersData = [
        {
          competitionId: competition.id,
          slug: 'mamadou-diallo',
          firstName: 'Mamadou',
          lastName: 'Diallo',
          age: 24,
          team: 'ASC Diaraf',
          position: 'Attaquant',
          bio: 'Attaquant rapide et technique avec une excellente vision de jeu.',
          photoUrl: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
          votesConfirmed: Math.floor(Math.random() * 100) + 20
        },
        {
          competitionId: competition.id,
          slug: 'omar-sall',
          firstName: 'Omar',
          lastName: 'Sall',
          age: 26,
          team: 'Casa Sports',
          position: 'Milieu',
          bio: 'Milieu de terrain créatif, spécialiste des passes décisives.',
          photoUrl: 'https://images.pexels.com/photos/1308885/pexels-photo-1308885.jpeg',
          votesConfirmed: Math.floor(Math.random() * 80) + 15
        },
        {
          competitionId: competition.id,
          slug: 'ibrahima-ndiaye',
          firstName: 'Ibrahima',
          lastName: 'Ndiaye',
          age: 22,
          team: 'Jaraaf',
          position: 'Défenseur',
          bio: 'Défenseur central solide avec un excellent jeu de tête.',
          photoUrl: 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg',
          votesConfirmed: Math.floor(Math.random() * 60) + 10
        }
      ];

      await db.insert(players).values(playersData);
      console.log(`⚽ ${playersData.length} joueurs créés pour ${competition.name}`);
    }
  }

  console.log('✅ Seed PostgreSQL terminé !');
}