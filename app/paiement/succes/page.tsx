'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Trophy, ArrowLeft, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [confetti, setConfetti] = useState(true);

  const orderId = searchParams.get('orderId');
  const competitionSlug = searchParams.get('competitionSlug');

  useEffect(() => {
    // Arrêter les confettis après 3 secondes
    const timer = setTimeout(() => setConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'VoteSport - J\'ai voté !',
        text: 'Je viens de voter pour mon joueur favori sur VoteSport !',
        url: window.location.origin
      });
    } else {
      navigator.clipboard.writeText(window.location.origin);
      alert('Lien copié dans le presse-papiers !');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      {confetti && (
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: -10,
                rotate: 0,
              }}
              animate={{
                y: window.innerHeight + 10,
                rotate: 360,
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                ease: "linear",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="w-full max-w-md"
      >
        <Card className="shadow-xl rounded-2xl border-0">
          <CardHeader className="text-center pb-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
            </motion.div>
            <CardTitle className="text-2xl text-green-600">
              Vote confirmé !
            </CardTitle>
            <CardDescription>
              Votre paiement a été reçu et votre vote sera validé sous peu
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Success Message */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
              <h3 className="font-semibold text-green-800 mb-2">
                🎉 Merci pour votre soutien !
              </h3>
              <p className="text-sm text-green-700">
                Votre vote sera comptabilisé dès que notre équipe aura vérifié le paiement. 
                Cela prend généralement quelques minutes.
              </p>
            </div>

            {/* Order Info */}
            {orderId && (
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="text-sm text-gray-600 mb-1">Numéro de commande :</div>
                <div className="font-mono text-xs bg-white px-2 py-1 rounded border">
                  {orderId}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="space-y-3">
              {competitionSlug && (
                <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700 rounded-xl">
                  <Link href={`/competitions/${competitionSlug}/classement`}>
                    <Trophy className="w-4 h-4 mr-2" />
                    Voir le classement
                  </Link>
                </Button>
              )}
              
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={handleShare}
                  className="rounded-xl"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Partager
                </Button>
                
                {competitionSlug ? (
                  <Button asChild variant="outline" className="rounded-xl">
                    <Link href={`/competitions/${competitionSlug}/vote`}>
                      Voter encore
                    </Link>
                  </Button>
                ) : (
                  <Button asChild variant="outline" className="rounded-xl">
                    <Link href="/competitions">
                      Autres votes
                    </Link>
                  </Button>
                )}
              </div>
              
              <Button
                variant="ghost"
                onClick={() => router.push('/')}
                className="w-full rounded-xl"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour à l'accueil
              </Button>
            </div>

            <div className="text-xs text-gray-500 text-center">
              Vous recevrez une notification dès que votre vote sera validé
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}