"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
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
import { Trophy, ArrowLeft, Save } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function EditCompetitionPage() {
  const router = useRouter();
  const params = useParams();
  const { slug } = params as { slug: string };

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<any>(null);

  useEffect(() => {
    const fetchCompetition = async () => {
      try {
        const res = await fetch(`/api/competitions/${slug}`);
        if (!res.ok) throw new Error("Erreur chargement");
        const data = await res.json();
        setFormData(data);
      } catch (error) {
        console.error(error);
        alert("Impossible de charger la compétition");
      }
    };
    fetchCompetition();
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/admin/competitions/${formData._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Erreur modification");

      router.push("/admin/competitions");
    } catch (error) {
      console.error(error);
      alert("Échec de la modification");
    } finally {
      setLoading(false);
    }
  };

  if (!formData) return <p className="p-6">Chargement...</p>;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Modifier la compétition</h1>
        <Button asChild variant="outline">
          <Link href="/admin/competitions">
            <ArrowLeft className="w-4 h-4 mr-2" /> Retour
          </Link>
        </Button>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Informations</CardTitle>
          <CardDescription>
            Modifiez les détails de la compétition
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label>Nom</Label>
              <Input
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev: any) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                required
              />
            </div>

            <div>
              <Label>Slug</Label>
              <Input
                value={formData.slug}
                onChange={(e) =>
                  setFormData((prev: any) => ({
                    ...prev,
                    slug: e.target.value,
                  }))
                }
                required
              />
            </div>

            <div>
              <Label>Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev: any) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
            </div>

            <div>
              <Label>Règlement</Label>
              <Textarea
                value={formData.rules}
                onChange={(e) =>
                  setFormData((prev: any) => ({
                    ...prev,
                    rules: e.target.value,
                  }))
                }
              />
            </div>

            <div>
              <Label>Statut</Label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData((prev: any) => ({ ...prev, status: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Brouillon</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="ended">Terminée</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                <Save className="w-4 h-4 mr-2" />{" "}
                {loading ? "Enregistrement..." : "Enregistrer"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
