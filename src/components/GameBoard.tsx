import React from 'react';
import { motion } from 'framer-motion';
import { Token } from './Token';
import type { GameState } from '../types/game';

interface GameBoardProps {
  gameState: GameState;
  onColumnClick: (col: number) => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({ gameState, onColumnClick }) => {
  const { board, winningCells } = gameState;

  const isWinningCell = (row: number, col: number) => 
    winningCells?.some(([r, c]) => r === row && c === col);

  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-2xl shadow-2xl border border-blue-500/20">
      <div className="grid grid-cols-7 gap-3 bg-blue-800/50 p-4 rounded-xl backdrop-blur-sm">
        {board.map((row, rowIndex) => (
          row.map((cell, colIndex) => (
            <motion.div
              key={`${rowIndex}-${colIndex}`}
              className="aspect-square bg-blue-900/80 rounded-full flex items-center justify-center p-1.5 cursor-pointer relative group"
              whileHover={{ scale: cell ? 1 : 1.05, y: cell ? 0 : -5 }}
              onClick={() => onColumnClick(colIndex)}
            >
              {!cell && (
                <motion.div
                  className="absolute inset-0 bg-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  layoutId={`hover-${colIndex}`}
                />
              )}
              {cell && (
                <Token
                  player={cell}
                  row={rowIndex}
                  isWinning={isWinningCell(rowIndex, colIndex)}
                  animate={true}
                />
              )}
            </motion.div>
          ))
        ))}
      </div>
    </div>
  );
};