"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Trophy,
  Crown,
  Medal,
  Award,
  TrendingUp,
  Users,
  Vote,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface Competition {
  _id: string;
  slug: string;
  name: string;
  status: "draft" | "active" | "ended";
  totalVotes: number;
  topPlayer?: {
    firstName: string;
    lastName: string;
    votes: number;
    photoUrl?: string;
  };
}

export default function ClassementsPage() {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const res = await fetch("/api/competitions");
        if (!res.ok) throw new Error("Erreur API");

        const data = await res.json();
        setCompetitions(data); // tes compétitions venant du backend
      } catch (err) {
        console.error("Erreur fetch:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompetitions();
  }, []);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "active":
        return {
          label: "En cours",
          color: "bg-green-500",
          textColor: "text-green-700",
          bgColor: "bg-green-50",
        };
      case "ended":
        return {
          label: "Terminée",
          color: "bg-gray-500",
          textColor: "text-gray-700",
          bgColor: "bg-gray-50",
        };
      default:
        return {
          label: "Brouillon",
          color: "bg-orange-500",
          textColor: "text-orange-700",
          bgColor: "bg-orange-50",
        };
    }
  };

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 1:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 2:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <Trophy className="w-6 h-6 text-indigo-600" />;
    }
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-indigo-50 via-white to-blue-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {[...Array(4)].map((_, i) => (
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
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-blue-50 py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 flex flex-col items-center sm:flex-row sm:justify-center ">
            <Trophy className="w-10 h-10 text-yellow-500 inline mr-3" />
            Classements Généraux
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez les leaders de chaque compétition et suivez l'évolution
            des votes en temps réel
          </p>
        </motion.div>

        {/* Competitions Leaderboards */}
        <div className="grid md:grid-cols-2 gap-8">
          {competitions
            .sort((a, b) => b.totalVotes - a.totalVotes)
            .map((competition, index) => {
              const statusConfig = getStatusConfig(competition.status);

              return (
                <motion.div
                  key={competition._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-0 bg-white/90 backdrop-blur-sm">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          {getRankIcon(index)}
                          <Badge
                            className={`${statusConfig.color} text-white rounded-full px-3 py-1`}
                          >
                            {statusConfig.label}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-indigo-600">
                            #{index + 1}
                          </div>
                        </div>
                      </div>

                      <CardTitle className="text-xl">
                        {competition.name}
                      </CardTitle>
                      <CardDescription className="flex items-center space-x-4">
                        <span className="flex items-center space-x-1">
                          <Vote className="w-4 h-4" />
                          <span>{competition.totalVotes} votes</span>
                        </span>
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Top Player */}
                      {competition.topPlayer && (
                        <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-4 border border-yellow-200">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-yellow-100 rounded-full overflow-hidden flex-shrink-0">
                              {competition.topPlayer.photoUrl ? (
                                <img
                                  src={competition.topPlayer.photoUrl}
                                  alt={`${competition.topPlayer.firstName} ${competition.topPlayer.lastName}`}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <Crown className="w-6 h-6 text-yellow-600" />
                                </div>
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="font-bold text-yellow-800">
                                🏆 {competition.topPlayer.firstName}{" "}
                                {competition.topPlayer.lastName}
                              </div>
                              <div className="text-sm text-yellow-700">
                                {competition.topPlayer.votes} votes • Leader
                                actuel
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-indigo-50 rounded-lg p-3 text-center">
                          <TrendingUp className="w-5 h-5 text-indigo-600 mx-auto mb-1" />
                          <div className="text-lg font-bold text-indigo-600">
                            {competition.totalVotes}
                          </div>
                          <div className="text-xs text-gray-600">
                            Total votes
                          </div>
                        </div>

                        <div className="bg-emerald-50 rounded-lg p-3 text-center">
                          <Users className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                          <div className="text-lg font-bold text-emerald-600">
                            {Math.floor((competition.totalVotes * 200) / 1000)}K
                          </div>
                          <div className="text-xs text-gray-600">
                            FCFA collectés
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex space-x-2 pt-2">
                        <Button
                          asChild
                          className="flex-1 bg-indigo-600 hover:bg-indigo-700 rounded-xl"
                        >
                          <Link
                            href={`/competitions/${competition.slug}/classement`}
                          >
                            Voir le classement
                          </Link>
                        </Button>
                        {competition.status === "active" && (
                          <Button
                            asChild
                            variant="outline"
                            className="flex-1 rounded-xl border-2"
                          >
                            <Link
                              href={`/competitions/${competition.slug}/vote`}
                            >
                              Voter
                            </Link>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
        </div>

        {/* Global Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20"
        >
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-900">
            Statistiques Globales
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Vote className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-indigo-600 mb-2">
                {competitions
                  .reduce((acc, comp) => acc + comp.totalVotes, 0)
                  .toLocaleString()}
              </div>
              <div className="text-gray-600 font-medium">Votes totaux</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-emerald-600 mb-2">
                {competitions.filter((c) => c.status === "active").length}
              </div>
              <div className="text-gray-600 font-medium">
                Compétitions actives
              </div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-purple-600 mb-2">156</div>
              <div className="text-gray-600 font-medium">
                Joueurs participants
              </div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {Math.floor(
                  ((competitions.reduce(
                    (acc, comp) => acc + comp.totalVotes,
                    0
                  ) *
                    200) /
                    1000000) *
                    10
                ) / 10}
                M
              </div>
              <div className="text-gray-600 font-medium">FCFA collectés</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
