'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Scale, AlertTriangle, CheckCircle, XCircle, Users } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-blue-50 py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Conditions 
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {" "}d'utilisation
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Termes et conditions régissant l'utilisation de la plateforme VoteSport
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Acceptation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="rounded-2xl shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <FileText className="w-6 h-6 mr-3 text-indigo-600" />
                  Acceptation des conditions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  En utilisant VoteSport, vous acceptez d'être lié par ces conditions d'utilisation. 
                  Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre service. 
                  Nous nous réservons le droit de modifier ces conditions à tout moment.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Utilisation du service */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="rounded-2xl shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Users className="w-6 h-6 mr-3 text-emerald-600" />
                  Utilisation du service
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-bold text-green-700 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Utilisations autorisées
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Voter pour vos joueurs favoris</li>
                      <li>• Consulter les classements et statistiques</li>
                      <li>• Partager les profils des joueurs</li>
                      <li>• Effectuer des paiements légitimes</li>
                      <li>• Contacter le support client</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-bold text-red-700 flex items-center">
                      <XCircle className="w-5 h-5 mr-2" />
                      Utilisations interdites
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Automatiser les votes (bots, scripts)</li>
                      <li>• Utiliser de fausses identités</li>
                      <li>• Tenter de pirater le système</li>
                      <li>• Harceler d'autres utilisateurs</li>
                      <li>• Violer les lois applicables</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Paiements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="rounded-2xl shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Scale className="w-6 h-6 mr-3 text-purple-600" />
                  Conditions de paiement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                  <h4 className="font-bold text-purple-800 mb-3">Tarification</h4>
                  <p className="text-purple-700 text-sm mb-3">
                    Chaque vote coûte 200 FCFA. Ce prix est fixe et non négociable. 
                    Aucun frais supplémentaire n'est appliqué par VoteSport.
                  </p>
                  <p className="text-purple-700 text-sm">
                    Les frais de transaction Wave Business peuvent s'appliquer selon votre méthode de paiement.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-3">Politique de remboursement</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Remboursement possible en cas d'erreur technique de notre part</li>
                    <li>• Aucun remboursement pour les votes validés et comptabilisés</li>
                    <li>• Délai de réclamation : 48h après le paiement</li>
                    <li>• Preuve de paiement requise pour toute réclamation</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Responsabilités */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="rounded-2xl shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <AlertTriangle className="w-6 h-6 mr-3 text-orange-600" />
                  Limitation de responsabilité
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                  <h4 className="font-bold text-orange-800 mb-3">Avertissement important</h4>
                  <p className="text-orange-700 text-sm leading-relaxed">
                    VoteSport est une plateforme de divertissement et de soutien aux athlètes. 
                    Nous ne garantissons aucun résultat sportif et ne sommes pas responsables 
                    des décisions prises par les organisateurs de compétitions basées sur nos classements.
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-bold text-gray-900">Exclusions de responsabilité</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Interruptions temporaires du service</li>
                    <li>• Erreurs dans les classements dues à des problèmes techniques</li>
                    <li>• Décisions des organisateurs de compétitions</li>
                    <li>• Problèmes liés aux services tiers (Wave Business)</li>
                    <li>• Pertes financières indirectes</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="rounded-2xl shadow-lg border-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
              <CardContent className="p-8 text-center">
                <FileText className="w-12 h-12 text-white mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Questions juridiques ?</h3>
                <p className="text-indigo-100 mb-6">
                  Pour toute question concernant ces conditions d'utilisation, 
                  contactez notre équipe juridique.
                </p>
                <div className="space-y-2">
                  <div className="text-sm">📧 legal@votesport.sn</div>
                  <div className="text-sm">📞 +221 77 123 45 67</div>
                  <div className="text-sm">📍 Dakar, Sénégal</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}