'use client';

import { PlayerCard } from './player-card';
import { motion } from 'framer-motion';

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
}

interface Competition {
  _id: string;
  slug: string;
  name: string;
  votePrice: number;
}

interface PlayersGridProps {
  players: Player[];
  competition: Competition;
  onVoteSuccess?: () => void;
}

export function PlayersGrid({ players, competition, onVoteSuccess }: PlayersGridProps) {
  if (players.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-gray-400 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 0a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
          Aucun joueur trouvé
        </h3>
        <p className="text-gray-500">
          Aucun joueur ne correspond à vos critères de recherche
        </p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {players.map((player, index) => (
        <motion.div
          key={player._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.05 }}
        >
          <PlayerCard 
            player={player}
            competition={competition}
            onVoteSuccess={onVoteSuccess}
          />
        </motion.div>
      ))}
    </div>
  );
}