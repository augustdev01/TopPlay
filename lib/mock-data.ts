// Mock data enrichie pour la démonstration complète

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
    rules: 'Chaque vote coûte 200 FCFA. Vous pouvez voter autant de fois que vous voulez. Les votes sont confirmés automatiquement après paiement via Wave Business.',
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
    rules: 'Réservé aux joueurs de moins de 21 ans. Chaque vote compte pour identifier les futurs stars du football sénégalais.',
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
    rules: 'Réservé aux joueurs de plus de 30 ans. Célébrons l\'expérience et le savoir-faire de nos vétérans.',
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
    rules: 'Compétition exclusivement féminine. Soutenons nos championnes et promouvons le football féminin au Sénégal !',
    playersCount: 28,
    totalVotes: 445,
    revenue: 89000,
    createdAt: '2025-01-10T00:00:00Z'
  },
  {
    _id: '5',
    slug: 'coupe-universitaire',
    name: 'Coupe Universitaire',
    status: 'active' as const,
    votePrice: 150,
    startDate: '2025-01-20T00:00:00Z',
    endDate: '2025-03-20T23:59:59Z',
    description: 'Compétition inter-universitaire pour étudiants-athlètes',
    rules: 'Réservé aux étudiants inscrits dans les universités sénégalaises. Prix réduit à 150 FCFA par vote.',
    playersCount: 40,
    totalVotes: 678,
    revenue: 101700,
    createdAt: '2025-01-05T00:00:00Z'
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
    bio: 'Attaquant rapide et technique avec une excellente vision de jeu. Formé à l\'académie de Dakar, il a marqué 15 buts cette saison et est considéré comme l\'un des meilleurs espoirs du football sénégalais.',
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
    bio: 'Milieu de terrain créatif, spécialiste des passes décisives. Capitaine de son équipe et leader naturel sur le terrain, il compte déjà 8 passes décisives cette saison.',
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
    bio: 'Défenseur central solide avec un excellent jeu de tête. Très prometteur malgré son jeune âge, il a déjà été sélectionné en équipe nationale espoirs.',
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
    bio: 'Gardien expérimenté avec d\'excellents réflexes. Pilier de la défense de son équipe depuis 5 ans, il détient le record de clean sheets cette saison.',
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
    bio: 'Ailier rapide avec de bonnes qualités de dribble. Spécialiste des centres et des coups de pied arrêtés, il apporte beaucoup de créativité sur les côtés.',
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
    bio: 'Buteur efficace dans la surface de réparation. Connu pour sa détermination et son sens du but, il a inscrit 12 buts en 15 matchs cette saison.',
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
    bio: 'Jeune prodige du football féminin. Technique remarquable et vision de jeu exceptionnelle pour son âge. Déjà internationale junior à 19 ans.',
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
    bio: 'Jeune attaquant prometteur formé à Génération Foot. Rapidité et finition sont ses points forts. Suivi par plusieurs clubs européens.',
    photoUrl: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
    votesConfirmed: 134,
    votesPending: 4,
    createdAt: '2024-12-20T00:00:00Z'
  },
  {
    _id: '9',
    competitionId: '2',
    slug: 'khadija-niang',
    firstName: 'Khadija',
    lastName: 'Niang',
    age: 18,
    team: 'Casa Sports U21',
    position: 'Milieu',
    bio: 'Plus jeune joueuse de la compétition mais déjà très mature tactiquement. Excellente dans la récupération et la relance.',
    photoUrl: 'https://images.pexels.com/photos/1308885/pexels-photo-1308885.jpeg',
    votesConfirmed: 89,
    votesPending: 6,
    createdAt: '2024-12-20T00:00:00Z'
  },

  // Tournoi Féminin
  {
    _id: '10',
    competitionId: '4',
    slug: 'fatou-ndiaye',
    firstName: 'Fatou',
    lastName: 'Ndiaye',
    age: 25,
    team: 'ASC Diaraf Féminin',
    position: 'Attaquant',
    bio: 'Meilleure buteuse du championnat féminin. Leader technique et mentale de son équipe, elle a marqué 18 buts en 12 matchs cette saison.',
    photoUrl: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg',
    votesConfirmed: 89,
    votesPending: 6,
    createdAt: '2025-01-10T00:00:00Z'
  },
  {
    _id: '11',
    competitionId: '4',
    slug: 'awa-diallo',
    firstName: 'Awa',
    lastName: 'Diallo',
    age: 23,
    team: 'Casa Sports Féminin',
    position: 'Défenseur',
    bio: 'Défenseure centrale internationale. Solide en défense et dangereuse sur coups de pied arrêtés. Capitaine de l\'équipe nationale féminine U23.',
    photoUrl: 'https://images.pexels.com/photos/1308885/pexels-photo-1308885.jpeg',
    votesConfirmed: 67,
    votesPending: 3,
    createdAt: '2025-01-10T00:00:00Z'
  },
  {
    _id: '12',
    competitionId: '4',
    slug: 'marieme-fall',
    firstName: 'Marième',
    lastName: 'Fall',
    age: 21,
    team: 'Jaraaf Féminin',
    position: 'Gardien',
    bio: 'Gardienne talentueuse avec des réflexes exceptionnels. Formée en France, elle apporte son expérience européenne au football sénégalais.',
    photoUrl: 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg',
    votesConfirmed: 54,
    votesPending: 2,
    createdAt: '2025-01-10T00:00:00Z'
  },

  // Coupe Universitaire
  {
    _id: '13',
    competitionId: '5',
    slug: 'alassane-diop',
    firstName: 'Alassane',
    lastName: 'Diop',
    age: 22,
    team: 'Université Cheikh Anta Diop',
    position: 'Milieu',
    bio: 'Étudiant en économie et joueur talentueux. Concilie parfaitement études et sport de haut niveau. Meilleur joueur universitaire 2024.',
    photoUrl: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
    votesConfirmed: 123,
    votesPending: 8,
    createdAt: '2025-01-05T00:00:00Z'
  },
  {
    _id: '14',
    competitionId: '5',
    slug: 'ndeye-fatou-seck',
    firstName: 'Ndèye Fatou',
    lastName: 'Seck',
    age: 20,
    team: 'Université Gaston Berger',
    position: 'Attaquant',
    bio: 'Étudiante en médecine et footballeuse passionnée. Prouve qu\'on peut exceller dans les études et le sport. Future médecin et star du football.',
    photoUrl: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg',
    votesConfirmed: 98,
    votesPending: 5,
    createdAt: '2025-01-05T00:00:00Z'
  },

  // Ligue Vétérans (terminée)
  {
    _id: '15',
    competitionId: '3',
    slug: 'ousmane-diouf',
    firstName: 'Ousmane',
    lastName: 'Diouf',
    age: 34,
    team: 'ASC Diaraf Vétérans',
    position: 'Milieu',
    bio: 'Légende vivante du football sénégalais. Ancien international avec plus de 50 sélections. Mentor des jeunes joueurs et exemple de longévité.',
    photoUrl: 'https://images.pexels.com/photos/1618471/pexels-photo-1618471.jpeg',
    votesConfirmed: 412,
    votesPending: 0,
    createdAt: '2024-10-25T00:00:00Z'
  },
  {
    _id: '16',
    competitionId: '3',
    slug: 'papa-bouba-diop',
    firstName: 'Papa Bouba',
    lastName: 'Diop',
    age: 36,
    team: 'Casa Sports Vétérans',
    position: 'Défenseur',
    bio: 'Défenseur emblématique, ancien capitaine de l\'équipe nationale. Reconnu pour son leadership et son fair-play exemplaire tout au long de sa carrière.',
    photoUrl: 'https://images.pexels.com/photos/1484771/pexels-photo-1484771.jpeg',
    votesConfirmed: 387,
    votesPending: 0,
    createdAt: '2024-10-25T00:00:00Z'
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
  },
  {
    _id: '4',
    orderId: 'ORD-004',
    competitionId: '4',
    playerId: '10',
    playerName: 'Fatou Ndiaye',
    competition: 'Tournoi Féminin',
    amount: 200,
    status: 'confirmed' as const,
    transactionRef: 'WAVE-TXN-123459',
    customerPhone: '+221781234567',
    source: 'admin' as const,
    provider: 'WAVE',
    currency: 'XOF',
    createdAt: '2025-01-15T08:20:00Z',
    validatedAt: '2025-01-15T14:30:00Z'
  },
  {
    _id: '5',
    orderId: 'ORD-005',
    competitionId: '5',
    playerId: '13',
    playerName: 'Alassane Diop',
    competition: 'Coupe Universitaire',
    amount: 150,
    status: 'pending' as const,
    transactionRef: 'WAVE-TXN-123460',
    customerPhone: '+221776543210',
    source: 'user_input' as const,
    provider: 'WAVE',
    currency: 'XOF',
    createdAt: '2025-01-15T12:45:00Z'
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
    { name: 'Ligue Vétérans', votes: 2156, revenue: 431200, color: '#f59e0b' },
    { name: 'Tournoi Féminin', votes: 445, revenue: 89000, color: '#ec4899' },
    { name: 'Coupe Universitaire', votes: 678, revenue: 101700, color: '#8b5cf6' }
  ],
  topPlayers: [
    { name: 'Ousmane Diouf', votes: 412, revenue: 82400, growth: '+5%', competition: 'Ligue Vétérans' },
    { name: 'Mamadou Diallo', votes: 245, revenue: 49000, growth: '+12%', competition: 'Championnat Demo' },
    { name: 'Omar Sall', votes: 178, revenue: 35600, growth: '+8%', competition: 'Championnat Demo' },
    { name: 'Aminata Sow', votes: 156, revenue: 31200, growth: '+15%', competition: 'Coupe Jeunes' },
    { name: 'Ibrahima Ndiaye', votes: 134, revenue: 26800, growth: '+6%', competition: 'Championnat Demo' }
  ]
};

