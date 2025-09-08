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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart3,
  TrendingUp,
  Calendar,
  Download,
  RefreshCw,
  DollarSign,
  Vote,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function AdminAnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("7d");
  const [votesData, setVotesData] = useState<any[]>([]);
  const [competitionData, setCompetitionData] = useState<any[]>([]);
  const [topPlayers, setTopPlayers] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 🔹 Fetch votes (par date)
        const votesRes = await fetch(`/api/analytics/votes?range=${timeRange}`);
        const votesJson = await votesRes.json();

        // 🔹 Fetch competitions
        const compRes = await fetch(
          `/api/analytics/competitions?range=${timeRange}`
        );
        const compJson = await compRes.json();

        // 🔹 Fetch top players
        const playersRes = await fetch(
          `/api/analytics/top-players?range=${timeRange}`
        );
        const playersJson = await playersRes.json();

        setVotesData(votesJson);
        setCompetitionData(compJson);
        setTopPlayers(playersJson);
      } catch (error) {
        console.error("Erreur fetch analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [timeRange]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded animate-pulse w-1/3" />
        <div className="grid md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="rounded-2xl">
              <CardContent className="p-6">
                <div className="h-64 bg-gray-200 rounded animate-pulse" />
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
            <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
            <p className="text-gray-600 mt-1">
              Analyse des performances et tendances
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">7 jours</SelectItem>
                <SelectItem value="30d">30 jours</SelectItem>
                <SelectItem value="90d">3 mois</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="rounded-xl">
              <Download className="w-4 h-4 mr-2" />
              Exporter
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Votes Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="rounded-2xl shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Évolution des votes
              </CardTitle>
              <CardDescription>Votes confirmés par jour</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={votesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "none",
                      borderRadius: "12px",
                      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="votes"
                    stroke="#6366f1"
                    strokeWidth={3}
                    dot={{ fill: "#6366f1", strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, stroke: "#6366f1", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Revenue Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="rounded-2xl shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="w-5 h-5 mr-2" />
                Revenus quotidiens
              </CardTitle>
              <CardDescription>Revenus en FCFA par jour</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={votesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "none",
                      borderRadius: "12px",
                      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                    }}
                    formatter={(value) => [`${value} FCFA`, "Revenus"]}
                  />
                  <Bar
                    dataKey="revenue"
                    fill="url(#revenueGradient)"
                    radius={[4, 4, 0, 0]}
                  />
                  <defs>
                    <linearGradient
                      id="revenueGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#059669" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Competition Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="rounded-2xl shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Vote className="w-5 h-5 mr-2" />
                Répartition par compétition
              </CardTitle>
              <CardDescription>Votes par compétition</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={competitionData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="votes"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {competitionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "none",
                      borderRadius: "12px",
                      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Top Players */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="rounded-2xl shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Top 5 Joueurs
              </CardTitle>
              <CardDescription>
                Les plus performants cette période
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPlayers.map((player, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          index === 0
                            ? "bg-yellow-100 text-yellow-700"
                            : index === 1
                            ? "bg-gray-100 text-gray-700"
                            : index === 2
                            ? "bg-amber-100 text-amber-700"
                            : "bg-indigo-100 text-indigo-700"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium">{player.name}</div>
                        <div className="text-sm text-gray-600">
                          {player.votes} votes
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-emerald-600">
                        {(player.revenue / 1000).toFixed(0)}K FCFA
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
