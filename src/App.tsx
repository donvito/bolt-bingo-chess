import React from 'react';
import { GameBoard } from './components/GameBoard';
import { GameStatus } from './components/GameStatus';
import { ScoreBoard } from './components/ScoreBoard';
import { useConnectFour } from './hooks/useConnectFour';

function App() {
  const { gameState, dropToken, resetGame } = useConnectFour();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center p-4">
      <div className="flex flex-col items-center max-w-3xl w-full mx-auto">
        <h1 className="text-5xl font-bold text-white mb-12 tracking-tight">
          Bingo <span className="text-yellow-400">Chess</span>
        </h1>
        <div className="w-full space-y-8">
          <ScoreBoard scores={gameState.scores} />
          <GameStatus gameState={gameState} onReset={resetGame} />
          <GameBoard gameState={gameState} onColumnClick={dropToken} />
          <div className="text-center text-gray-400 text-sm">
            Connect four tokens in a row to win!
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
