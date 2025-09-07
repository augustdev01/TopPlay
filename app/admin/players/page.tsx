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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Users,
  Plus,
  Search,
  Edit,
  Trash2,
  Trophy,
  Vote,
  Filter,
  Eye,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
// import { mockPlayers, mockCompetitions } from "@/lib/mock-data";

export default function AdminPlayersPage() {
  const [players, setPlayers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCompetition, setSelectedCompetition] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        setLoading(true);

        // Récupérer toutes les compétitions actives
        const compRes = await fetch("/api/admin/competitions");
        const competitions = await compRes.json();

        // Récupérer tous les joueurs
        const playersRes = await fetch("/api/admin/players"); // à créer côté API
        const playersData = await playersRes.json();

        // Enrichir les joueurs avec infos de compétition
        const enrichedPlayers = playersData.map((player: any) => {
          const competition = competitions.find(
            (c: any) => c.id === player.competitionId
          );
          return {
            ...player,
            competition: competition?.name || "Compétition inconnue",
            competitionSlug: competition?.slug || "",
            competitionStatus: competition?.status || "draft",
            revenue: player.votesConfirmed * (competition?.votePrice || 200),
          };
        });

        setPlayers(enrichedPlayers);
      } catch (error) {
        console.error("Erreur chargement joueurs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  const competitions = Array.from(new Set(players.map((p) => p.competition)));
  const teams = Array.from(new Set(players.map((p) => p.team).filter(Boolean)));

  const filteredPlayers = players.filter((player) => {
    const matchesSearch = `${player.firstName} ${player.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCompetition =
      !selectedCompetition || player.competition === selectedCompetition;
    const matchesTeam = !selectedTeam || player.team === selectedTeam;

    return matchesSearch && matchesCompetition && matchesTeam;
  });

  const handleDelete = (playerId: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce joueur ?")) {
      setPlayers((prev) => prev.filter((p) => p._id !== playerId));
    }
  };

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
            <p className="text-gray-600 mt-1">
              Gérez tous les joueurs de la plateforme
            </p>
          </div>
          <Button
            asChild
            className="bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg"
          >
            <Link href="/admin/players/create">
              <Plus className="w-4 h-4 mr-2" />
              Nouveau joueur
            </Link>
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <Input
                  placeholder="Rechercher un joueur..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 rounded-xl"
                />
              </div>

              <Select
                value={selectedCompetition}
                onValueChange={setSelectedCompetition}
              >
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Toutes les compétitions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les compétitions</SelectItem>
                  {competitions.map((comp, index) => (
                    <SelectItem key={index} value={comp}>
                      {comp}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedTeam} onValueChange={setSelectedTeam}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Toutes les équipes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les équipes</SelectItem>
                  {teams.map((team, index) => (
                    <SelectItem key={index} value={team}>
                      {team}
                    </SelectItem>
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
            key={index}
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
                        <Badge
                          className={`text-xs ${
                            player.competitionStatus === "active"
                              ? "bg-green-100 text-green-700"
                              : player.competitionStatus === "ended"
                              ? "bg-gray-100 text-gray-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {player.competitionStatus}
                        </Badge>
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <span>{player.team || "Équipe non définie"}</span>
                        {player.team && <span>•</span>}
                        <span>{player.position || "Position non définie"}</span>
                        <span>•</span>
                        <span>{player.competition}</span>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-emerald-50 rounded-lg p-2 text-center">
                          <div className="text-lg font-bold text-emerald-600">
                            {player.votesConfirmed}
                          </div>
                          <div className="text-xs text-gray-600">
                            Votes confirmés
                          </div>
                        </div>
                        <div className="bg-orange-50 rounded-lg p-2 text-center">
                          <div className="text-lg font-bold text-orange-600">
                            {player.votesPending || 0}
                          </div>
                          <div className="text-xs text-gray-600">
                            En attente
                          </div>
                        </div>
                        <div className="bg-indigo-50 rounded-lg p-2 text-center">
                          <div className="text-lg font-bold text-indigo-600">
                            {(player.revenue / 1000).toFixed(0)}K
                          </div>
                          <div className="text-xs text-gray-600">
                            FCFA générés
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col space-y-2 ml-6">
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="rounded-xl"
                    >
                      <Link
                        href={`/competitions/${player.competitionSlug}/players/${player.slug}`}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Voir
                      </Link>
                    </Button>
                    <Button size="sm" variant="outline" className="rounded-xl">
                      <Edit className="w-4 h-4 mr-2" />
                      Modifier
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(player._id)}
                      className="rounded-xl text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                    >
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

      {filteredPlayers.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Aucun joueur trouvé
          </h3>
          <p className="text-gray-500 mb-6">
            {searchTerm
              ? "Aucun résultat pour votre recherche"
              : "Ajoutez votre premier joueur"}
          </p>
          <Button
            asChild
            className="bg-indigo-600 hover:bg-indigo-700 rounded-xl"
          >
            <Link href="/admin/players/create">
              <Plus className="w-4 h-4 mr-2" />
              Ajouter un joueur
            </Link>
          </Button>
        </motion.div>
      )}
    </div>
  );
}
