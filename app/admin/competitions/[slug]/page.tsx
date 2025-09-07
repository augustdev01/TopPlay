"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Calendar, Users, Vote, DollarSign } from "lucide-react";

export default function CompetitionDetailsPage() {
  const params = useParams();
  const { slug } = params as { slug: string };
  const [competition, setCompetition] = useState<any>(null);

  useEffect(() => {
    const fetchCompetition = async () => {
      const res = await fetch(`/api/competitions/${slug}`);
      if (res.ok) {
        setCompetition(await res.json());
      }
    };
    fetchCompetition();
  }, [slug]);

  if (!competition) return <p className="p-6">Chargement...</p>;

  return (
    <Card className="p-6">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Trophy className="text-indigo-600" /> <span>{competition.name}</span>
          <Badge>{competition.status}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>{competition.description}</p>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4" />{" "}
            <span>{competition.startDate}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4" /> <span>{competition.endDate}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4" />{" "}
            <span>{competition.playersCount} joueurs</span>
          </div>
          <div className="flex items-center space-x-2">
            <Vote className="w-4 h-4" />{" "}
            <span>{competition.totalVotes} votes</span>
          </div>
          <div className="flex items-center space-x-2">
            <DollarSign className="w-4 h-4" />{" "}
            <span>{competition.revenue} FCFA</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
