'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Trophy, Users, Vote } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Competition {
  _id: string;
  slug: string;
  name: string;
  status: 'draft' | 'active' | 'ended';
  votePrice: number;
  startDate?: string;
  endDate?: string;
  description?: string;
  playersCount?: number;
  totalVotes?: number;
}

export default function CompetitionsPage() {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompetitions();
  }, []);

  const fetchCompetitions = async () => {
    try {
      const response = await fetch('/api/competitions');
      if (response.ok) {
        const data = await response.json();
        setCompetitions(data);
      }
    } catch (error) {
      console.error('Erreur chargement compétitions:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'active':
        return {
          label: 'En cours',
          color: 'bg-green-500',
          textColor: 'text-green-700',
          bgColor: 'bg-green-50'
        };
      case 'ended':
        return {
          label: 'Terminée',
          color: 'bg-gray-500',
          textColor: 'text-gray-700',
          bgColor: 'bg-gray-50'
        };
      case 'draft':
      default:
        return {
          label: 'Brouillon',
          color: 'bg-orange-500',
          textColor: 'text-orange-700',
          bgColor: 'bg-orange-50'
        };
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="rounded-2xl">
              <CardHeader>
                <div className="h-6 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
                </div>
              </CardContent>
            </Card>
          ))}
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
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Compétitions disponibles
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Découvrez les compétitions en cours et votez pour vos joueurs favoris
            </p>
          </motion.div>
        </div>
      </div>

      {/* Competitions Grid */}
      <div className="container mx-auto px-4 py-8">
        {competitions.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Aucune compétition disponible
            </h3>
            <p className="text-gray-500">
              Les compétitions seront bientôt disponibles
            </p>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {competitions.map((competition, index) => {
              const statusConfig = getStatusConfig(competition.status);
              
              return (
                <motion.div
                  key={competition._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-0">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge 
                          className={`${statusConfig.color} text-white rounded-full px-3 py-1`}
                        >
                          {statusConfig.label}
                        </Badge>
                        <div className="text-right">
                          <div className="text-sm text-gray-500">Prix du vote</div>
                          <div className="font-bold text-indigo-600">
                            {competition.votePrice} FCFA
                          </div>
                        </div>
                      </div>
                      
                      <CardTitle className="text-xl">{competition.name}</CardTitle>
                      {competition.description && (
                        <CardDescription className="text-sm">
                          {competition.description}
                        </CardDescription>
                      )}
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      {/* Dates */}
                      {(competition.startDate || competition.endDate) && (
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {competition.startDate && new Date(competition.startDate).toLocaleDateString('fr-FR')}
                            {competition.startDate && competition.endDate && ' - '}
                            {competition.endDate && new Date(competition.endDate).toLocaleDateString('fr-FR')}
                          </span>
                        </div>
                      )}

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-indigo-50 rounded-lg p-3 text-center">
                          <Users className="w-5 h-5 text-indigo-600 mx-auto mb-1" />
                          <div className="text-lg font-bold text-indigo-600">
                            {competition.playersCount || 0}
                          </div>
                          <div className="text-xs text-gray-600">Joueurs</div>
                        </div>
                        
                        <div className="bg-emerald-50 rounded-lg p-3 text-center">
                          <Vote className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                          <div className="text-lg font-bold text-emerald-600">
                            {competition.totalVotes || 0}
                          </div>
                          <div className="text-xs text-gray-600">Votes</div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex space-x-2 pt-4">
                        <Button 
                          asChild 
                          className="flex-1 bg-indigo-600 hover:bg-indigo-700 rounded-xl"
                          disabled={competition.status !== 'active'}
                        >
                          <Link href={`/competitions/${competition.slug}/vote`}>
                            Voter
                          </Link>
                        </Button>
                        <Button 
                          asChild 
                          variant="outline" 
                          className="flex-1 rounded-xl border-2"
                        >
                          <Link href={`/competitions/${competition.slug}/classement`}>
                            Classement
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}