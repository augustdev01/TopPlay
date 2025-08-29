import dbConnect from '@/lib/mongodb';
import { Competition } from '@/lib/models/Competition';
import { Player } from '@/lib/models/Player';
import { Admin } from '@/lib/models/Admin';
import bcrypt from 'bcryptjs';

async function seed() {
  await dbConnect();
  
  console.log('🌱 Début du seed...');

  // Créer un admin par défaut
  const adminEmail = 'admin@votesport.com';
  const adminPassword = 'admin123';
  
  const existingAdmin = await Admin.findOne({ email: adminEmail });
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(adminPassword, 12);
    await Admin.create({
      email: adminEmail,
      passwordHash: hashedPassword
    });
    console.log(`👤 Admin créé: ${adminEmail} / ${adminPassword}`);
  }

  // Créer une compétition de démonstration
  let competition = await Competition.findOne({ slug: 'championnat-demo' });
  if (!competition) {
    competition = await Competition.create({
      slug: 'championnat-demo',
      name: 'Championnat de Démonstration',
      status: 'active',
      votePrice: 200,
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 jours
      description: 'Compétition de démonstration pour tester la plateforme',
      rules: 'Règles de la compétition...'
    });
    console.log(`🏆 Compétition créée: ${competition.name}`);
  }

  // Créer des joueurs de démonstration
  const playersData = [
    {
      slug: 'mamadou-diallo',
      firstName: 'Mamadou',
      lastName: 'Diallo',
      age: 24,
      team: 'ASC Diaraf',
      position: 'Attaquant',
      bio: 'Attaquant rapide et technique avec une excellente vision de jeu.',
      photoUrl: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
      votesConfirmed: 45
    },
    {
      slug: 'omar-sall',
      firstName: 'Omar',
      lastName: 'Sall',
      age: 26,
      team: 'Casa Sports',
      position: 'Milieu',
      bio: 'Milieu de terrain créatif, spécialiste des passes décisives.',
      photoUrl: 'https://images.pexels.com/photos/1308885/pexels-photo-1308885.jpeg',
      votesConfirmed: 38
    },
    {
      slug: 'ibrahima-ndiaye',
      firstName: 'Ibrahima',
      lastName: 'Ndiaye',
      age: 22,
      team: 'Jaraaf',
      position: 'Défenseur',
      bio: 'Défenseur central solide avec un excellent jeu de tête.',
      photoUrl: 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg',
      votesConfirmed: 31
    },
    {
      slug: 'moussa-kane',
      firstName: 'Moussa',
      lastName: 'Kane',
      age: 28,
      team: 'ASC Diaraf',
      position: 'Gardien',
      bio: 'Gardien expérimenté avec d\'excellents réflexes.',
      photoUrl: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg',
      votesConfirmed: 29
    },
    {
      slug: 'abdou-fall',
      firstName: 'Abdou',
      lastName: 'Fall',
      age: 23,
      team: 'Casa Sports',
      position: 'Ailier',
      bio: 'Ailier rapide avec de bonnes qualités de dribble.',
      photoUrl: 'https://images.pexels.com/photos/1484771/pexels-photo-1484771.jpeg',
      votesConfirmed: 22
    },
    {
      slug: 'cheikh-ba',
      firstName: 'Cheikh',
      lastName: 'Ba',
      age: 25,
      team: 'Jaraaf',
      position: 'Attaquant',
      bio: 'Buteur efficace dans la surface de réparation.',
      photoUrl: 'https://images.pexels.com/photos/1618471/pexels-photo-1618471.jpeg',
      votesConfirmed: 18
    }
  ];

  for (const playerData of playersData) {
    const existingPlayer = await Player.findOne({ 
      competitionId: competition._id,
      slug: playerData.slug 
    });
    
    if (!existingPlayer) {
      await Player.create({
        ...playerData,
        competitionId: competition._id
      });
      console.log(`⚽ Joueur créé: ${playerData.firstName} ${playerData.lastName}`);
    }
  }

  console.log('✅ Seed terminé !');
  console.log(`🌐 Visitez: http://localhost:3000/competitions/${competition.slug}/vote`);
}

// Exécuter le seed si appelé directement
if (require.main === module) {
  seed().then(() => process.exit(0)).catch((error) => {
    console.error('❌ Erreur seed:', error);
    process.exit(1);
  });
}

export default seed;