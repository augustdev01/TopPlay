"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Users, ArrowLeft, Save, Upload, Image } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { CompetitionEntity } from "@/types/entities/entities";
// import { mockCompetitions } from "@/lib/mock-data";

export default function CreatePlayerPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [competitions, setCompetitions] = useState<CompetitionEntity[]>([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    slug: "",
    age: 0,
    team: "",
    position: "",
    bio: "",
    photoUrl: "",
    competitionId: "",
  });

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
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/admin/players", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erreur création");
      }

      // Rediriger vers la liste
      router.push("/admin/players");
    } catch (error) {
      console.error("Erreur création:", error);
      alert("Erreur lors de la création du joueur");
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (firstName: string, lastName: string) => {
    return `${firstName} ${lastName}`
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleNameChange = (field: "firstName" | "lastName", value: string) => {
    const newData = { ...formData, [field]: value };
    newData.slug = generateSlug(newData.firstName, newData.lastName);
    setFormData(newData);
  };

  const positions = [
    "Gardien",
    "Défenseur",
    "Milieu",
    "Attaquant",
    "Ailier",
    "Libéro",
    "Arrière latéral",
    "Milieu défensif",
    "Milieu offensif",
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Nouveau joueur</h1>
            <p className="text-gray-600 mt-1">
              Ajoutez un nouveau joueur à une compétition
            </p>
          </div>
          <Button asChild variant="outline" className="rounded-xl">
            <Link href="/admin/players">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Link>
          </Button>
        </div>
      </motion.div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="rounded-2xl shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Informations du joueur
            </CardTitle>
            <CardDescription>
              Remplissez les détails du nouveau joueur
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Compétition */}
              <div>
                <Label htmlFor="competition">Compétition *</Label>
                <Select
                  value={formData.competitionId}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, competitionId: value }))
                  }
                >
                  <SelectTrigger className="rounded-xl mt-1">
                    <SelectValue placeholder="Sélectionnez une compétition" />
                  </SelectTrigger>
                  <SelectContent>
                    {competitions.map((comp) => (
                      <SelectItem key={comp._id} value={comp._id}>
                        {comp.name} ({comp.status})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Nom et prénom */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName">Prénom *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) =>
                      handleNameChange("firstName", e.target.value)
                    }
                    className="rounded-xl mt-1"
                    placeholder="Mamadou"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="lastName">Nom *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) =>
                      handleNameChange("lastName", e.target.value)
                    }
                    className="rounded-xl mt-1"
                    placeholder="Diallo"
                    required
                  />
                </div>
              </div>

              {/* Slug */}
              <div>
                <Label htmlFor="slug">Slug (URL) *</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, slug: e.target.value }))
                  }
                  className="rounded-xl mt-1"
                  placeholder="mamadou-diallo"
                  required
                />
              </div>

              {/* Détails */}
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="age">Âge *</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        age: e.target.value ? Number(e.target.value) : 0,
                      }))
                    }
                    className="rounded-xl mt-1"
                    min="16"
                    max="50"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="team">Équipe</Label>
                  <Input
                    id="team"
                    value={formData.team}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, team: e.target.value }))
                    }
                    className="rounded-xl mt-1"
                    placeholder="ASC Diaraf"
                  />
                </div>

                <div>
                  <Label htmlFor="position">Position</Label>
                  <Select
                    value={formData.position}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, position: value }))
                    }
                  >
                    <SelectTrigger className="rounded-xl mt-1">
                      <SelectValue placeholder="Sélectionnez" />
                    </SelectTrigger>
                    <SelectContent>
                      {positions.map((pos) => (
                        <SelectItem key={pos} value={pos}>
                          {pos}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Photo */}
              <div>
                <Label htmlFor="photoUrl">URL de la photo</Label>
                <div className="flex space-x-4 mt-1">
                  <Input
                    id="photoUrl"
                    value={formData.photoUrl}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        photoUrl: e.target.value,
                      }))
                    }
                    className="rounded-xl flex-1"
                    placeholder="https://images.pexels.com/..."
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-xl"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload
                  </Button>
                </div>
                {formData.photoUrl && (
                  <div className="mt-3">
                    <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden">
                      <img
                        src={formData.photoUrl}
                        alt="Aperçu"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Bio */}
              <div>
                <Label htmlFor="bio">Biographie</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, bio: e.target.value }))
                  }
                  className="rounded-xl mt-1"
                  rows={4}
                  placeholder="Biographie du joueur, ses qualités, son parcours..."
                />
              </div>

              <div className="flex justify-end space-x-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  className="rounded-xl"
                >
                  Annuler
                </Button>
                <Button
                  type="submit"
                  disabled={
                    loading ||
                    !formData.firstName ||
                    !formData.lastName ||
                    !formData.competitionId
                  }
                  className="bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg"
                >
                  {loading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                    />
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  {loading ? "Création..." : "Créer le joueur"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
