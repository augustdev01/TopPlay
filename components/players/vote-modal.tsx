'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Vote, CreditCard, Smartphone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface Player {
  _id: string;
  slug: string;
  firstName: string;
  lastName: string;
  photoUrl?: string;
}

interface Competition {
  _id: string;
  slug: string;
  name: string;
  votePrice: number;
}

interface VoteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  player: Player;
  competition: Competition;
  onSuccess?: () => void;
}

export function VoteModal({ open, onOpenChange, player, competition, onSuccess }: VoteModalProps) {
  const router = useRouter();
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVote = async () => {
    setLoading(true);
    
    try {
      const response = await fetch('/api/vote/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          competitionSlug: competition.slug,
          playerSlug: player.slug,
          customerPhone: customerPhone || undefined,
          customerEmail: customerEmail || undefined
        })
      });

      if (!response.ok) {
        throw new Error('Erreur création commande');
      }

      const data = await response.json();
      
      // Rediriger vers Wave Business
      window.location.href = data.checkoutUrl;
      
    } catch (error) {
      console.error('Erreur vote:', error);
      alert('Erreur lors de la création du vote');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            Voter pour {player.firstName} {player.lastName}
          </DialogTitle>
          <DialogDescription className="text-center">
            Compétition : {competition.name}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Player Preview */}
          <div className="flex items-center space-x-4 bg-gray-50 rounded-xl p-4">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center overflow-hidden">
              {player.photoUrl ? (
                <img
                  src={player.photoUrl}
                  alt={`${player.firstName} ${player.lastName}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Vote className="w-8 h-8 text-indigo-600" />
              )}
            </div>
            <div className="flex-1">
              <div className="font-semibold">{player.firstName} {player.lastName}</div>
              <div className="text-sm text-gray-600">{competition.name}</div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 text-center">
            <CreditCard className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-indigo-600 mb-1">
              {competition.votePrice} FCFA
            </div>
            <div className="text-sm text-gray-600">
              Paiement via Wave Business
            </div>
          </div>

          {/* Contact Info (Optional) */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="phone" className="text-sm font-medium">
                Numéro de téléphone (optionnel)
              </Label>
              <div className="relative mt-1">
                <Smartphone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="77 123 45 67"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="pl-10 rounded-xl"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email" className="text-sm font-medium">
                Email (optionnel)
              </Label>
              <div className="relative mt-1">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="pl-10 rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 rounded-xl"
              disabled={loading}
            >
              Annuler
            </Button>
            <Button
              onClick={handleVote}
              disabled={loading}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                />
              ) : (
                <CreditCard className="w-4 h-4 mr-2" />
              )}
              {loading ? 'Redirection...' : 'Payer avec Wave'}
            </Button>
          </div>
          
          <div className="text-xs text-gray-500 text-center">
            Vous serez redirigé vers Wave Business pour finaliser le paiement
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}