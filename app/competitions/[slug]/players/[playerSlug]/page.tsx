'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { VoteModal } from '@/components/players/vote-modal';
import { 
  ArrowLeft, 
  Vote, 
  Trophy, 
  Users, 
  Calendar,
  MapPin,
  Star,
  TrendingUp,
  Share2
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockPlayers, mockCompetitions } from '@/lib/mock-data';

// Mock data pour les votes dans le temps
const mockVotesHistory = [
  { date: '15/01', votes: 12 },
  { date: '16/01', votes: 18 },
  { date: '17/01', votes: 25 },
  { date: '18/01', votes: 31 },
  { date: '19/01', votes: 28 },
  { date: '20/01', votes: 35 },
  { date: '21/01', votes: 42 }
];

export default function PlayerDetailPage() {
  const params = useParams();
  const competitionSlug = params.slug as string;
  const playerSlug = params.playerSlug as string;
  
  const [player, setPlayer] = useState<any>(null);
  const [competition, setCompetition] = useState<any>(null);
  const [voteModalOpen, setVoteModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler le chargement avec les données mock
    setTimeout(() => {
      const foundCompetition = mockCompetitions.find(c => c.slug === competitionSlug);
      const foundPlayer = mockPlayers.find(p => p.slug === playerSlug);
      
      setCompetition(foundCompetition);
      setPlayer(foundPlayer);
      setLoading(false);
    }, 800);
  }, [competitionSlug, playerSlug]);

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-indigo-50 via-white to-blue-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card className="rounded-2xl">
                <CardContent className="p-8">
                  <div className="h-64 bg-gray-200 rounded-2xl animate-pulse" />
                </CardContent>
              </Card>
            </div>
            <div className="space-y-6">
              <Card className="rounded-2xl">
                <CardContent className="p-6">
                  <div className="h-32 bg-gray-200 rounded animate-pulse" />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!player || !competition) {
    return (
      <div className="bg-gradient-to-br from-indigo-50 via-white to-blue-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Joueur non trouvé</h1>
          <Button asChild>
            <Link href="/competitions">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour aux compétitions
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const totalVotes = mockPlayers
    .filter(p => p.competitionId === competition._id)
    .reduce((acc, p) => acc + p.votesConfirmed, 0);
  
  const playerRank = mockPlayers
    .filter(p => p.competitionId === competition._id)
    .sort((a, b) => b.votesConfirmed - a.votesConfirmed)
    .findIndex(p => p._id === player._id) + 1;

  const marketShare = totalVotes > 0 ? ((player.votesConfirmed / totalVotes) * 100).toFixed(1) : '0';

  return (
    <>
      <div className="bg-gradient-to-br from-indigo-50 via-white to-blue-50 py-16">
        <div className="container mx-auto px-4">
          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Button asChild variant="outline" className="rounded-xl">
              <Link href={`/competitions/${competitionSlug}/vote`}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour aux joueurs
              </Link>
            </Button>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Player Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="rounded-2xl shadow-xl border-0 overflow-hidden bg-white/90 backdrop-blur-sm">
                  <div className="relative">
                    {/* Background */}
                    <div className="h-48 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600" />
                    
                    {/* Content */}
                    <div className="relative -mt-24 p-8">
                      <div className="flex flex-col md:flex-row items-start md:items-end space-y-4 md:space-y-0 md:space-x-6">
                        {/* Photo */}
                        <div className="w-32 h-32 bg-white rounded-2xl shadow-xl overflow-hidden border-4 border-white">
                          {player.photoUrl ? (
                            <img
                              src={player.photoUrl}
                              alt={`${player.firstName} ${player.lastName}`}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-indigo-100">
                              <Users className="w-16 h-16 text-indigo-600" />
                            </div>
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h1 className="text-3xl font-bold text-gray-900">
                              {player.firstName} {player.lastName}
                            </h1>
                            <Badge className="bg-yellow-100 text-yellow-800 rounded-full px-3 py-1">
                              #{playerRank}
                            </Badge>
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{player.age} ans</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Users className="w-4 h-4" />
                              <span>{player.team}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4" />
                              <span>{player.position}</span>
                            </div>
                          </div>

                          <p className="text-gray-700 leading-relaxed">{player.bio}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid md:grid-cols-4 gap-6"
              >
                <Card className="rounded-2xl shadow-lg border-0 text-center">
                  <CardContent className="p-6">
                    <Vote className="w-8 h-8 text-indigo-600 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-indigo-600 mb-1">
                      {player.votesConfirmed}
                    </div>
                    <div className="text-sm text-gray-600">Votes confirmés</div>
                  </CardContent>
                </Card>

                <Card className="rounded-2xl shadow-lg border-0 text-center">
                  <CardContent className="p-6">
                    <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-yellow-600 mb-1">
                      #{playerRank}
                    </div>
                    <div className="text-sm text-gray-600">Position</div>
                  </CardContent>
                </Card>

                <Card className="rounded-2xl shadow-lg border-0 text-center">
                  <CardContent className="p-6">
                    <TrendingUp className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-emerald-600 mb-1">
                      {marketShare}%
                    </div>
                    <div className="text-sm text-gray-600">Part de marché</div>
                  </CardContent>
                </Card>

                <Card className="rounded-2xl shadow-lg border-0 text-center">
                  <CardContent className="p-6">
                    <Star className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-purple-600 mb-1">
                      {(player.votesConfirmed * 200 / 1000).toFixed(0)}K
                    </div>
                    <div className="text-sm text-gray-600">FCFA générés</div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Votes Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="rounded-2xl shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Évolution des votes
                    </CardTitle>
                    <CardDescription>Votes reçus au cours des 7 derniers jours</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={mockVotesHistory}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="date" stroke="#666" />
                        <YAxis stroke="#666" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'white', 
                            border: 'none', 
                            borderRadius: '12px', 
                            boxShadow: '0 10px 25px rgba(0,0,0,0.1)' 
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="votes" 
                          stroke="#6366f1" 
                          strokeWidth={3}
                          dot={{ fill: '#6366f1', strokeWidth: 2, r: 6 }}
                          activeDot={{ r: 8, stroke: '#6366f1', strokeWidth: 2 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Vote Action */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="rounded-2xl shadow-lg border-0 bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
                  <CardContent className="p-6 text-center">
                    <Vote className="w-12 h-12 text-white mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">Votez maintenant</h3>
                    <p className="text-indigo-100 mb-6 text-sm">
                      Soutenez {player.firstName} avec votre vote
                    </p>
                    <div className="bg-white/20 rounded-xl p-4 mb-6">
                      <div className="text-2xl font-bold">{competition.votePrice} FCFA</div>
                      <div className="text-sm text-indigo-100">par vote</div>
                    </div>
                    <Button
                      onClick={() => setVoteModalOpen(true)}
                      className="w-full bg-white text-indigo-600 hover:bg-gray-50 rounded-xl shadow-lg font-bold"
                    >
                      Voter maintenant
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Competition Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="rounded-2xl shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Trophy className="w-5 h-5 mr-2" />
                      Compétition
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">{competition.name}</h4>
                      <p className="text-sm text-gray-600">{competition.description}</p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Statut :</span>
                        <Badge className={
                          competition.status === 'active' ? 'bg-green-500 text-white' :
                          competition.status === 'ended' ? 'bg-gray-500 text-white' :
                          'bg-orange-500 text-white'
                        }>
                          {competition.status === 'active' ? 'En cours' :
                           competition.status === 'ended' ? 'Terminée' : 'Brouillon'}
                        </Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Joueurs :</span>
                        <span className="font-medium">{competition.playersCount}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Total votes :</span>
                        <span className="font-medium">{competition.totalVotes}</span>
                      </div>
                    </div>

                    <div className="pt-4 space-y-2">
                      <Button asChild variant="outline" className="w-full rounded-xl">
                        <Link href={`/competitions/${competitionSlug}/vote`}>
                          Voir tous les joueurs
                        </Link>
                      </Button>
                      <Button asChild variant="outline" className="w-full rounded-xl">
                        <Link href={`/competitions/${competitionSlug}/classement`}>
                          Voir le classement
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Share */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="rounded-2xl shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Share2 className="w-5 h-5 mr-2" />
                      Partager
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Partagez le profil de {player.firstName} avec vos amis
                    </p>
                    <Button variant="outline" className="w-full rounded-xl">
                      <Share2 className="w-4 h-4 mr-2" />
                      Copier le lien
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <VoteModal
        open={voteModalOpen}
        onOpenChange={setVoteModalOpen}
        player={player}
        competition={competition}
        onSuccess={() => {
          setVoteModalOpen(false);
          // Refresh data
        }}
      />
    </>
  );
}