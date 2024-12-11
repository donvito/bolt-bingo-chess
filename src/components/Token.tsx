import React from 'react';
import { motion } from 'framer-motion';
import type { Player } from '../types/game';

interface TokenProps {
  player: Player;
  isWinning?: boolean;
  isPreview?: boolean;
  animate?: boolean;
  row: number;
}

export const Token: React.FC<TokenProps> = ({ player, isWinning, isPreview, animate, row }) => {
  const variants = {
    initial: { y: -400 },
    animate: { y: 0 },
  };

  return (
    <motion.div
      className={`${isPreview ? 'w-20 h-20' : 'w-full h-full'} rounded-full border-4 ${
        isWinning ? (player === 1
          ? 'bg-red-500 border-red-500 shadow-lg shadow-red-500/50'
          : 'bg-yellow-500 border-yellow-500 shadow-lg shadow-yellow-500/50'
        ) : player === 1
          ? 'bg-gradient-to-br from-red-400 to-red-600 border-red-400 shadow-lg shadow-red-500/30'
          : 'bg-gradient-to-br from-yellow-300 to-yellow-500 border-yellow-300 shadow-lg shadow-yellow-400/30'
      } ${isWinning ? 'z-10' : ''} transition-shadow`}
      initial={animate ? 'initial' : false}
      animate={animate ? 'animate' : false}
      whileHover={isPreview ? { scale: 1.1, rotate: 5 } : undefined}
      variants={variants}
      transition={animate ? {
        type: 'spring',
        duration: 0.5,
        bounce: 0.25,
      } : undefined}
    />
  );
};