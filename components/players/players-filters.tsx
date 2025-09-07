"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Search, Filter } from "lucide-react";

interface FiltersState {
  search: string;
  team: string;
  position: string;
  sortBy: string;
}

interface PlayersFiltersProps {
  filters: FiltersState;
  onFiltersChange: (filters: FiltersState) => void;
  teams: string[];
  positions: string[];
}

export function PlayersFilters({
  filters,
  onFiltersChange,
  teams,
  positions,
}: PlayersFiltersProps) {
  const updateFilter = (key: keyof FiltersState, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Filter className="w-5 h-5 text-indigo-600" />
        <h3 className="font-semibold text-gray-900">Filtres et recherche</h3>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        {/* Search */}
        <div>
          <Label htmlFor="search" className="text-sm font-medium">
            Rechercher
          </Label>
          <div className="relative mt-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <Input
              id="search"
              placeholder="Nom du joueur..."
              value={filters.search}
              onChange={(e) => updateFilter("search", e.target.value)}
              className="pl-10 rounded-xl"
            />
          </div>
        </div>

        {/* Team Filter */}
        <div>
          <Label className="text-sm font-medium">Équipe</Label>
          <Select
            value={filters.team}
            onValueChange={(value) => updateFilter("team", value)}
          >
            <SelectTrigger className="rounded-xl mt-1">
              <SelectValue placeholder="Toutes les équipes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les équipes</SelectItem>
              {teams.map((team) => (
                <SelectItem key={team} value={team}>
                  {team}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Position Filter */}
        <div>
          <Label className="text-sm font-medium">Position</Label>
          <Select
            value={filters.position}
            onValueChange={(value) => updateFilter("position", value)}
          >
            <SelectTrigger className="rounded-xl mt-1">
              <SelectValue placeholder="Toutes les positions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les positions</SelectItem>
              {positions.map((position) => (
                <SelectItem key={position} value={position}>
                  {position}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Sort */}
        <div>
          <Label className="text-sm font-medium">Trier par</Label>
          <Select
            value={filters.sortBy}
            onValueChange={(value) => updateFilter("sortBy", value)}
          >
            <SelectTrigger className="rounded-xl mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="votes">Nombre de votes</SelectItem>
              <SelectItem value="name">Nom</SelectItem>
              <SelectItem value="team">Équipe</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
