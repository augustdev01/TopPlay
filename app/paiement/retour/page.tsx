'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, Clock, ArrowLeft, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

interface PaymentResult {
  orderId: string;
  status: 'pending' | 'paid' | 'failed';
  player?: any;
  competition?: any;
  amount?: number;
  transactionRef?: string;
  autoConfirmed?: boolean;
  message?: string;
}

export default function PaymentReturnPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [result, setResult] = useState<PaymentResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);

  const state = searchParams.get('state');
  const status = searchParams.get('status'); // Peut être fourni par Wave

  useEffect(() => {
    if (!state) {
      setError('Session invalide');
      setLoading(false);
      return;
    }

    verifyPaymentStatus();
  }, [state]);

  const verifyPaymentStatus = async () => {
    if (!state) return;

    setChecking(true);
    try {
      const response = await fetch('/api/payments/verify-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ state })
      });

      if (!response.ok) {
        throw new Error('Erreur de vérification');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError('Impossible de vérifier le paiement');
    } finally {
      setLoading(false);
      setChecking(false);
    }
  };

  const handleRecheck = () => {
    verifyPaymentStatus();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4"
            />
            <p className="text-gray-600">Vérification du paiement...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <CardTitle className="text-red-600">Erreur</CardTitle>
            <CardDescription>{error || 'Impossible de vérifier le paiement'}</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button 
              onClick={() => router.push('/')}
              className="bg-red-500 hover:bg-red-600"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour à l'accueil
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'paid':
        return {
          icon: CheckCircle,
          color: 'text-green-500',
          bgColor: 'from-green-50 to-emerald-100',
          title: 'Paiement confirmé !',
          description: result.autoConfirmed 
            ? 'Votre vote a été automatiquement confirmé.' 
            : 'Votre vote a été enregistré avec succès.',
          buttonColor: 'bg-green-500 hover:bg-green-600'
        };
      case 'pending':
        return {
          icon: Clock,
          color: 'text-orange-500',
          bgColor: 'from-orange-50 to-yellow-100',
          title: 'Paiement en cours',
          description: 'Votre paiement est en cours de traitement. Nous vérifions automatiquement le statut.',
          buttonColor: 'bg-orange-500 hover:bg-orange-600'
        };
      case 'failed':
      default:
        return {
          icon: XCircle,
          color: 'text-red-500',
          bgColor: 'from-red-50 to-pink-100',
          title: 'Paiement échoué',
          description: 'Le paiement n\'a pas pu être traité. Vous pouvez réessayer.',
          buttonColor: 'bg-red-500 hover:bg-red-600'
        };
    }
  };

  const config = getStatusConfig(result.status);
  const StatusIcon = config.icon;

  return (
    <div className={`min-h-screen bg-gradient-to-br ${config.bgColor} flex items-center justify-center p-4`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="text-center">
            <StatusIcon className={`w-16 h-16 ${config.color} mx-auto mb-4`} />
            <CardTitle className={config.color}>{config.title}</CardTitle>
            <CardDescription>{config.description}</CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Informations du vote */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Joueur :</span>
                <span className="font-medium">
                  {result.player?.firstName} {result.player?.lastName}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Compétition :</span>
                <span className="font-medium">{result.competition?.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Montant :</span>
                <span className="font-bold text-green-600">{result.amount} FCFA</span>
              </div>
              {result.transactionRef && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Référence :</span>
                  <span className="font-mono text-xs">{result.transactionRef}</span>
                </div>
              )}
            </div>

            {/* Messages spéciaux */}
            {result.message && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-blue-700 text-sm">{result.message}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col space-y-3">
              {result.status === 'pending' && (
                <Button 
                  onClick={handleRecheck}
                  disabled={checking}
                  variant="outline"
                  className="w-full"
                >
                  {checking ? 'Vérification...' : 'Revérifier le paiement'}
                </Button>
              )}
              
              <Button 
                onClick={() => router.push(`/competitions/${result.competition?.slug}/classement`)}
                className={`w-full ${config.buttonColor}`}
              >
                <Trophy className="w-4 h-4 mr-2" />
                Voir le classement
              </Button>
              
              <Button 
                variant="ghost"
                onClick={() => router.push(`/competitions/${result.competition?.slug}/vote`)}
                className="w-full"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour aux joueurs
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}