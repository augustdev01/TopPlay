'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Vote, Users, TrendingUp, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <Trophy className="w-8 h-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-900">VoteSport</h1>
            </motion.div>
            
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/competitions" className="text-gray-600 hover:text-indigo-600 transition-colors">
                Compétitions
              </Link>
              <Link href="/classements" className="text-gray-600 hover:text-indigo-600 transition-colors">
                Classements
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Votez pour vos 
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {" "}joueurs favoris
              </span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Soutenez vos athlètes préférés dans nos compétitions. 
              Chaque vote compte et aide à identifier les meilleurs talents.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-lg px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all">
              <Link href="/competitions">
                Voir les compétitions
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-4 rounded-2xl border-2 hover:bg-gray-50">
              <Link href="/classements">Classements</Link>
            </Button>
          </motion.div>
        </div>

        {/* Features Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="text-center hover:shadow-lg transition-shadow rounded-2xl border-0 shadow-md">
              <CardHeader>
                <Vote className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
                <CardTitle>Votes illimités</CardTitle>
                <CardDescription>
                  Votez autant de fois que vous voulez pour vos joueurs favoris
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-indigo-50 rounded-xl p-4">
                  <span className="text-2xl font-bold text-indigo-600">200 FCFA</span>
                  <p className="text-sm text-gray-600 mt-1">par vote</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="text-center hover:shadow-lg transition-shadow rounded-2xl border-0 shadow-md">
              <CardHeader>
                <TrendingUp className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                <CardTitle>Classement en temps réel</CardTitle>
                <CardDescription>
                  Suivez l'évolution des votes et des classements en direct
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-emerald-50 rounded-xl p-4">
                  <span className="text-lg font-semibold text-emerald-600">Live</span>
                  <p className="text-sm text-gray-600 mt-1">Mise à jour automatique</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card className="text-center hover:shadow-lg transition-shadow rounded-2xl border-0 shadow-md">
              <CardHeader>
                <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Paiement sécurisé</CardTitle>
                <CardDescription>
                  Paiements via Wave Business, sécurisés et vérifiés automatiquement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-purple-50 rounded-xl p-4">
                  <span className="text-lg font-semibold text-purple-600">Wave</span>
                  <p className="text-sm text-gray-600 mt-1">Paiement mobile</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 bg-white rounded-3xl p-8 shadow-lg max-w-4xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-center mb-6">Comment ça marche ?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-indigo-600">1</span>
              </div>
              <h4 className="font-semibold mb-2">Choisissez votre joueur</h4>
              <p className="text-sm text-gray-600">Parcourez les profils et sélectionnez vos favoris</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-indigo-600">2</span>
              </div>
              <h4 className="font-semibold mb-2">Effectuez le paiement</h4>
              <p className="text-sm text-gray-600">Payez 200 FCFA via Wave Business en toute sécurité</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-indigo-600">3</span>
              </div>
              <h4 className="font-semibold mb-2">Vote confirmé</h4>
              <p className="text-sm text-gray-600">Votre vote est automatiquement ajouté au classement</p>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}