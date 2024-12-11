export type Player = 1 | 2;
export type Cell = Player | null;
export type Board = Cell[][];

export interface GameState {
  board: Board;
  currentPlayer: Player;
  winner: Player | null;
  winningCells: [number, number][] | null;
  isDraw: boolean;
  scores: {
    player1: number;
    player2: number;
  };
}