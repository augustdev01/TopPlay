"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Trophy,
  Users,
  CreditCard,
  TrendingUp,
  Vote,
  DollarSign,
  Activity,
  Crown,
  ArrowUpRight,
  BarChart3,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

// Mock data pour la démo
const mockStats = {
  totalVotes: 12450,
  totalRevenue: 2490000,
  activeCompetitions: 4,
  totalPlayers: 156,
  pendingTransactions: 23,
  todayVotes: 187,
  weeklyGrowth: 15.3,
  topCompetition: "Championnat de Démonstration",
};

const mockRecentTransactions = [
  {
    id: "1",
    playerName: "Mamadou Diallo",
    competition: "Championnat Demo",
    amount: 200,
    status: "confirmed",
    time: "2 min",
  },
  {
    id: "2",
    playerName: "Omar Sall",
    competition: "Coupe Jeunes",
    amount: 200,
    status: "pending",
    time: "5 min",
  },
  {
    id: "3",
    playerName: "Aminata Sow",
    competition: "Tournoi Féminin",
    amount: 200,
    status: "confirmed",
    time: "8 min",
  },
];

const mockTopPlayers = [
  {
    name: "Mamadou Diallo",
    competition: "Championnat Demo",
    votes: 245,
    revenue: 49000,
    growth: "+12%",
  },
  {
    name: "Omar Sall",
    competition: "Coupe Jeunes",
    votes: 178,
    revenue: 35600,
    growth: "+8%",
  },
  {
    name: "Aminata Sow",
    competition: "Tournoi Féminin",
    votes: 134,
    revenue: 26800,
    growth: "+15%",
  },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [recentTransactions, setRecentTransactions] = useState<any[]>([]);
  const [topPlayers, setTopPlayers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const res = await fetch("/api/admin/dashboard");
        const data = await res.json();
        console.log("data: ", data);

        setStats(data.stats);
        setRecentTransactions(data.recentTransactions);
        setTopPlayers(data.topPlayers);
      } catch (err) {
        console.error("Erreur fetch dashboard:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboard();
  }, []);

  const StatCard = ({
    title,
    value,
    icon: Icon,
    color,
    change,
    description,
  }: any) => (
    <Card className="rounded-2xl shadow-lg border-0 hover:shadow-xl transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
            {change && (
              <p
                className={`text-sm flex items-center mt-1 ${
                  change.startsWith("+") ? "text-green-600" : "text-red-600"
                }`}
              >
                <TrendingUp className="w-3 h-3 mr-1" />
                {change}
              </p>
            )}
            {description && (
              <p className="text-xs text-gray-500 mt-1">{description}</p>
            )}
          </div>
          <div
            className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center`}
          >
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Vue d'ensemble de la plateforme VoteSport
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Badge
              variant="outline"
              className="bg-green-50 text-green-700 border-green-200"
            >
              <Activity className="w-3 h-3 mr-1" />
              Système opérationnel
            </Badge>
            <Button
              asChild
              className="bg-indigo-600 hover:bg-indigo-700 rounded-xl"
            >
              <Link href="/competitions">
                Voir le site
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <StatCard
          title="Total des votes"
          value={stats ? stats.totalVotes.toLocaleString() : "-"}
          icon={Vote}
          color="bg-gradient-to-br from-indigo-500 to-purple-500"
          change="+15.3%"
          description="Cette semaine"
        />
        <StatCard
          title="Revenus totaux"
          value={`${(stats.totalRevenue / 1000000).toFixed(1)}M FCFA`}
          icon={DollarSign}
          color="bg-gradient-to-br from-emerald-500 to-teal-500"
          change="+12.8%"
          description="Depuis le lancement"
        />
        <StatCard
          title="Compétitions actives"
          value={stats.activeCompetitions}
          icon={Trophy}
          color="bg-gradient-to-br from-orange-500 to-red-500"
          description={`${stats.totalPlayers} joueurs`}
        />
        <StatCard
          title="Transactions en attente"
          value={stats.pendingTransactions}
          icon={CreditCard}
          color="bg-gradient-to-br from-purple-500 to-pink-500"
          description="À valider"
        />
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card className="rounded-2xl shadow-lg border-0">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Transactions récentes
                  </CardTitle>
                  <CardDescription>
                    Dernières activités de paiement
                  </CardDescription>
                </div>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="rounded-xl"
                >
                  <Link href="/admin/transactions">Voir tout</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((transaction, index) => (
                  <motion.div
                    key={transaction.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                        <Vote className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {transaction.playerName}
                        </div>
                        <div className="text-sm text-gray-600">
                          {transaction.competition}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">
                        {transaction.amount} FCFA
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          className={`text-xs ${
                            transaction.status === "confirmed"
                              ? "bg-green-100 text-green-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {transaction.status === "confirmed"
                            ? "Confirmé"
                            : "En attente"}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          il y a {transaction.time}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Top Players */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="rounded-2xl shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Crown className="w-5 h-5 mr-2 text-yellow-500" />
                Top Joueurs
              </CardTitle>
              <CardDescription>Les plus votés cette semaine</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPlayers.map((player, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          index === 0
                            ? "bg-yellow-100 text-yellow-700"
                            : index === 1
                            ? "bg-gray-100 text-gray-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{player.name}</div>
                        <div className="text-xs text-gray-500">
                          {player.competition}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-indigo-600">
                        {player.votes}
                      </div>
                      <div className="text-xs text-green-600">
                        {player.growth}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="rounded-2xl shadow-lg border-0">
          <CardHeader>
            <CardTitle>Actions rapides</CardTitle>
            <CardDescription>
              Raccourcis vers les tâches courantes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <Button
                asChild
                className="h-20 flex-col bg-indigo-600 hover:bg-indigo-700 rounded-xl"
              >
                <Link href="/admin/competitions">
                  <Trophy className="w-6 h-6 mb-2" />
                  <span className="text-sm">Nouvelle compétition</span>
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-20 flex-col rounded-xl border-2"
              >
                <Link href="/admin/players">
                  <Users className="w-6 h-6 mb-2" />
                  <span className="text-sm">Ajouter joueur</span>
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-20 flex-col rounded-xl border-2"
              >
                <Link href="/admin/transactions">
                  <CreditCard className="w-6 h-6 mb-2" />
                  <span className="text-sm">Valider paiements</span>
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-20 flex-col rounded-xl border-2"
              >
                <Link href="/admin/analytics">
                  <BarChart3 className="w-6 h-6 mb-2" />
                  <span className="text-sm">Voir analytics</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
