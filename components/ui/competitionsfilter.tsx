import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CompetitionFilterProps {
  competitionFilter: string;
  setCompetitionFilter: (value: string) => void;
}

export default function CompetitionFilter({
  competitionFilter,
  setCompetitionFilter,
}: CompetitionFilterProps) {
  const [competitions, setCompetitions] = useState<
    { _id: string; name: string }[]
  >([]);

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const res = await fetch("/api/admin/competitions");
        const data = await res.json();
        setCompetitions(data.competitions ?? data);
      } catch (err) {
        console.error("Erreur fetch compétitions:", err);
      }
    };
    fetchCompetitions();
  }, []);

  return (
    <Select
      value={competitionFilter}
      onValueChange={(val) => {
        console.log("🏁 Compétition sélectionnée:", val);
        setCompetitionFilter(val);
      }}
    >
      <SelectTrigger>
        {/* ❌ Ne pas mettre de texte enfant ici */}
        <SelectValue placeholder="Compétition" />
      </SelectTrigger>

      <SelectContent>
        {competitions.length > 0 ? (
          competitions.map((c, i) => (
            <SelectItem key={i} value={c._id}>
              {c.name}
            </SelectItem>
          ))
        ) : (
          <div className="px-3 py-2 text-sm text-muted-foreground">
            Aucune compétition
          </div>
        )}
      </SelectContent>
    </Select>
  );
}
