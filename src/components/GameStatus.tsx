import React from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Sparkles } from 'lucide-react';
import { Token } from './Token';
import { Confetti } from './Confetti';
import type { GameState } from '../types/game';

interface GameStatusProps {
  gameState: GameState;
  onReset: () => void;
}

export const GameStatus: React.FC<GameStatusProps> = ({ gameState, onReset }) => {
  const { winner, isDraw, currentPlayer } = gameState;

  return (
    <div className="flex items-center justify-between w-full relative bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm border border-gray-700/50">
      {winner && <Confetti winner={winner} />}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold flex items-center gap-4"
      >
        {!winner && !isDraw && (
          <div className="w-20 h-20">
            <Token
              player={currentPlayer}
              row={0}
              isPreview={true}
              animate={false}
            />
          </div>
        )}
        {winner ? (
          <span className={winner === 1 ? 'text-red-500' : 'text-yellow-400'}>
            Player {winner} Wins!
          </span>
        ) : isDraw ? (
          <span className="text-gray-700">Draw!</span>
        ) : (
          <span className={currentPlayer === 1 ? 'text-red-500' : 'text-yellow-400'}>
            Player {currentPlayer}'s Turn
          </span>
        )}
      </motion.div>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg flex items-center gap-3 font-medium overflow-hidden group"
        onClick={onReset}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity"
          initial={false}
          whileHover={{ scale: 1.5, rotate: 15 }}
        />
        <Sparkles className="w-5 h-5 relative" />
        <RotateCcw className="w-5 h-5 relative" />
        Reset
      </motion.button>
    </div>
  );
};