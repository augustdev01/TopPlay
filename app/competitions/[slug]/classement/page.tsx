"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { LeaderboardTable } from "@/components/leaderboard/leaderboard-table";
/* import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; */
import { Button } from "@/components/ui/button";
import { Trophy, ArrowLeft, RefreshCw } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface Competition {
  _id: string;
  slug: string;
  name: string;
  description?: string;
  status: string;
}

interface LeaderboardEntry {
  _id: string;
  slug: string;
  firstName: string;
  lastName: string;
  team?: string;
  position?: string;
  photoUrl?: string;
  votesConfirmed: number;
  percentage: number;
}

const fetcher = async (url: string) => {
  console.log("Fetching:", url);
  const res = await fetch(url);
  if (!res.ok) throw new Error("Erreur API " + res.status);
  return res.json();
};

export default function LeaderboardPage() {
  const params = useParams();
  const competitionSlug = params.slug as string;

  const [competition, setCompetition] = useState<Competition | null>(null);

  // Polling du classement toutes les 3 secondes
  const { data, error, mutate, isLoading } = useSWR<{
    competition: Competition;
    leaderboard: LeaderboardEntry[];
  }>(`/api/competitions/${competitionSlug}/leaderboard`, fetcher, {
    refreshInterval: 30000, // 3 secondes
    dedupingInterval: 10000, // tolère 1s de dédoublon
    revalidateOnFocus: false, // optionnel
    revalidateOnReconnect: true,
  });

  useEffect(() => {
    fetchCompetition();
  }, [competitionSlug]);

  console.log(`data: ${data}, loadbord: ${data?.leaderboard}`);

  const fetchCompetition = async () => {
    try {
      const response = await fetch(`/api/competitions/${competitionSlug}`);
      if (response.ok) {
        const data = await response.json();
        setCompetition(data);
      }
    } catch (error) {
      console.error("Erreur chargement compétition:", error);
    }
  };

  const handleRefresh = () => {
    mutate();
  };

  if (!competition) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex flex-col-reverse gap-4 md:flex-row md:items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  <Trophy className="w-8 h-8 text-yellow-500 inline mr-3" />
                  Classement
                </h1>
                <p className="text-lg text-gray-600">{competition.name}</p>
                {competition.description && (
                  <p className="text-sm text-gray-500 mt-1">
                    {competition.description}
                  </p>
                )}
              </div>

              <div className="flex space-x-3">
                <Button
                  onClick={handleRefresh}
                  variant="outline"
                  size="icon"
                  className="rounded-xl"
                  disabled={isLoading}
                >
                  <RefreshCw
                    className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
                  />
                </Button>

                <Button asChild variant="outline" className="rounded-xl">
                  <Link href={`/competitions/${competitionSlug}/vote`}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Retour
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <LeaderboardTable
            leaderboard={data?.leaderboard || []}
            loading={isLoading}
            error={error}
            competitionSlug={competitionSlug}
          />
        </motion.div>
      </div>
    </div>
  );
}
