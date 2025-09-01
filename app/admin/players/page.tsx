'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Users, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Trophy,
  Vote,
  Filter,
  Eye
} from 'lucide-react';
import { motion } from 'framer-motion';

// Mock data pour la démo
const mockPlayers = [
  {
    _id: '1',
    slug: 'mamadou-diallo',
    firstName: 'Mamadou',
    lastName: 'Diallo',
    age: 24,
    team: 'ASC Diaraf',
    position: 'Attaquant',
    competition: 'Championnat Demo',
    competitionSlug: 'championnat-demo',
    photoUrl: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
    votesConfirmed: 245,
    votesPending: 12,
    revenue: 49000,
    createdAt: '2024-12-15'
  },
  {
    _id: '2',
    slug: 'omar-sall',
    firstName: 'Omar',
    lastName: 'Sall',
    age: 26,
    team: 'Casa Sports',
    position: 'Milieu',
    competition: 'Coupe Jeunes',
    competitionSlug: 'coupe-jeunes',
    photoUrl: 'https://images.pexels.com/photos/1308885/pexels-photo-1308885.jpeg',
    votesConfirmed: 178,
    votesPending: 8,
    revenue: 35600,
    createdAt: '2024-12-18'
  },
  {
    _id: '3',
    slug: 'aminata-sow',
    firstName: 'Aminata',
    lastName: 'Sow',
    age: 22,
    team: 'Jaraaf Féminin',
    position: 'Défenseur',
    competition: 'Tournoi Féminin',
    competitionSlug: 'tournoi-feminin',
    photoUrl: 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg',
    votesConfirmed: 134,
    votesPending: 5,
    revenue: 26800,
    createdAt: '2024-12-20'
  },
  {
    _id: '4',
    slug: 'ibrahima-ndiaye',
    firstName: 'Ibrahima',
    lastName: 'Ndiaye',
    age: 28,
    team: 'ASC Diaraf',
    position: 'Gardien',
    competition: 'Ligue Vétérans',
    competitionSlug: 'ligue-veterans',
    photoUrl: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg',
    votesConfirmed: 198,
    votesPending: 3,
    revenue: 39600,
    createdAt: '2024-11-28'
  }
];

export default function AdminPlayersPage() {
  const [players, setPlayers] = useState(mockPlayers);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompetition, setSelectedCompetition] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');

  useEffect(() => {
    setTimeout(() => setLoading(false), 800);
  }, []);

  const competitions = [...new Set(players.map(p => p.competition))];
  const teams = [...new Set(players.map(p => p.team))];

  const filteredPlayers = players.filter(player => {
    const matchesSearch = `${player.firstName} ${player.lastName}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCompetition = !selectedCompetition || player.competition === selectedCompetition;
    const matchesTeam = !selectedTeam || player.team === selectedTeam;
    
    return matchesSearch && matchesCompetition && matchesTeam;
  });

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded animate-pulse w-1/3" />
        <div className="grid gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="rounded-2xl">
              <CardContent className="p-6">
                <div className="h-20 bg-gray-200 rounded animate-pulse" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Joueurs</h1>
            <p className="text-gray-600 mt-1">Gérez tous les joueurs de la plateforme</p>
          </div>
          <Button className="bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg">
            <Plus className="w-4 h-4 mr-2" />
            Nouveau joueur
          </Button>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="rounded-2xl shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Filter className="w-5 h-5 mr-2" />
              Filtres et recherche
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <Input
                  placeholder="Rechercher un joueur..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 rounded-xl"
                />
              </div>
              
              <Select value={selectedCompetition} onValueChange={setSelectedCompetition}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Toutes les compétitions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Toutes les compétitions</SelectItem>
                  {competitions.map(comp => (
                    <SelectItem key={comp} value={comp}>{comp}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedTeam} onValueChange={setSelectedTeam}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Toutes les équipes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Toutes les équipes</SelectItem>
                  {teams.map(team => (
                    <SelectItem key={team} value={team}>{team}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="text-sm text-gray-600 flex items-center">
                <Users className="w-4 h-4 mr-2" />
                {filteredPlayers.length} joueur(s)
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Players List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        {filteredPlayers.map((player, index) => (
          <motion.div
            key={player._id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.05 }}
          >
            <Card className="rounded-2xl shadow-lg border-0 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {/* Photo */}
                    <div className="w-16 h-16 bg-indigo-100 rounded-2xl overflow-hidden flex-shrink-0">
                      {player.photoUrl ? (
                        <img
                          src={player.photoUrl}
                          alt={`${player.firstName} ${player.lastName}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Users className="w-8 h-8 text-indigo-600" />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-900">
                          {player.firstName} {player.lastName}
                        </h3>
                        <Badge variant="outline" className="text-xs">
                          {player.age} ans
                        </Badge>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <span>{player.team}</span>
                        <span>•</span>
                        <span>{player.position}</span>
                        <span>•</span>
                        <span>{player.competition}</span>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-emerald-50 rounded-lg p-2 text-center">
                          <div className="text-lg font-bold text-emerald-600">{player.votesConfirmed}</div>
                          <div className="text-xs text-gray-600">Votes confirmés</div>
                        </div>
                        <div className="bg-orange-50 rounded-lg p-2 text-center">
                          <div className="text-lg font-bold text-orange-600">{player.votesPending}</div>
                          <div className="text-xs text-gray-600">En attente</div>
                        </div>
                        <div className="bg-indigo-50 rounded-lg p-2 text-center">
                          <div className="text-lg font-bold text-indigo-600">
                            {(player.revenue / 1000).toFixed(0)}K
                          </div>
                          <div className="text-xs text-gray-600">FCFA générés</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col space-y-2 ml-6">
                    <Button size="sm" variant="outline" className="rounded-xl">
                      <Eye className="w-4 h-4 mr-2" />
                      Voir
                    </Button>
                    <Button size="sm" variant="outline" className="rounded-xl">
                      <Edit className="w-4 h-4 mr-2" />
                      Modifier
                    </Button>
                    <Button size="sm" variant="outline" className="rounded-xl text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Supprimer
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}