export const mockDashboardStats = {
  totalVotes: 5418,
  totalRevenue: 1049700,
  activeCompetitions: 3,
  totalPlayers: 16,
  pendingTransactions: 23,
  todayVotes: 187,
  weeklyGrowth: 15.3,
  monthlyGrowth: 28.7,
  topCompetition: 'Ligue des Vétérans',
  averageVotesPerPlayer: 338.6,
  conversionRate: 94.2
};

// Données pour les graphiques de joueurs individuels
export const mockPlayerVotesHistory = [
  { date: '15/01', votes: 12 },
  { date: '16/01', votes: 18 },
  { date: '17/01', votes: 25 },
  { date: '18/01', votes: 31 },
  { date: '19/01', votes: 28 },
  { date: '20/01', votes: 35 },
  { date: '21/01', votes: 42 }
];

// Équipes disponibles
export const mockTeams = [
  'ASC Diaraf',
  'Casa Sports', 
  'Jaraaf',
  'Génération Foot',
  'ASC Diaraf Féminin',
  'Casa Sports Féminin',
  'Jaraaf Féminin',
  'Université Cheikh Anta Diop',
  'Université Gaston Berger',
  'ASC Diaraf Vétérans',
  'Casa Sports Vétérans'
];

// Positions disponibles
export const mockPositions = [
  'Gardien',
  'Défenseur',
  'Milieu',
  'Attaquant',
  'Ailier',
  'Libéro',
  'Arrière latéral',
  'Milieu défensif',
  'Milieu offensif'
];