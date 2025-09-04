'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, Clock, AlertCircle, ArrowLeft, Trophy, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';

interface OrderInfo {
  orderId: string;
  player: {
    firstName: string;
    lastName: string;
  };
  competition: {
    name: string;
    slug: string;
  };
  amount: number;
  status: string;
}

export default function PaymentConfirmationPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [confirming, setConfirming] = useState(false);
  const [transactionCode, setTransactionCode] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [notes, setNotes] = useState('');

  const orderId = searchParams.get('orderId');
  const state = searchParams.get('state');

  useEffect(() => {
    if (!orderId || !state) {
      router.push('/');
      return;
    }

    fetchOrderInfo();
  }, [orderId, state]);

  const fetchOrderInfo = async () => {
    try {
      const response = await fetch('/api/payments/order-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, state })
      });

      if (response.ok) {
        const data = await response.json();
        setOrderInfo(data);
      } else {
        router.push('/');
      }
    } catch (error) {
      console.error('Erreur récupération order:', error);
      router.push('/');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmPayment = async () => {
    if (!transactionCode.trim()) {
      alert('Veuillez saisir le code de transaction Wave');
      return;
    }

    setConfirming(true);

    try {
      const response = await fetch('/api/payments/confirm-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          state,
          transactionCode: transactionCode.trim(),
          customerPhone: customerPhone.trim(),
          notes: notes.trim()
        })
      });

      if (response.ok) {
        const data = await response.json();
        
        if (data.success) {
          // Rediriger vers la page de succès
          router.push(`/paiement/succes?orderId=${orderId}&competitionSlug=${orderInfo?.competition.slug}`);
        } else {
          alert(data.message || 'Erreur lors de la confirmation');
        }
      } else {
        alert('Erreur lors de la confirmation du paiement');
      }
    } catch (error) {
      console.error('Erreur confirmation:', error);
      alert('Erreur lors de la confirmation');
    } finally {
      setConfirming(false);
    }
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
            <p className="text-gray-600">Chargement...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!orderInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <CardTitle className="text-red-600">Commande introuvable</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={() => router.push('/')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour à l'accueil
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        <Card className="shadow-xl rounded-2xl">
          <CardHeader className="text-center">
            <Clock className="w-16 h-16 text-orange-500 mx-auto mb-4" />
            <CardTitle className="text-orange-600">Confirmation de paiement</CardTitle>
            <CardDescription>
              Confirmez votre paiement Wave pour valider votre vote
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Order Info */}
            <div className="bg-gray-50 rounded-xl p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Joueur :</span>
                <span className="font-medium">
                  {orderInfo.player.firstName} {orderInfo.player.lastName}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Compétition :</span>
                <span className="font-medium">{orderInfo.competition.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Montant :</span>
                <span className="font-bold text-green-600">{orderInfo.amount} FCFA</span>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <h4 className="font-medium text-blue-900 mb-2 flex items-center">
                <Smartphone className="w-4 h-4 mr-2" />
                Avez-vous effectué le paiement dans Wave ?
              </h4>
              <p className="text-sm text-blue-700 mb-3">
                Si vous avez confirmé le paiement dans l'app Wave, saisissez le code de transaction ci-dessous pour valider votre vote.
              </p>
            </div>

            {/* Transaction Code */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="transactionCode">
                  Code de transaction Wave <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="transactionCode"
                  value={transactionCode}
                  onChange={(e) => setTransactionCode(e.target.value.toUpperCase())}
                  placeholder="Ex: TXN123456789"
                  className="rounded-xl mt-1"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Code reçu par SMS ou visible dans votre historique Wave
                </p>
              </div>

              <div>
                <Label htmlFor="customerPhone">
                  Numéro de téléphone (optionnel)
                </Label>
                <Input
                  id="customerPhone"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="77 123 45 67"
                  className="rounded-xl mt-1"
                />
              </div>

              <div>
                <Label htmlFor="notes">
                  Notes (optionnel)
                </Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Informations supplémentaires..."
                  className="rounded-xl mt-1"
                  rows={3}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-3 pt-4">
              <Button
                variant="outline"
                onClick={() => router.push(`/competitions/${orderInfo.competition.slug}/vote`)}
                className="flex-1 rounded-xl"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour
              </Button>
              
              <Button
                onClick={handleConfirmPayment}
                disabled={confirming || !transactionCode.trim()}
                className="flex-1 bg-orange-600 hover:bg-orange-700 rounded-xl"
              >
                {confirming ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                  />
                ) : (
                  <CheckCircle className="w-4 h-4 mr-2" />
                )}
                {confirming ? 'Confirmation...' : 'Confirmer le paiement'}
              </Button>
            </div>

            <div className="text-xs text-gray-500 text-center">
              Votre vote sera validé après vérification du paiement par notre équipe
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}