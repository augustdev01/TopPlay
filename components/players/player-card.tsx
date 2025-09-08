"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Vote, Eye, Trophy, Users } from "lucide-react";
import Link from "next/link";
import { VoteModal } from "./vote-modal";
import { motion } from "framer-motion";
import { ConfirmPaymentModal } from "./confirmPayment-modal";

interface Player {
  _id: string;
  slug: string;
  firstName: string;
  lastName: string;
  age: number;
  team?: string;
  position?: string;
  bio?: string;
  photoUrl?: string;
  votesConfirmed: number;
  percentage?: number; // Pourcentage au lieu du nombre brut
}

interface Competition {
  _id: string;
  slug: string;
  name: string;
  votePrice: number;
}

interface PlayerCardProps {
  player: Player;
  competition: Competition;
  onVoteSuccess?: () => void;
}

export function PlayerCard({
  player,
  competition,
  onVoteSuccess,
}: PlayerCardProps) {
  const [voteModalOpen, setVoteModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [orderData, setOrderData] = useState<{
    orderId: string;
    state: string;
    customerPhone: string;
  } | null>(null);

  // Lors de l'ouverture du modal de confirmation
  useEffect(() => {
    const savedOrder = localStorage.getItem("currentOrder");
    if (savedOrder) {
      setOrderData(JSON.parse(savedOrder));
      setConfirmModalOpen(true);
    }
  }, []);

  return (
    <>
      <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
        <Card className="rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-0 overflow-hidden bg-white">
          {/* Photo */}
          <div className="relative h-48 bg-gradient-to-br from-indigo-100 to-purple-100">
            {player.photoUrl ? (
              <img
                src={player.photoUrl}
                alt={`${player.firstName} ${player.lastName}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <Users className="w-16 h-16 text-indigo-300" />
              </div>
            )}

            {/* Badge pourcentage */}
            <div className="absolute top-4 right-4">
              <Badge className="bg-white/90 text-gray-900 hover:bg-white rounded-full px-3 py-1">
                <Trophy className="w-3 h-3 mr-1" />
                {player.percentage ? `${player.percentage}%` : "N/A"}
              </Badge>
            </div>
          </div>

          <CardHeader className="pb-4">
            <CardTitle className="text-lg">
              {player.firstName} {player.lastName}
            </CardTitle>
            <CardDescription className="flex items-center space-x-4 text-sm">
              <span>{player.age} ans</span>
              {player.team && <span>• {player.team}</span>}
              {player.position && <span>• {player.position}</span>}
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-0">
            {player.bio && (
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {player.bio}
              </p>
            )}

            <div className="flex space-x-2">
              <Button
                onClick={() => setVoteModalOpen(true)}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                <Vote className="w-4 h-4 mr-2" />
                Voter ({competition.votePrice} FCFA)
              </Button>

              <Button
                asChild
                variant="outline"
                size="icon"
                className="rounded-xl border-2 hover:bg-gray-50 hover:text-gray-900"
              >
                <Link
                  href={`/competitions/${competition.slug}/players/${player.slug}`}
                >
                  <Eye className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/*   <VoteModal
        open={voteModalOpen}
        onOpenChange={setVoteModalOpen}
        player={player}
        competition={competition}
        onSuccess={(data) => {
          setOrderData(data); // stocke orderId + state + customerPhone
          setVoteModalOpen(false); // ferme modal paiement
          setConfirmModalOpen(true); // ouvre modal confirmation
        }}
      /> */}

      {/* {orderData && ( */}
      <ConfirmPaymentModal
        open={true}
        onOpenChange={setConfirmModalOpen}
        orderData={orderData}
        onSuccess={() => {
          setOrderData(null);
          localStorage.removeItem("currentOrder");
          onVoteSuccess?.();
        }}
      />
      {/* )} */}
    </>
  );
}
