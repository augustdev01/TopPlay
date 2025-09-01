'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
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
  Eye
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Mock data pour la démo
const mockCompetitions = [
  {
    _id: '1',
    slug: 'championnat-demo',
    name: 'Championnat de Démonstration',
    status: 'active' as const,
    votePrice: 200,
    startDate: '2025-01-01',
    endDate: '2025-02-28',
    description: 'Compétition de démonstration pour tester la plateforme',
    playersCount: 24,
    totalVotes: 1247,
    revenue: 249400,
    createdAt: '2024-12-15'
  },
  {
    _id: '2',
    slug: 'coupe-jeunes',
    name: 'Coupe des Jeunes Talents',
    status: 'active' as const,
    votePrice: 200,
    startDate: '2025-01-15',
    endDate: '2025-03-15',
    description: 'Compétition dédiée aux jeunes talents de moins de 21 ans',
    playersCount: 32,
    totalVotes: 892,
    revenue: 178400,
    createdAt: '2024-12-20'
  },
  {
    _id: '3',
    slug: 'ligue-veterans',
    name: 'Ligue des Vétérans',
    status: 'ended' as const,
    votePrice: 200,
    startDate: '2024-11-01',
    endDate: '2024-12-31',
    description: 'Compétition pour les joueurs expérimentés de plus de 30 ans',
    playersCount: 18,
    totalVotes: 2156,
    revenue: 431200,
    createdAt: '2024-10-25'
  },
  {
    _id: '4',
    slug: 'tournoi-feminin',
    name: 'Tournoi Féminin National',
    status: 'draft' as const,
    votePrice: 200,
    startDate: '2025-02-01',
    endDate: '2025-04-30',
    description: 'Premier tournoi national féminin de football',
    playersCount: 28,
    totalVotes: 0,
    revenue: 0,
    createdAt: '2025-01-10'
  }
];

export default function AdminCompetitionsPage() {
  const [competitions, setCompetitions] = useState(mockCompetitions);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setTimeout(() => setLoading(false), 800);
  }, []);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'active':
        return { label: 'Active', color: 'bg-green-500 text-white' };
      case 'ended':
        return { label: 'Terminée', color: 'bg-gray-500 text-white' };
      case 'draft':
        return { label: 'Brouillon', color: 'bg-orange-500 text-white' };
      default:
        return { label: 'Inconnu', color: 'bg-gray-500 text-white' };
    }
  };

  const filteredCompetitions = competitions.filter(comp =>
    comp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    comp.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <p className="text-gray-600 mt-1">Gérez toutes les compétitions de la plateforme</p>
          </div>
          <Button className="bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg">
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle compétition
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
              key={competition._id}
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
                        <h3 className="text-xl font-bold text-gray-900">{competition.name}</h3>
                        <Badge className={`${statusConfig.color} rounded-full px-3 py-1`}>
                          {statusConfig.label}
                        </Badge>
                      </div>
                      
                      <p className="text-gray-600 mb-4">{competition.description}</p>
                      
                      <div className="grid md:grid-cols-4 gap-4">
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
                            {(competition.revenue / 1000).toFixed(0)}K FCFA
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">
                            {new Date(competition.startDate).toLocaleDateString('fr-FR')}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2 ml-6">
                      <Button size="sm" variant="outline" className="rounded-xl">
                        <Eye className="w-4 h-4 mr-2" />
                        Voir
                      </Button>
                      <Button size="sm" variant="outline" className="rounded-xl">
                        <Edit className="w-4 h-4 mr-2" />
                        Modifier
                      </Button>
                      <Button size="sm" variant="outline" className="rounded-xl text-red-600 hover:text-red-700">
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
    </div>
  );
}