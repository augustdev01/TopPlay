'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, Crown, Medal, Award, Vote } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface LeaderboardEntry {
  _id: string;
  slug: string;
  firstName: string;
  lastName: string;
  team?: string;
  position?: string;
  photoUrl?: string;
  percentage: number; // Pourcentage au lieu du nombre brut
}

interface LeaderboardTableProps {
  leaderboard: LeaderboardEntry[];
  loading: boolean;
  error?: any;
  competitionSlug: string;
}

export function LeaderboardTable({ leaderboard, loading, error, competitionSlug }: LeaderboardTableProps) {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return null;
    }
  };

  const getRankBadge = (rank: number) => {
    if (rank <= 3) {
      const colors = {
        1: 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white',
        2: 'bg-gradient-to-r from-gray-300 to-gray-500 text-white',
        3: 'bg-gradient-to-r from-amber-400 to-amber-600 text-white'
      };
      return colors[rank as keyof typeof colors] || 'bg-gray-100';
    }
    return 'bg-gray-100 text-gray-700';
  };

  if (loading) {
    return (
      <Card className="rounded-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Trophy className="w-6 h-6 mr-2" />
            Classement
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl animate-pulse">
                <div className="w-12 h-12 bg-gray-200 rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/3" />
                  <div className="h-3 bg-gray-200 rounded w-1/4" />
                </div>
                <div className="h-6 bg-gray-200 rounded w-16" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="rounded-2xl shadow-lg">
        <CardContent className="p-8 text-center">
          <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Erreur de chargement du classement</p>
          <Button onClick={() => window.location.reload()} className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white">
            Réessayer
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (leaderboard.length === 0) {
    return (
      <Card className="rounded-2xl shadow-lg">
        <CardContent className="p-8 text-center">
          <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Aucun vote pour le moment
          </h3>
          <p className="text-gray-500 mb-6">
            Soyez le premier à voter pour vos joueurs favoris !
          </p>
          <Button asChild className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl">
            <Link href={`/competitions/${competitionSlug}/vote`}>
              Commencer à voter
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-2xl shadow-lg border-0">
      <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-2xl">
        <CardTitle className="flex items-center text-xl">
          <Trophy className="w-6 h-6 mr-3" />
          Classement général
        </CardTitle>
        <CardDescription className="text-indigo-100">
          Mis à jour en temps réel • Classement en pourcentage
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="space-y-2 p-6">
          {leaderboard.map((player, index) => {
            const rank = index + 1;
            
            return (
              <motion.div
                key={player._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <div className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-200 hover:shadow-md ${
                  rank <= 3 ? 'bg-gradient-to-r from-yellow-50 to-amber-50' : 'bg-gray-50 hover:bg-gray-100'
                }`}>
                  {/* Rank */}
                  <div className="flex items-center justify-center w-12 h-12">
                    {rank <= 3 ? (
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getRankBadge(rank)}`}>
                        {getRankIcon(rank) || <span className="font-bold">{rank}</span>}
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <span className="font-semibold text-gray-600">{rank}</span>
                      </div>
                    )}
                  </div>

                  {/* Player Photo */}
                  <div className="w-12 h-12 bg-indigo-100 rounded-full overflow-hidden flex-shrink-0">
                    {player.photoUrl ? (
                      <img
                        src={player.photoUrl}
                        alt={`${player.firstName} ${player.lastName}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Trophy className="w-6 h-6 text-indigo-600" />
                      </div>
                    )}
                  </div>

                  {/* Player Info */}
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900 truncate">
                      {player.firstName} {player.lastName}
                    </div>
                    <div className="text-sm text-gray-600 flex items-center space-x-2">
                      {player.team && <span>{player.team}</span>}
                      {player.team && player.position && <span>•</span>}
                      {player.position && <span>{player.position}</span>}
                    </div>
                  </div>

                  {/* Pourcentage */}
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <Vote className="w-4 h-4 text-emerald-600" />
                      <span className="text-xl font-bold text-emerald-600">
                        {player.percentage.toFixed(1)}%
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">du total</div>
                  </div>

                  {/* Action */}
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="rounded-xl hover:bg-gray-100 hover:text-gray-900"
                  >
                    <Link href={`/competitions/${competitionSlug}/players/${player.slug}`}>
                      Voir
                    </Link>
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-4 rounded-b-2xl border-t">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Mise à jour automatique toutes les 3 secondes
            </div>
            <Button asChild className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl">
              <Link href={`/competitions/${competitionSlug}/vote`}>
                Voter maintenant
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}