"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Trophy,
  Vote,
  Users,
  TrendingUp,
  ArrowRight,
  Star,
  Crown,
  Zap,
  Target,
} from "lucide-react";
import Link from "next/link";
import { CompetitionEntity, PlayerEntity } from "@/types/entities/entities";
// import { mockCompetitions, mockPlayers } from '@/lib/mock-data';

export default function HomePage() {
  const [competitions, setCompetitions] = useState<CompetitionEntity[]>([]);
  const [topPlayers, setTopPlayers] = useState<PlayerEntity[]>([]);
  const [players, setPlayers] = useState<PlayerEntity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Récupérer toutes les compétitions
        const compRes = await fetch("/api/admin/competitions");
        if (!compRes.ok) throw new Error("Erreur API compétitions");
        const comps: CompetitionEntity[] = await compRes.json();
        setCompetitions(comps);

        // 2. Récupérer tous les joueurs (ou les joueurs d'une compétition précise)
        const playersRes = await fetch("/api/admin/players");
        if (!playersRes.ok) throw new Error("Erreur API joueurs");
        const players: PlayerEntity[] = await playersRes.json();
        setPlayers(players);

        // 3. Enrichir chaque player avec ses infos de compétition
        const enrichedPlayers = players.filter((player) => {
          const comp = comps.find((c) => c._id === player.competitionId);
          return {
            ...player,
            competitionName: comp?.name ?? "Inconnue",
            competitionSlug: comp?.slug ?? "",
            competitionStatus: comp?.status ?? "draft",
            revenue: player.votesConfirmed * (comp?.votePrice ?? 0),
          };
        });

        // 4. Trier et prendre les 6 meilleurs
        const sortedPlayers = enrichedPlayers
          .sort((a, b) => b.votesConfirmed - a.votesConfirmed)
          .slice(0, 6);

        setTopPlayers(sortedPlayers);
      } catch (error) {
        console.error("Erreur fetch dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const activeCompetitions = competitions.filter((c) => c.status === "active");

  const totalVotes = competitions.reduce(
    (acc, comp) => acc + comp.totalVotes,
    0
  );
  const totalRevenue = totalVotes * 200;
  const formatRevenue = (amount: number) => {
    if (amount >= 1_000_000) {
      return `${(amount / 1_000_000).toFixed(1)}M`;
    } else if (amount >= 1_000) {
      return `${(amount / 1_000).toFixed(0)}K`;
    }
    return amount.toString();
  };
  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-blue-50 sm:py-5 lg:py-20">
      {/* Hero Section */}
      <section className="container mx-auto pt-7  lg:py-4">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
              Votez pour vos
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                champions
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Soutenez vos athlètes préférés avec des votes payants. Chaque vote
              compte pour identifier les meilleurs talents du Sénégal.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Button
              asChild
              size="lg"
              className="bg-indigo-600 hover:bg-indigo-700 text-lg px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all"
            >
              <Link href="/competitions">
                <Vote className="w-5 h-5 mr-2" />
                Commencer à voter
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-lg px-8 py-4 rounded-2xl border-2 border-indigo-600/10 md:border-gray-600/30 text-indigo-600 hover:border-indigo-600/30 bg-indigo-600/10 md:bg-white transition-all duration-200 md:text-black md:hover:bg-indigo-600/10 hover:text-indigo-600"
            >
              <Link href="/classements">
                <Trophy className="w-5 h-5 mr-2" />
                Voir les classements
              </Link>
            </Button>
          </motion.div>

          {/* Stats rapides */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 text-center shadow-lg border border-white/20">
              <div className="text-2xl md:text-3xl font-bold text-indigo-600 mb-1">
                {totalVotes.toLocaleString()}
              </div>
              <div className="text-xs md:text-sm text-gray-600 font-medium">
                Votes confirmés
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 text-center shadow-lg border border-white/20">
              <div className="text-2xl md:text-3xl font-bold text-emerald-600 mb-1">
                {players.length}
              </div>
              <div className="text-xs md:text-sm text-gray-600 font-medium">
                Joueurs actifs
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 text-center shadow-lg border border-white/20">
              <div className="text-2xl md:text-3xl font-bold text-purple-600 mb-1">
                {activeCompetitions.length}
              </div>
              <div className="text-xs md:text-sm text-gray-600 font-medium">
                Compétitions
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 text-center shadow-lg border border-white/20">
              <div className="text-2xl md:text-3xl font-bold text-orange-600 mb-1">
                {formatRevenue(totalRevenue)}
              </div>
              <div className="text-xs md:text-sm text-gray-600 font-medium">
                FCFA collectés
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Compétitions actives */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Compétitions en cours
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Votez dès maintenant pour vos joueurs favoris dans ces compétitions
            actives
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {activeCompetitions.map((competition, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
            >
              <Card className="rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="bg-green-500 text-white rounded-full px-3 py-1">
                      En cours
                    </Badge>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">Prix du vote</div>
                      <div className="font-bold text-indigo-600">
                        {competition.votePrice} FCFA
                      </div>
                    </div>
                  </div>

                  <CardTitle className="text-xl">{competition.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {competition.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-indigo-50 rounded-lg p-3 text-center">
                      <Users className="w-5 h-5 text-indigo-600 mx-auto mb-1" />
                      <div className="text-lg font-bold text-indigo-600">
                        {competition.playersCount}
                      </div>
                      <div className="text-xs text-gray-600">Joueurs</div>
                    </div>

                    <div className="bg-emerald-50 rounded-lg p-3 text-center">
                      <Vote className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                      <div className="text-lg font-bold text-emerald-600">
                        {competition.totalVotes}
                      </div>
                      <div className="text-xs text-gray-600">Votes</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2 pt-2">
                    <Button
                      asChild
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg hover:shadow-xl p-2 sm:p-4 transition-all duration-200"
                    >
                      <Link href={`/competitions/${competition.slug}/vote`}>
                        <Vote className="w-4 h-4 mr-2" />
                        Voter maintenant
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="flex-1 rounded-xl border-2 p-2 sm:p-4 hover:border-indigo-600/10 hover:text-indigo-600 hover:bg-indigo-600/10 transition-all duration-200"
                    >
                      <Link
                        href={`/competitions/${competition.slug}/classement`}
                      >
                        <Trophy className="w-4 h-4 mr-2" />
                        Classement
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="rounded-2xl">
                <CardHeader>
                  <div className="h-6 bg-gray-200 rounded animate-pulse mb-2" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Top Players */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            <Crown className="w-8 h-8 text-yellow-500 inline mr-3" />
            Top Joueurs
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Les joueurs les plus soutenus par la communauté
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topPlayers.slice(0, 6).map((player, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
            >
              <Card className="rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-0 bg-white/90 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex xl:flex-row flex-col xl:items-center xl:space-x-4">
                    {/* Rank */}
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold ${
                        index === 0
                          ? "bg-gradient-to-br from-yellow-400 to-yellow-600 text-white"
                          : index === 1
                          ? "bg-gradient-to-br from-gray-300 to-gray-500 text-white"
                          : index === 2
                          ? "bg-gradient-to-br from-amber-400 to-amber-600 text-white"
                          : "bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-700"
                      }`}
                    >
                      {index < 3 ? (
                        index === 0 ? (
                          <Crown className="w-6 h-6" />
                        ) : index === 1 ? (
                          <Star className="w-5 h-5" />
                        ) : (
                          <Trophy className="w-5 h-5" />
                        )
                      ) : (
                        index + 1
                      )}
                    </div>

                    {/* Player Photo */}
                    <div className=" w-24 h-24 xl:w-16 xl:h-16 bg-indigo-100 rounded-full overflow-hidden flex-shrink-0 m-[0_auto]">
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

                    {/* Player Info */}
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-gray-900 truncate">
                        {player.firstName} {player.lastName}
                      </div>
                      <div className="text-sm text-gray-600 truncate">
                        {player.competitionName}
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Vote className="w-4 h-4 text-emerald-600" />
                        <span className="text-lg font-bold text-emerald-600">
                          {player.votesConfirmed}
                        </span>
                        <span className="text-sm text-gray-500">votes</span>
                      </div>
                    </div>

                    {/* Vote Button */}
                    <Button
                      asChild
                      size="sm"
                      className="bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg hover:shadow-xl w-full sm:w-auto"
                    >
                      <Link
                        href={`/competitions/${player.competitionSlug}/vote`}
                      >
                        <Vote className="w-4 h-4 mr-1" />
                        Voter
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="text-center mt-8"
        >
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-2xl border-2 hover:border-indigo-600/10 hover:text-indigo-600 hover:bg-indigo-600/10 transition-all duration-200"
          >
            <Link href="/classements">
              Voir tous les classements
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Pourquoi VoteSport ?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            La plateforme la plus simple et sécurisée pour soutenir vos athlètes
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7 }}
          >
            <Card className="text-center hover:shadow-xl transition-all duration-300 hover:scale-[1.02] rounded-2xl border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">Paiement instantané</CardTitle>
                <CardDescription>
                  Payez directement avec Wave Business depuis votre téléphone
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6">
                  <span className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    200 FCFA
                  </span>
                  <p className="text-sm text-gray-600 mt-2 font-medium">
                    par vote
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 }}
          >
            <Card className="text-center hover:shadow-xl transition-all duration-300 hover:scale-[1.02] rounded-2xl border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">Classement temps réel</CardTitle>
                <CardDescription>
                  Suivez l'évolution des votes et classements en direct
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6">
                  <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    Live
                  </span>
                  <p className="text-sm text-gray-600 mt-2 font-medium">
                    Mise à jour automatique
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.9 }}
          >
            <Card className="text-center hover:shadow-xl transition-all duration-300 hover:scale-[1.02] rounded-2xl border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">Votes illimités</CardTitle>
                <CardDescription>
                  Votez autant de fois que vous voulez pour maximiser le soutien
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
                  <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    ∞
                  </span>
                  <p className="text-sm text-gray-600 mt-2 font-medium">
                    Aucune limite
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.0 }}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Prêt à soutenir vos champions ?
          </h2>
          <p className="text-lg md:text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers de fans qui soutiennent déjà leurs joueurs
            favoris
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-indigo-600 hover:bg-gray-50 text-lg px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl"
            >
              <Link href="/competitions">
                <Vote className="w-5 h-5 mr-2" />
                Commencer à voter
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-lg px-8 py-4 rounded-2xl border-2 border-white/30 hover:text-gray-600 bg-white/10 text-white transition-all duration-200"
            >
              <Link href="/help">Comment ça marche ?</Link>
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
