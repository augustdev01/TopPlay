"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Vote, CreditCard, Smartphone, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

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
  // Au lieu de juste onSuccess, on peut renvoyer l'ordre créé
  onSuccess?: (orderData: {
    orderId: string;
    state: string;
    customerPhone: string;
  }) => void;
}

export function VoteModal({
  open,
  onOpenChange,
  player,
  competition,
  onSuccess,
}: VoteModalProps) {
  const [customerPhone, setCustomerPhone] = useState("");
  const [loading, setLoading] = useState(false);

  // Stocker orderId et state après création
  const [orderData, setOrderData] = useState<{
    orderId: string;
    state: string;
  } | null>(null);

  const handleVote = async () => {
    if (!customerPhone.trim()) {
      alert("Veuillez saisir votre numéro de téléphone");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/vote/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          competitionSlug: competition.slug,
          playerSlug: player.slug,
          customerPhone: customerPhone.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur création commande");
      }

      const data = await response.json();

      // Ouvrir le lien Wave dans un nouvel onglet/app
      setOrderData({ orderId: data.orderId, state: data.state });
      localStorage.setItem("currentOrder", JSON.stringify(data));

      // Fermer le modal avant d’ouvrir Wave
      onOpenChange(false);

      onSuccess?.(data);
      window.open(data.wavePaymentUrl, "_blank");
    } catch (error) {
      console.error("Erreur vote:", error);
      alert("Erreur lors de la création du vote");
    } finally {
      setLoading(false);
    }
  };

  const formatPhoneNumber = (value: string) => {
    // Nettoyer et formater le numéro ivoirien
    const cleaned = value.replace(/\D/g, ""); // garder que les chiffres

    // Si le numéro commence déjà par 225 et fait 12 chiffres → ok
    if (cleaned.startsWith("225") && cleaned.length === 12) {
      return cleaned;
    }

    // Si le numéro est donné en format local (10 chiffres) → ajouter 225 devant
    if (cleaned.length === 10) {
      return "225" + cleaned;
    }

    // Sinon on retourne tel quel
    return cleaned;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setCustomerPhone(formatted);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className=" w-full max-w-[98vw]  sm:max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            Voter pour {player.firstName} {player.lastName}
          </DialogTitle>
          <DialogDescription className="text-center">
            {competition.name}
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
              <div className="font-semibold">
                {player.firstName} {player.lastName}
              </div>
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

          {/* Phone Input */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium">
              Numéro de téléphone Wave <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Smartphone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <Input
                id="phone"
                type="tel"
                placeholder="77 123 45 67"
                value={customerPhone}
                onChange={handlePhoneChange}
                className="pl-10 rounded-xl"
                required
              />
            </div>
            <p className="text-xs text-gray-500">
              Ce numéro sera pré-rempli dans l'app Wave pour faciliter le
              paiement
            </p>
          </div>

          {/* Process Explanation */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h4 className="font-medium text-blue-900 mb-2">
              Comment ça marche :
            </h4>
            <ol className="text-sm text-blue-700 space-y-1">
              <li>1. Cliquez sur "Payer avec Wave"</li>
              <li>2. L'app Wave s'ouvre avec le montant pré-rempli</li>
              <li>3. Confirmez le paiement dans Wave</li>
              <li>4. Revenez ici pour confirmer votre vote</li>
            </ol>
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
              disabled={loading || !customerPhone.trim()}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                />
              ) : (
                <ExternalLink className="w-4 h-4 mr-2" />
              )}
              {loading ? "Préparation..." : "Payer avec Wave"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
