import { useState, useCallback } from 'react';
import type { GameState, Player, Board } from '../types/game';

const ROWS = 6;
const COLS = 7;

const createEmptyBoard = (): Board => 
  Array(ROWS).fill(null).map(() => Array(COLS).fill(null));

const checkWin = (board: Board, row: number, col: number, player: Player): [number, number][] | null => {
  const directions = [
    [0, 1],   // horizontal
    [1, 0],   // vertical
    [1, 1],   // diagonal right
    [1, -1],  // diagonal left
  ];

  for (const [dx, dy] of directions) {
    const cells: [number, number][] = [];
    
    for (let i = -3; i <= 3; i++) {
      const newRow = row + i * dx;
      const newCol = col + i * dy;
      
      if (
        newRow >= 0 && newRow < ROWS &&
        newCol >= 0 && newCol < COLS &&
        board[newRow][newCol] === player
      ) {
        cells.push([newRow, newCol]);
      } else {
        cells.length = 0;
      }
      
      if (cells.length === 4) return cells;
    }
  }
  
  return null;
};

const checkDraw = (board: Board): boolean => 
  board[0].every(cell => cell !== null);

export const useConnectFour = () => {
  const [gameState, setGameState] = useState<GameState>({
    board: createEmptyBoard(),
    currentPlayer: 1,
    winner: null,
    winningCells: null,
    isDraw: false,
    scores: {
      player1: 0,
      player2: 0
    }
  });

  const dropToken = useCallback((col: number) => {
    if (gameState.winner || gameState.isDraw) return;

    setGameState(prev => {
      const newBoard = prev.board.map(row => [...row]);
      
      // Find the lowest empty row in the selected column
      let row = ROWS - 1;
      while (row >= 0 && newBoard[row][col] !== null) {
        row--;
      }
      
      if (row < 0) return prev; // Column is full
      
      newBoard[row][col] = prev.currentPlayer;
      
      const winningCells = checkWin(newBoard, row, col, prev.currentPlayer);
      const isDraw = !winningCells && checkDraw(newBoard);
      
      // Update scores if there's a winner
      const newScores = { ...prev.scores };
      if (winningCells) {
        if (prev.currentPlayer === 1) {
          newScores.player1 += 1;
        } else {
          newScores.player2 += 1;
        }
      }
      
      return {
        board: newBoard,
        currentPlayer: prev.currentPlayer === 1 ? 2 : 1,
        winner: winningCells ? prev.currentPlayer : null,
        winningCells,
        isDraw,
        scores: newScores
      };
    });
  }, [gameState.winner, gameState.isDraw]);

  const resetGame = useCallback(() => {
    setGameState({
      board: createEmptyBoard(),
      currentPlayer: 1,
      winner: null,
      winningCells: null,
      isDraw: false,
      scores: gameState.scores
    });
  }, []);

  return {
    gameState,
    dropToken,
    resetGame,
  };
};