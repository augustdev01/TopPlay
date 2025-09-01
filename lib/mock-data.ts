// Mock data pour enrichir le front-end en attendant la connexion au back-end

export const mockCompetitions = [
  {
    _id: '1',
    slug: 'championnat-demo',
    name: 'Championnat de Démonstration',
    status: 'active' as const,
    votePrice: 200,
    startDate: '2025-01-01T00:00:00Z',
    endDate: '2025-02-28T23:59:59Z',
    description: 'Compétition de démonstration pour tester la plateforme avec les meilleurs joueurs locaux',
    rules: 'Chaque vote coûte 200 FCFA. Vous pouvez voter autant de fois que vous voulez. Les votes sont confirmés automatiquement après paiement.',
    playersCount: 24,
    totalVotes: 1247,
    revenue: 249400,
    createdAt: '2024-12-15T00:00:00Z'
  },
  {
    _id: '2',
    slug: 'coupe-jeunes',
    name: 'Coupe des Jeunes Talents',
    status: 'active' as const,
    votePrice: 200,
    startDate: '2025-01-15T00:00:00Z',
    endDate: '2025-03-15T23:59:59Z',
    description: 'Compétition dédiée aux jeunes talents de moins de 21 ans pour promouvoir la relève',
    rules: 'Réservé aux joueurs de moins de 21 ans. Chaque vote compte pour identifier les futurs stars.',
    playersCount: 32,
    totalVotes: 892,
    revenue: 178400,
    createdAt: '2024-12-20T00:00:00Z'
  },
  {
    _id: '3',
    slug: 'ligue-veterans',
    name: 'Ligue des Vétérans',
    status: 'ended' as const,
    votePrice: 200,
    startDate: '2024-11-01T00:00:00Z',
    endDate: '2024-12-31T23:59:59Z',
    description: 'Compétition pour honorer les joueurs expérimentés de plus de 30 ans',
    rules: 'Réservé aux joueurs de plus de 30 ans. Célébrons l\'expérience et le savoir-faire.',
    playersCount: 18,
    totalVotes: 2156,
    revenue: 431200,
    createdAt: '2024-10-25T00:00:00Z'
  },
  {
    _id: '4',
    slug: 'tournoi-feminin',
    name: 'Tournoi Féminin National',
    status: 'draft' as const,
    votePrice: 200,
    startDate: '2025-02-01T00:00:00Z',
    endDate: '2025-04-30T23:59:59Z',
    description: 'Premier tournoi national féminin de football pour promouvoir le sport féminin',
    rules: 'Compétition exclusivement féminine. Soutenons nos championnes !',
    playersCount: 28,
    totalVotes: 0,
    revenue: 0,
    createdAt: '2025-01-10T00:00:00Z'
  }
];

