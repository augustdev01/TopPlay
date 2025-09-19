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
  Trophy,
  Plus,
  Search,
  Edit,
  Trash2,
  Users,
  Vote,
  Calendar,
  DollarSign,
  Eye,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { CompetitionEntity } from "@/types/entities/entities";

export default function AdminCompetitionsPage() {
  const [competitions, setCompetitions] = useState<CompetitionEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const res = await fetch("/api/admin/competitions");
        if (!res.ok) throw new Error("Erreur récupération compétitions");
        const data = await res.json();
        setCompetitions(data);
      } catch (error) {
        console.error("Erreur API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompetitions();
  }, [competitions]);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "active":
        return { label: "Active", color: "bg-green-500 text-white" };
      case "ended":
        return { label: "Terminée", color: "bg-gray-500 text-white" };
      case "draft":
        return { label: "Brouillon", color: "bg-orange-500 text-white" };
      default:
        return { label: "Inconnu", color: "bg-gray-500 text-white" };
    }
  };

  const filteredCompetitions = competitions.filter(
    (comp: CompetitionEntity) =>
      comp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comp.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (competitionSlug: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette compétition ?"))
      return;

    try {
      const res = await fetch(`/api/competitions/${competitionSlug}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Erreur lors de la suppression");
      }

      setCompetitions((prev) => prev.filter((c) => c.slug !== competitionSlug));
    } catch (error) {
      console.error(error);
      alert("La suppression a échoué.");
    }
  };

  const handleStatusChange = async (
    competitionId: string,
    newStatus: string
  ) => {
    try {
      const res = await fetch(
        `/api/admin/competitions/${competitionId}/change-status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!res.ok) {
        throw new Error("Erreur lors de la mise à jour du statut");
      }

      const updated = await res.json();

      setCompetitions((prev) =>
        prev.map((c) => (c._id === competitionId ? updated : c))
      );
    } catch (error) {
      console.error(error);
      alert("La mise à jour a échoué.");
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded animate-pulse w-1/3" />
        <div className="grid gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="rounded-2xl">
              <CardContent className="p-6">
                <div className="h-24 bg-gray-200 rounded animate-pulse" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  function formatRevenue(revenue: number): string {
    if (revenue >= 1_000_000) {
      return `${(revenue / 1_000_000).toFixed(1)}M FCFA`; // millions
    }
    if (revenue >= 1_000) {
      return `${(revenue / 1_000).toFixed(1)}K FCFA`; // milliers
    }
    return `${revenue} FCFA`; // moins de 1000
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
            <h1 className="text-3xl font-bold text-gray-900">Compétitions</h1>
            <p className="text-gray-600 mt-1">
              Gérez toutes les compétitions de la plateforme
            </p>
          </div>
          <Button
            asChild
            className="bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg"
          >
            <Link href="/admin/competitions/create">
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle compétition
            </Link>
          </Button>
        </div>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="rounded-2xl shadow-lg border-0">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <Input
                placeholder="Rechercher une compétition..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 rounded-xl border-2"
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Competitions List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-6"
      >
        {filteredCompetitions.map((competition, index) => {
          const statusConfig = getStatusConfig(competition.status);

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Card className="rounded-2xl shadow-lg border-0 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <Trophy className="w-6 h-6 text-indigo-600" />
                        <h3 className="text-xl font-bold text-gray-900">
                          {competition.name}
                        </h3>
                        <Badge
                          className={`${statusConfig.color} rounded-full px-3 py-1`}
                        >
                          {statusConfig.label}
                        </Badge>
                      </div>

                      <p className="text-gray-600 mb-4">
                        {competition.description}
                      </p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">
                            {competition.playersCount} joueurs
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Vote className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">
                            {competition.totalVotes} votes
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <DollarSign className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">
                            {formatRevenue(competition.revenue)}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">
                            {competition.startDate
                              ? new Date(
                                  competition.startDate
                                ).toLocaleDateString("fr-FR")
                              : "Non définie"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2 ml-6">
                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="rounded-xl"
                      >
                        <Link href={`competitions/${competition.slug}`}>
                          <Eye className="w-4 h-4 mr-2" />
                          Voir
                        </Link>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-xl"
                      >
                        <Link
                          className="flex"
                          href={`competitions/${competition.slug}/edit`}
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Modifier
                        </Link>
                      </Button>

                      {/* Quick status change */}
                      {competition.status === "draft" && (
                        <Button
                          size="sm"
                          onClick={() =>
                            handleStatusChange(competition._id, "active")
                          }
                          className="bg-green-600 hover:bg-green-700 rounded-xl text-white"
                        >
                          Activer
                        </Button>
                      )}

                      {competition.status === "active" && (
                        <Button
                          size="sm"
                          onClick={() =>
                            handleStatusChange(competition._id, "ended")
                          }
                          className="bg-gray-600 hover:bg-gray-700 rounded-xl text-white"
                        >
                          Terminer
                        </Button>
                      )}

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(competition.slug)}
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
          );
        })}
      </motion.div>

      {filteredCompetitions.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Aucune compétition trouvée
          </h3>
          <p className="text-gray-500 mb-6">
            {searchTerm
              ? "Aucun résultat pour votre recherche"
              : "Créez votre première compétition"}
          </p>
          <Button
            asChild
            className="bg-indigo-600 hover:bg-indigo-700 rounded-xl"
          >
            <Link href="/admin/competitions/create">
              <Plus className="w-4 h-4 mr-2" />
              Créer une compétition
            </Link>
          </Button>
        </motion.div>
      )}
    </div>
  );
}
