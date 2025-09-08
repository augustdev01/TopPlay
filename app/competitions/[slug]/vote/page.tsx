"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { PlayersGrid } from "@/components/players/players-grid";
import { PlayersFilters } from "@/components/players/players-filters";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trophy, ArrowLeft, Users, Vote } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { CompetitionEntity } from "@/types/entities/entities";

interface Competition {
  _id: string;
  slug: string;
  name: string;
  description?: string;
  votePrice: number;
  status: string;
}

interface Player {
  _id: string;
  slug: string;
  firstName: string;
  lastName: string;
  age: number;
  team?: string;
  position?: string;
  bio?: string;
  photoUrl?: string;
  votesConfirmed: number;
}

export default function VotePage() {
  const params = useParams();
  const competitionSlug = params.slug as string;

  const [competition, setCompetition] = useState<CompetitionEntity | null>(
    null
  );
  const [players, setPlayers] = useState<Player[]>([]);
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    team: "",
    position: "",
    sortBy: "votes",
  });

  useEffect(() => {
    fetchData();
  }, [competitionSlug]);

  useEffect(() => {
    applyFilters();
  }, [players, filters]);

  const fetchData = async () => {
    try {
      const [compResponse, playersResponse] = await Promise.all([
        fetch(`/api/competitions/${competitionSlug}`),
        fetch(`/api/competitions/${competitionSlug}/players`),
      ]);

      if (compResponse.ok) {
        const compData = await compResponse.json();
        setCompetition(compData);
      }

      if (playersResponse.ok) {
        const playersData = await playersResponse.json();
        setPlayers(playersData);
      }
    } catch (error) {
      console.error("Erreur chargement données:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...players];

    // Recherche par nom
    if (filters.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter((player) =>
        `${player.firstName} ${player.lastName}`.toLowerCase().includes(search)
      );
    }

    // Filtre par équipe
    if (filters.team) {
      filtered = filtered.filter((player) => player.team === filters.team);
    }

    // Filtre par poste
    if (filters.position) {
      filtered = filtered.filter(
        (player) => player.position === filters.position
      );
    }

    // Tri
    switch (filters.sortBy) {
      case "votes":
        filtered.sort((a, b) => b.votesConfirmed - a.votesConfirmed);
        break;
      case "name":
        filtered.sort((a, b) =>
          `${a.firstName} ${a.lastName}`.localeCompare(
            `${b.firstName} ${b.lastName}`
          )
        );
        break;
      case "team":
        filtered.sort((a, b) => (a.team || "").localeCompare(b.team || ""));
        break;
    }

    setFilteredPlayers(filtered);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 p-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="rounded-2xl">
                <CardHeader>
                  <div className="h-48 bg-gray-200 rounded-xl animate-pulse mb-4" />
                  <div className="h-6 bg-gray-200 rounded animate-pulse mb-2" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!competition || competition.status !== "active") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <CardTitle>Compétition non disponible</CardTitle>
            <CardDescription>
              Cette compétition n'est pas active ou n'existe pas.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/competitions">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour aux compétitions
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const uniqueTeams = Array.from(
    new Set(players.map((p) => p.team).filter((t): t is string => !!t))
  );

  const uniquePositions = Array.from(
    new Set(players.map((p) => p.position).filter((p): p is string => !!p))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex  flex-col-reverse gap-4 md:flex-row  md:items-center md:justify-between">
              <div>
                <h1 className=" text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 text-center sm:text-left">
                  {competition.name}
                </h1>
                {competition.description && (
                  <p className="text-lg text-gray-600 text-center sm:text-left">
                    {competition.description}
                  </p>
                )}
                <div className="flex items-center space-x-4 mt-4 justify-center sm:justify-start">
                  <div className="flex items-center space-x-2 bg-indigo-50 rounded-full px-4 py-2">
                    <Vote className="w-5 h-5 text-indigo-600" />
                    <span className="font-semibold text-indigo-600 text-xs sm:text-sm">
                      {competition.votePrice} FCFA par vote
                    </span>
                  </div>
                  <div className="flex items-center  space-x-2 bg-emerald-50 rounded-full px-4 py-2">
                    <Users className="w-5 h-5 text-emerald-600" />
                    <span className="font-semibold text-xs text-emerald-600 sm:text-sm">
                      {players.length} joueurs
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button asChild variant="outline" className="rounded-xl">
                  <Link href="/competitions">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Retour
                  </Link>
                </Button>
                <Button
                  asChild
                  className="bg-emerald-600 hover:bg-emerald-700 rounded-xl"
                >
                  <Link href={`/competitions/${competitionSlug}/classement`}>
                    <Trophy className="w-4 h-4 mr-2" />
                    Classement
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <PlayersFilters
            filters={filters}
            onFiltersChange={setFilters}
            teams={uniqueTeams}
            positions={uniquePositions}
          />
        </motion.div>

        {/* Players Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <PlayersGrid
            players={filteredPlayers}
            competition={competition}
            onVoteSuccess={fetchData}
          />
        </motion.div>
      </div>
    </div>
  );
}