export const mockPlayers = [
  // Championnat Demo
  {
    _id: '1',
    competitionId: '1',
    slug: 'mamadou-diallo',
    firstName: 'Mamadou',
    lastName: 'Diallo',
    age: 24,
    team: 'ASC Diaraf',
    position: 'Attaquant',
    bio: 'Attaquant rapide et technique avec une excellente vision de jeu. Formé à l\'académie de Dakar, il a marqué 15 buts cette saison.',
    photoUrl: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
    votesConfirmed: 245,
    votesPending: 12,
    createdAt: '2024-12-15T00:00:00Z'
  },
  {
    _id: '2',
    competitionId: '1',
    slug: 'omar-sall',
    firstName: 'Omar',
    lastName: 'Sall',
    age: 26,
    team: 'Casa Sports',
    position: 'Milieu',
    bio: 'Milieu de terrain créatif, spécialiste des passes décisives. Capitaine de son équipe et leader naturel sur le terrain.',
    photoUrl: 'https://images.pexels.com/photos/1308885/pexels-photo-1308885.jpeg',
    votesConfirmed: 178,
    votesPending: 8,
    createdAt: '2024-12-15T00:00:00Z'
  },
  {
    _id: '3',
    competitionId: '1',
    slug: 'ibrahima-ndiaye',
    firstName: 'Ibrahima',
    lastName: 'Ndiaye',
    age: 22,
    team: 'Jaraaf',
    position: 'Défenseur',
    bio: 'Défenseur central solide avec un excellent jeu de tête. Très prometteur malgré son jeune âge.',
    photoUrl: 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg',
    votesConfirmed: 134,
    votesPending: 5,
    createdAt: '2024-12-15T00:00:00Z'
  },
  {
    _id: '4',
    competitionId: '1',
    slug: 'moussa-kane',
    firstName: 'Moussa',
    lastName: 'Kane',
    age: 28,
    team: 'ASC Diaraf',
    position: 'Gardien',
    bio: 'Gardien expérimenté avec d\'excellents réflexes. Pilier de la défense de son équipe depuis 5 ans.',
    photoUrl: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg',
    votesConfirmed: 98,
    votesPending: 3,
    createdAt: '2024-12-15T00:00:00Z'
  },
  {
    _id: '5',
    competitionId: '1',
    slug: 'abdou-fall',
    firstName: 'Abdou',
    lastName: 'Fall',
    age: 23,
    team: 'Casa Sports',
    position: 'Ailier',
    bio: 'Ailier rapide avec de bonnes qualités de dribble. Spécialiste des centres et des coups de pied arrêtés.',
    photoUrl: 'https://images.pexels.com/photos/1484771/pexels-photo-1484771.jpeg',
    votesConfirmed: 87,
    votesPending: 2,
    createdAt: '2024-12-15T00:00:00Z'
  },
  {
    _id: '6',
    competitionId: '1',
    slug: 'cheikh-ba',
    firstName: 'Cheikh',
    lastName: 'Ba',
    age: 25,
    team: 'Jaraaf',
    position: 'Attaquant',
    bio: 'Buteur efficace dans la surface de réparation. Connu pour sa détermination et son sens du but.',
    photoUrl: 'https://images.pexels.com/photos/1618471/pexels-photo-1618471.jpeg',
    votesConfirmed: 76,
    votesPending: 1,
    createdAt: '2024-12-15T00:00:00Z'
  },

  // Coupe Jeunes
  {
    _id: '7',
    competitionId: '2',
    slug: 'aminata-sow',
    firstName: 'Aminata',
    lastName: 'Sow',
    age: 19,
    team: 'Jaraaf Féminin',
    position: 'Milieu',
    bio: 'Jeune prodige du football féminin. Technique remarquable et vision de jeu exceptionnelle pour son âge.',
    photoUrl: 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg',
    votesConfirmed: 156,
    votesPending: 7,
    createdAt: '2024-12-20T00:00:00Z'
  },
  {
    _id: '8',
    competitionId: '2',
    slug: 'pape-diop',
    firstName: 'Pape',
    lastName: 'Diop',
    age: 20,
    team: 'Génération Foot',
    position: 'Attaquant',
    bio: 'Jeune attaquant prometteur formé à Génération Foot. Rapidité et finition sont ses points forts.',
    photoUrl: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
    votesConfirmed: 134,
    votesPending: 4,
    createdAt: '2024-12-20T00:00:00Z'
  },

  // Tournoi Féminin
  {
    _id: '9',
    competitionId: '4',
    slug: 'fatou-ndiaye',
    firstName: 'Fatou',
    lastName: 'Ndiaye',
    age: 25,
    team: 'ASC Diaraf Féminin',
    position: 'Attaquant',
    bio: 'Meilleure buteuse du championnat féminin. Leader technique et mentale de son équipe.',
    photoUrl: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg',
    votesConfirmed: 89,
    votesPending: 6,
    createdAt: '2025-01-10T00:00:00Z'
  },
  {
    _id: '10',
    competitionId: '4',
    slug: 'awa-diallo',
    firstName: 'Awa',
    lastName: 'Diallo',
    age: 23,
    team: 'Casa Sports Féminin',
    position: 'Défenseur',
    bio: 'Défenseure centrale internationale. Solide en défense et dangereuse sur coups de pied arrêtés.',
    photoUrl: 'https://images.pexels.com/photos/1308885/pexels-photo-1308885.jpeg',
    votesConfirmed: 67,
    votesPending: 3,
    createdAt: '2025-01-10T00:00:00Z'
  }
];

