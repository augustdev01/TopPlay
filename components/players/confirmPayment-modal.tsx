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
import { CreditCard, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

interface ConfirmPaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orderData: {
    orderId: string;
    state: string;
    customerPhone: string;
  } | null;
  onSuccess?: () => void; // callback après confirmation
}

export function ConfirmPaymentModal({
  open,
  onOpenChange,
  orderData,
  onSuccess,
}: ConfirmPaymentModalProps) {
  const [transactionCode, setTransactionCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (!transactionCode.trim())
      return alert("Veuillez saisir le code de transaction");
    if (!orderData) return alert("Aucune commande en cours");

    setLoading(true);
    try {
      const res = await fetch("/api/payments/confirm-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: orderData.orderId,
          state: orderData.state,
          transactionCode: transactionCode.trim(),
          customerPhone: orderData.customerPhone,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Vote confirmé !");
        onOpenChange(false);
        onSuccess?.();
      } else {
        alert(data.error || "Erreur lors de la confirmation du paiement");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur serveur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className=" w-full max-w-[98vw] sm:max-w-md rounded-2xl">
        {" "}
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            Confirmer le paiement
          </DialogTitle>
          <DialogDescription className="text-center">
            Entrez le code Wave reçu après le paiement
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4 !w-30">
          {/* Info Paiement */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 text-center">
            <CreditCard className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
            <div className="text-sm text-gray-600">
              Code transaction Wave pour valider votre vote
            </div>
          </div>

          {/* Champ code transaction */}
          <div className="space-y-2">
            <Label>Code de transaction</Label>
            <Input
              placeholder="ABCDEFGH1234"
              value={transactionCode}
              onChange={(e) => setTransactionCode(e.target.value)}
              className="rounded-xl"
            />
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
              onClick={handleConfirm}
              disabled={loading || !transactionCode.trim()}
              className="flex-1 bg-green-600 hover:bg-green-700 rounded-xl shadow-lg hover:shadow-xl flex items-center justify-center"
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                />
              ) : (
                <CheckCircle className="w-4 h-4 mr-2" />
              )}
              {loading ? "Confirmation..." : "Confirmer"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
