"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
import { Trophy, Crown, Medal, Award, Vote, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

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

export function LeaderboardTable({
  leaderboard,
  loading,
  error,
  competitionSlug,
}: LeaderboardTableProps) {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-4 h-4 sm:w-6 sm:h-6 text-gray-400" />;
      case 3:
        return <Award className="w-4 h-4 sm:w-6 sm:h-6 text-amber-600" />;
      default:
        return null;
    }
  };

  const getRankBadge = (rank: number) => {
    if (rank <= 3) {
      const colors = {
        1: "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white",
        2: "bg-gradient-to-r from-gray-300 to-gray-500 text-white",
        3: "bg-gradient-to-r from-amber-400 to-amber-600 text-white",
      };
      return colors[rank as keyof typeof colors] || "bg-gray-100";
    }
    return "bg-gray-100 text-gray-700";
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
              <div
                key={i}
                className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl animate-pulse"
              >
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
          <Button
            onClick={() => window.location.reload()}
            className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white"
          >
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
          <Button
            asChild
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl"
          >
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
                <div
                  className={`relative overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 ${
                    rank <= 3
                      ? "bg-gradient-to-br from-yellow-50 via-white to-amber-50 border-2 border-yellow-200"
                      : "bg-white border border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {/* Badge de rang en haut à droite pour mobile */}
                  <div className="absolute top-3 right-3 z-10 flex  flex-col-reverse items-end justify-end sm:flex-row sm:items-center">
                    {/* Bouton d'action */}
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="rounded-xl   hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-700 transition-all duration-200 shadow-sm sm:min-w-[70px]"
                    >
                      <Link
                        href={`/competitions/${competitionSlug}/players/${player.slug}`}
                      >
                        <ArrowRight className=" w-4 font-medium" />
                      </Link>
                    </Button>
                    <div
                      className={`mb-3 w-8 h-8  sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-[1px] sm:text-sm font-bold ${getRankBadge(
                        rank
                      )}`}
                    >
                      {getRankIcon(rank) || rank}
                    </div>
                  </div>

                  <div className="p-4 sm:p-6">
                    {/* Section principale - responsive layout */}
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      {/* Photo et info joueur */}
                      <div className="flex flex-col items-center sm:items-start ">
                        {/* Photo du joueur */}
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-indigo-100 rounded-full overflow-hidden flex-shrink-0 shadow-md">
                          {player.photoUrl ? (
                            <img
                              src={player.photoUrl}
                              alt={`${player.firstName} ${player.lastName}`}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Trophy className="w-7 h-7 sm:w-6 sm:h-6 text-indigo-600" />
                            </div>
                          )}
                        </div>

                        {/* Info joueur */}
                        <div className="  w-full m-[0_auto]">
                          <h3 className="font-bold text-center sm:text-start text-lg sm:text-base text-gray-900 truncate w-full">
                            {player.firstName} {player.lastName}
                          </h3>
                          {(player.team || player.position) && (
                            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-1 sm:gap-2 mt-1 text-center sm:text-start">
                              {player.team && (
                                <span className="text-sm font-medium text-indigo-600">
                                  {player.team}
                                </span>
                              )}
                              {player.team && player.position && (
                                <span className="hidden sm:inline text-gray-400">
                                  •
                                </span>
                              )}
                              {player.position && (
                                <span className="text-sm text-gray-600">
                                  {player.position}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Section pourcentage et action - responsive */}
                      <div className="flex items-center justify-between sm:flex-col sm:items-end gap-4 sm:gap-3">
                        {/* Pourcentage - plus prominent sur mobile */}
                        <div className="flex items-center gap-2 sm:flex-col sm:items-end sm:gap-1">
                          {/*  <div className="text-sm text-gray-500 sm:text-xs sm:text-right">
                            du total des votes
                          </div> */}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4 mt-4 pt-4">
                      <div className="flex items-center gap-2 mr-0 justify-center sm:justify-end ">
                        <Vote className="w-5 h-5 text-emerald-600" />
                        <span className="text-xl sm:text-xl font-bold text-emerald-600">
                          {player.percentage.toFixed(1)}%
                        </span>
                      </div>
                      {/* Barre de progression visuelle pour les 3 premiers */}
                      {rank <= 3 && (
                        <div className=" border-t border-gray-100">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all duration-500 ${
                                rank === 1
                                  ? "bg-gradient-to-r from-yellow-400 to-yellow-500"
                                  : rank === 2
                                  ? "bg-gradient-to-r from-gray-400 to-gray-500"
                                  : "bg-gradient-to-r from-amber-400 to-amber-500"
                              }`}
                              style={{
                                width: `${Math.min(player.percentage, 100)}%`,
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
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
            <Button
              asChild
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl"
            >
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
