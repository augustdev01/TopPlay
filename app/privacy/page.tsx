'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Lock, Eye, Database, UserCheck, AlertCircle } from 'lucide-react';

export default function PrivacyPage() {
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
            Politique de 
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {" "}confidentialité
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Votre vie privée est importante pour nous. Découvrez comment nous protégeons vos données.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Collecte des données */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="rounded-2xl shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Database className="w-6 h-6 mr-3 text-indigo-600" />
                  Collecte des données
                </CardTitle>
                <CardDescription>Quelles informations nous collectons et pourquoi</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-bold text-gray-900 mb-3">Données collectées automatiquement</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Adresse IP et informations de navigation</li>
                    <li>• Type d'appareil et navigateur utilisé</li>
                    <li>• Pages visitées et temps passé sur le site</li>
                    <li>• Données de performance et d'utilisation</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-3">Données fournies volontairement</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Numéro de téléphone (optionnel lors du vote)</li>
                    <li>• Adresse email (optionnelle lors du vote)</li>
                    <li>• Informations de paiement (traitées par Wave Business)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Utilisation des données */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="rounded-2xl shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Eye className="w-6 h-6 mr-3 text-emerald-600" />
                  Utilisation des données
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3">Finalités principales</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Traitement des votes et paiements</li>
                      <li>• Mise à jour des classements</li>
                      <li>• Prévention de la fraude</li>
                      <li>• Support client</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3">Amélioration du service</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Analyse des performances du site</li>
                      <li>• Optimisation de l'expérience utilisateur</li>
                      <li>• Développement de nouvelles fonctionnalités</li>
                      <li>• Statistiques anonymisées</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Protection des données */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="rounded-2xl shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Lock className="w-6 h-6 mr-3 text-purple-600" />
                  Protection et sécurité
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <h4 className="font-bold text-green-800 mb-3 flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Mesures de sécurité
                  </h4>
                  <ul className="space-y-2 text-sm text-green-700">
                    <li>• Chiffrement SSL/TLS pour toutes les communications</li>
                    <li>• Stockage sécurisé des données sur des serveurs protégés</li>
                    <li>• Accès limité aux données par le personnel autorisé</li>
                    <li>• Surveillance continue contre les intrusions</li>
                    <li>• Sauvegardes régulières et plan de récupération</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-3">Partage des données</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    Nous ne vendons jamais vos données personnelles. Nous ne les partageons qu'avec :
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Wave Business (pour le traitement des paiements uniquement)</li>
                    <li>• Prestataires techniques (hébergement, analytics) sous contrat strict</li>
                    <li>• Autorités légales si requis par la loi</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Vos droits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="rounded-2xl shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <UserCheck className="w-6 h-6 mr-3 text-blue-600" />
                  Vos droits
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3">Droits d'accès</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Consulter vos données personnelles</li>
                      <li>• Demander une copie de vos données</li>
                      <li>• Connaître l'utilisation de vos données</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3">Droits de contrôle</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Rectifier des données incorrectes</li>
                      <li>• Supprimer vos données personnelles</li>
                      <li>• Limiter le traitement de vos données</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-6">
                  <h4 className="font-bold text-blue-800 mb-2 flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    Comment exercer vos droits
                  </h4>
                  <p className="text-blue-700 text-sm">
                    Pour exercer vos droits, contactez-nous à l'adresse privacy@votesport.sn 
                    avec une pièce d'identité. Nous répondrons dans un délai de 30 jours maximum.
                  </p>
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
                <Shield className="w-12 h-12 text-white mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Questions sur la confidentialité ?</h3>
                <p className="text-indigo-100 mb-6">
                  Notre équipe est disponible pour répondre à toutes vos questions concernant 
                  la protection de vos données personnelles.
                </p>
                <div className="space-y-2">
                  <div className="text-sm">📧 privacy@votesport.sn</div>
                  <div className="text-sm">📞 +221 77 123 45 67</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}