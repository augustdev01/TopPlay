'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Target, Users, Shield, Heart, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-blue-50 py-16">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            À propos de 
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {" "}VoteSport
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            VoteSport est la première plateforme de vote dédiée aux compétitions sportives au Sénégal. 
            Notre mission est de connecter les fans avec leurs athlètes favoris et de promouvoir le sport local.
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="rounded-2xl shadow-lg border-0 h-full bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <Target className="w-12 h-12 text-indigo-600 mb-4" />
                <CardTitle className="text-2xl">Notre Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Démocratiser le soutien aux athlètes sénégalais en offrant une plateforme 
                  transparente et sécurisée où chaque fan peut exprimer son soutien par le vote. 
                  Nous croyons que chaque athlète mérite d'être reconnu pour ses efforts et ses performances.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="rounded-2xl shadow-lg border-0 h-full bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <Trophy className="w-12 h-12 text-emerald-600 mb-4" />
                <CardTitle className="text-2xl">Notre Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Devenir la référence en matière de reconnaissance sportive au Sénégal et en Afrique de l'Ouest. 
                  Nous voulons créer un écosystème où le talent est récompensé et où les fans 
                  jouent un rôle actif dans la promotion du sport.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Nos Valeurs</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center rounded-2xl shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Transparence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Tous les votes sont publics et vérifiables. 
                  Le classement est mis à jour en temps réel pour une transparence totale.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center rounded-2xl shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <CardTitle>Passion</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Nous partageons la passion du sport sénégalais et nous nous engageons 
                  à promouvoir nos talents locaux.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center rounded-2xl shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <Award className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <CardTitle>Excellence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Nous visons l'excellence dans tout ce que nous faisons, 
                  de la technologie à l'expérience utilisateur.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* How it works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-white/20"
        >
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Pourquoi VoteSport ?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <Users className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Soutien direct aux athlètes</h4>
                  <p className="text-gray-600">
                    Chaque vote représente un soutien financier direct qui aide les athlètes 
                    à poursuivre leur passion et à exceller dans leur discipline.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <Shield className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Sécurité garantie</h4>
                  <p className="text-gray-600">
                    Tous les paiements sont sécurisés par Wave Business et vérifiés automatiquement. 
                    Vos données personnelles sont protégées.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <Trophy className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Reconnaissance méritée</h4>
                  <p className="text-gray-600">
                    Les classements reflètent le véritable soutien populaire et aident 
                    à identifier les talents qui méritent d'être mis en avant.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl p-8 text-center">
              <Trophy className="w-20 h-20 text-indigo-600 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Rejoignez le mouvement
              </h3>
              <p className="text-gray-700 mb-6">
                Plus de 10,000 fans font déjà confiance à VoteSport pour soutenir leurs athlètes favoris.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-2xl font-bold text-indigo-600">12,450</div>
                  <div className="text-gray-600">Votes confirmés</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-emerald-600">156</div>
                  <div className="text-gray-600">Athlètes soutenus</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}