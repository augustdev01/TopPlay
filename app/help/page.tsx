'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  HelpCircle, 
  Vote, 
  CreditCard, 
  Trophy, 
  Phone,
  Mail,
  MessageCircle,
  ChevronRight,
  Smartphone,
  CheckCircle,
  Users
} from 'lucide-react';
import Link from 'next/link';

const faqData = [
  {
    question: 'Comment voter pour un joueur ?',
    answer: 'Sélectionnez une compétition active, choisissez votre joueur favori, saisissez votre numéro Wave et confirmez le paiement de 200 FCFA directement dans l\'app Wave. Votre vote sera confirmé automatiquement.'
  },
  {
    question: 'Puis-je voter plusieurs fois ?',
    answer: 'Oui ! Vous pouvez voter autant de fois que vous le souhaitez. Chaque vote coûte 200 FCFA et chaque transaction est indépendante.'
  },
  {
    question: 'Comment fonctionne le paiement Wave ?',
    answer: 'Après avoir saisi votre numéro Wave, vous serez redirigé vers l\'application Wave mobile pour confirmer le paiement. C\'est simple, rapide et sécurisé.'
  },
  {
    question: 'Quand mon vote sera-t-il confirmé ?',
    answer: 'Votre vote est confirmé automatiquement dès que le paiement est validé dans l\'app Wave. Cela prend généralement quelques secondes.'
  },
  {
    question: 'Comment voir le classement ?',
    answer: 'Le classement est mis à jour en temps réel et accessible depuis la page de chaque compétition. Vous pouvez aussi voir le classement général de toutes les compétitions.'
  },
  {
    question: 'Que faire si mon paiement n\'est pas confirmé ?',
    answer: 'Si votre paiement n\'apparaît pas après quelques minutes, vérifiez votre historique Wave ou contactez notre support.'
  }
];

export default function HelpPage() {
  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-blue-50 py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Centre d'
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              aide
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Trouvez rapidement les réponses à vos questions sur VoteSport
          </p>
        </motion.div>

        {/* Comment ça marche */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Comment ça marche ?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="text-center rounded-2xl shadow-lg border-0 bg-white/90 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h4 className="font-bold text-lg mb-3 text-gray-900">Choisissez votre joueur</h4>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Parcourez les compétitions actives et sélectionnez vos joueurs favoris
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center rounded-2xl shadow-lg border-0 bg-white/90 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h4 className="font-bold text-lg mb-3 text-gray-900">Saisissez votre numéro Wave</h4>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Entrez votre numéro de téléphone Wave pour être redirigé vers l'app mobile
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center rounded-2xl shadow-lg border-0 bg-white/90 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h4 className="font-bold text-lg mb-3 text-gray-900">Confirmez dans Wave</h4>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Validez le paiement de 200 FCFA dans l'app Wave. Votre vote est confirmé automatiquement
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* FAQ */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Questions fréquentes</h2>
              <div className="space-y-4">
                {faqData.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <Card className="rounded-2xl shadow-lg border-0 hover:shadow-xl transition-all duration-300">
                      <CardHeader>
                        <CardTitle className="flex items-center text-lg">
                          <HelpCircle className="w-5 h-5 mr-3 text-indigo-600" />
                          {faq.question}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="rounded-2xl shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Actions rapides</CardTitle>
                  <CardDescription>Liens utiles pour commencer</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button asChild className="w-full justify-between bg-indigo-600 hover:bg-indigo-700 rounded-xl">
                    <Link href="/competitions">
                      <div className="flex items-center">
                        <Vote className="w-4 h-4 mr-2" />
                        Voir les compétitions
                      </div>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </Button>
                  
                  <Button asChild variant="outline" className="w-full justify-between rounded-xl">
                    <Link href="/classements">
                      <div className="flex items-center">
                        <Trophy className="w-4 h-4 mr-2" />
                        Classements
                      </div>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Support */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="rounded-2xl shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Besoin d'aide ?</CardTitle>
                  <CardDescription>Notre équipe est là pour vous aider</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                    <Phone className="w-5 h-5 text-indigo-600" />
                    <div>
                      <div className="font-medium text-sm">Téléphone</div>
                      <div className="text-sm text-gray-600">+221 77 123 45 67</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                    <Mail className="w-5 h-5 text-emerald-600" />
                    <div>
                      <div className="font-medium text-sm">Email</div>
                      <div className="text-sm text-gray-600">support@votesport.sn</div>
                    </div>
                  </div>

                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 rounded-xl mt-4">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Contacter le support
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Wave Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="rounded-2xl shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Smartphone className="w-5 h-5 mr-2" />
                    Paiement Wave
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-blue-600 font-bold text-lg">Wave</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Paiements sécurisés via Wave Business, leader du paiement mobile au Sénégal.
                    </p>
                    <div className="bg-green-50 border border-green-200 rounded-xl p-3">
                      <div className="text-sm text-green-700 font-medium flex items-center justify-center mb-1">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Paiements instantanés
                      </div>
                      <div className="text-sm text-green-700 font-medium flex items-center justify-center mb-1">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Vérification automatique
                      </div>
                      <div className="text-sm text-green-700 font-medium flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Support 24/7
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}