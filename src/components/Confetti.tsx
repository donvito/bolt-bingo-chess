import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import type { Player } from '../types/game';

interface ConfettiProps {
  winner: Player;
}

export const Confetti: React.FC<ConfettiProps> = ({ winner }) => {
  useEffect(() => {
    const colors = winner === 1 ? ['#ef4444', '#dc2626'] : ['#fbbf24', '#f59e0b'];
    
    // Fire confetti from the left
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.2, y: 0.7 },
      colors,
    });

    // Fire confetti from the right
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.8, y: 0.7 },
      colors,
    });

    // Fire confetti from the center
    setTimeout(() => {
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { x: 0.5, y: 0.6 },
        colors,
      });
    }, 250);
  }, [winner]);

  return null;
};