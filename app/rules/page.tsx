'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Shield, 
  Vote, 
  CreditCard, 
  Users, 
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';

export default function RulesPage() {
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
            Règlement 
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {" "}VoteSport
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Règles et conditions d'utilisation de la plateforme de vote
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Règles de vote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="rounded-2xl shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Vote className="w-6 h-6 mr-3 text-indigo-600" />
                  Règles de vote
                </CardTitle>
                <CardDescription>Comment fonctionne le système de vote</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-bold text-green-700 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Autorisé
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Voter autant de fois que souhaité</li>
                      <li>• Voter pour plusieurs joueurs</li>
                      <li>• Voter dans plusieurs compétitions</li>
                      <li>• Partager les profils des joueurs</li>
                      <li>• Suivre les classements en temps réel</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-bold text-red-700 flex items-center">
                      <XCircle className="w-5 h-5 mr-2" />
                      Interdit
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Utiliser de fausses informations</li>
                      <li>• Tenter de frauder le système</li>
                      <li>• Harceler d'autres utilisateurs</li>
                      <li>• Manipuler les résultats</li>
                      <li>• Créer de faux comptes</li>
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
            transition={{ delay: 0.2 }}
          >
            <Card className="rounded-2xl shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <CreditCard className="w-6 h-6 mr-3 text-emerald-600" />
                  Paiements et tarification
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                  <h4 className="font-bold text-emerald-800 mb-3">Prix du vote</h4>
                  <div className="text-3xl font-bold text-emerald-600 mb-2">200 FCFA</div>
                  <p className="text-emerald-700 text-sm">
                    Prix fixe par vote, quel que soit le joueur ou la compétition
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3">Méthodes de paiement</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Wave Business (recommandé)</li>
                      <li>• Paiement mobile sécurisé</li>
                      <li>• Confirmation automatique</li>
                      <li>• Support 24/7</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3">Politique de remboursement</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Remboursement en cas d'erreur technique</li>
                      <li>• Délai de traitement : 3-5 jours ouvrés</li>
                      <li>• Contact support requis</li>
                      <li>• Preuve de paiement nécessaire</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Compétitions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="rounded-2xl shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Trophy className="w-6 h-6 mr-3 text-purple-600" />
                  Règles des compétitions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Éligibilité des joueurs</h4>
                    <p className="text-gray-600 text-sm">
                      Tous les joueurs inscrits dans une compétition active peuvent recevoir des votes. 
                      Les critères d'éligibilité sont définis par les organisateurs de chaque compétition.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Durée des compétitions</h4>
                    <p className="text-gray-600 text-sm">
                      Chaque compétition a une date de début et de fin clairement définies. 
                      Les votes ne sont acceptés que pendant la période active de la compétition.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Classement</h4>
                    <p className="text-gray-600 text-sm">
                      Le classement est basé uniquement sur le nombre de votes confirmés (payés). 
                      Il est mis à jour en temps réel et visible par tous.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Avertissements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="rounded-2xl shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <AlertTriangle className="w-6 h-6 mr-3 text-orange-600" />
                  Avertissements importants
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                    <h4 className="font-bold text-orange-800 mb-2">Responsabilité</h4>
                    <p className="text-orange-700 text-sm">
                      VoteSport est une plateforme de vote et ne garantit aucun résultat sportif. 
                      Les votes expriment uniquement le soutien des fans.
                    </p>
                  </div>

                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <h4 className="font-bold text-red-800 mb-2">Fraude</h4>
                    <p className="text-red-700 text-sm">
                      Toute tentative de fraude ou de manipulation sera sanctionnée par 
                      l'exclusion définitive de la plateforme et pourra faire l'objet de poursuites.
                    </p>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <h4 className="font-bold text-blue-800 mb-2">Données personnelles</h4>
                    <p className="text-blue-700 text-sm">
                      Vos données sont protégées conformément à la réglementation en vigueur. 
                      Consultez notre politique de confidentialité pour plus d'informations.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}