export const mockTransactions = [
  {
    _id: '1',
    orderId: 'ORD-001',
    competitionId: '1',
    playerId: '1',
    playerName: 'Mamadou Diallo',
    competition: 'Championnat Demo',
    amount: 200,
    status: 'confirmed' as const,
    transactionRef: 'WAVE-TXN-123456',
    customerPhone: '+221771234567',
    customerEmail: 'fan1@example.com',
    source: 'callback' as const,
    provider: 'WAVE',
    currency: 'XOF',
    createdAt: '2025-01-15T10:30:00Z',
    validatedAt: '2025-01-15T10:32:00Z'
  },
  {
    _id: '2',
    orderId: 'ORD-002',
    competitionId: '2',
    playerId: '7',
    playerName: 'Aminata Sow',
    competition: 'Coupe Jeunes',
    amount: 200,
    status: 'pending' as const,
    transactionRef: 'WAVE-TXN-123457',
    customerPhone: '+221779876543',
    source: 'user_input' as const,
    provider: 'WAVE',
    currency: 'XOF',
    createdAt: '2025-01-15T11:15:00Z'
  },
  {
    _id: '3',
    orderId: 'ORD-003',
    competitionId: '1',
    playerId: '2',
    playerName: 'Omar Sall',
    competition: 'Championnat Demo',
    amount: 200,
    status: 'confirmed' as const,
    transactionRef: 'WAVE-TXN-123458',
    customerPhone: '+221765432109',
    source: 'api_verification' as const,
    provider: 'WAVE',
    currency: 'XOF',
    createdAt: '2025-01-15T09:45:00Z',
    validatedAt: '2025-01-15T09:47:00Z'
  }
];

export const mockAnalyticsData = {
  votesTimeline: [
    { date: '15/01', votes: 45, revenue: 9000 },
    { date: '16/01', votes: 67, revenue: 13400 },
    { date: '17/01', votes: 89, revenue: 17800 },
    { date: '18/01', votes: 123, revenue: 24600 },
    { date: '19/01', votes: 156, revenue: 31200 },
    { date: '20/01', votes: 134, revenue: 26800 },
    { date: '21/01', votes: 187, revenue: 37400 }
  ],
  competitionDistribution: [
    { name: 'Championnat Demo', votes: 1247, revenue: 249400, color: '#6366f1' },
    { name: 'Coupe Jeunes', votes: 892, revenue: 178400, color: '#10b981' },
    { name: 'Ligue Vétérans', votes: 756, revenue: 151200, color: '#f59e0b' },
    { name: 'Tournoi Féminin', votes: 445, revenue: 89000, color: '#ec4899' }
  ],
  topPlayers: [
    { name: 'Mamadou Diallo', votes: 245, revenue: 49000, growth: '+12%' },
    { name: 'Omar Sall', votes: 178, revenue: 35600, growth: '+8%' },
    { name: 'Aminata Sow', votes: 134, revenue: 26800, growth: '+15%' },
    { name: 'Ibrahima Ndiaye', votes: 98, revenue: 19600, growth: '+5%' },
    { name: 'Fatou Ndiaye', votes: 87, revenue: 17400, growth: '+18%' }
  ]
};

export const mockDashboardStats = {
  totalVotes: 12450,
  totalRevenue: 2490000,
  activeCompetitions: 4,
  totalPlayers: 156,
  pendingTransactions: 23,
  todayVotes: 187,
  weeklyGrowth: 15.3,
  monthlyGrowth: 28.7,
  topCompetition: 'Championnat de Démonstration',
  averageVotesPerPlayer: 79.8,
  conversionRate: 94.2
};