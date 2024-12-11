import React from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { Token } from './Token';
import type { GameState } from '../types/game';

interface ScoreBoardProps {
  scores: GameState['scores'];
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({ scores }) => {
  return (
    <div className="flex gap-12 items-center justify-center bg-gray-800/30 px-8 py-4 rounded-xl backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-3"
      >
        <Token player={1} row={0} isPreview={true} animate={false} />
        <div className="flex items-center gap-3">
          <Trophy size={20} className="text-red-400" />
          <span className="text-2xl font-bold text-red-400">{scores.player1}</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-3"
      >
        <Token player={2} row={0} isPreview={true} animate={false} />
        <div className="flex items-center gap-3">
          <Trophy size={20} className="text-yellow-400" />
          <span className="text-2xl font-bold text-yellow-400">{scores.player2}</span>
        </div>
      </motion.div>
    </div>
  );
};