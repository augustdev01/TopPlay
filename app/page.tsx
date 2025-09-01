'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Vote, Users, TrendingUp, ArrowRight, Star, Shield, Zap } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-blue-50">

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
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="text-center hover:shadow-xl transition-all duration-300 hover:scale-[1.02] rounded-2xl border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Vote className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">Votes illimités</CardTitle>
                <CardDescription>
                  Votez autant de fois que vous voulez pour vos joueurs favoris
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6">
                  <span className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">200 FCFA</span>
                  <p className="text-sm text-gray-600 mt-2 font-medium">par vote</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="text-center hover:shadow-xl transition-all duration-300 hover:scale-[1.02] rounded-2xl border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">Classement en temps réel</CardTitle>
                <CardDescription>
                  Suivez l'évolution des votes et des classements en direct
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6">
                  <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Live</span>
                  <p className="text-sm text-gray-600 mt-2 font-medium">Mise à jour automatique</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card className="text-center hover:shadow-xl transition-all duration-300 hover:scale-[1.02] rounded-2xl border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">Paiement sécurisé</CardTitle>
                <CardDescription>
                  Paiements via Wave Business, sécurisés et vérifiés automatiquement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
                  <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Wave</span>
                  <p className="text-sm text-gray-600 mt-2 font-medium">Paiement mobile</p>
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
          className="mt-20 bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl max-w-5xl mx-auto border border-white/20"
        >
          <h3 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Comment ça marche ?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h4 className="font-bold text-lg mb-3 text-gray-900">Choisissez votre joueur</h4>
              <p className="text-gray-600 leading-relaxed">Parcourez les profils et sélectionnez vos favoris dans les compétitions actives</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h4 className="font-bold text-lg mb-3 text-gray-900">Effectuez le paiement</h4>
              <p className="text-gray-600 leading-relaxed">Payez 200 FCFA via Wave Business en toute sécurité avec vérification automatique</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h4 className="font-bold text-lg mb-3 text-gray-900">Vote confirmé</h4>
              <p className="text-gray-600 leading-relaxed">Votre vote est automatiquement ajouté au classement en temps réel</p>
            </div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 grid md:grid-cols-4 gap-6 max-w-5xl mx-auto"
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/20">
            <div className="text-3xl font-bold text-indigo-600 mb-2">12,450</div>
            <div className="text-gray-600 font-medium">Votes confirmés</div>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/20">
            <div className="text-3xl font-bold text-emerald-600 mb-2">156</div>
            <div className="text-gray-600 font-medium">Joueurs actifs</div>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/20">
            <div className="text-3xl font-bold text-purple-600 mb-2">8</div>
            <div className="text-gray-600 font-medium">Compétitions</div>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/20">
            <div className="text-3xl font-bold text-orange-600 mb-2">2.5M</div>
            <div className="text-gray-600 font-medium">FCFA collectés</div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}