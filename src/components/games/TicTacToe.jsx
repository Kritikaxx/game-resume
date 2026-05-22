import { useState } from 'react';
import { useGameStore } from '../../store/useGameStore';

const WIN_LINES = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

function checkWinner(board) {
  for (const [a,b,c] of WIN_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
  }
  return board.every(Boolean) ? 'draw' : null;
}

function aiMove(board) {
  // Try to win
  for (const [a,b,c] of WIN_LINES) {
    if (board[a]==='O' && board[b]==='O' && !board[c]) return c;
    if (board[a]==='O' && board[c]==='O' && !board[b]) return b;
    if (board[b]==='O' && board[c]==='O' && !board[a]) return a;
  }
  // Block player
  for (const [a,b,c] of WIN_LINES) {
    if (board[a]==='X' && board[b]==='X' && !board[c]) return c;
    if (board[a]==='X' && board[c]==='X' && !board[b]) return b;
    if (board[b]==='X' && board[c]==='X' && !board[a]) return a;
  }
  // Center or random
  if (!board[4]) return 4;
  const empty = board.map((v,i) => v ? null : i).filter(v => v !== null);
  return empty[Math.floor(Math.random() * empty.length)];
}

export default function TicTacToe() {
  const { clearZone, currentZone } = useGameStore();
  const [board,   setBoard]   = useState(Array(9).fill(null));
  const [result,  setResult]  = useState(null);
  const [wins,    setWins]    = useState(0);
  const [round,   setRound]   = useState(1);
  const ROUNDS = 3;

  const click = (i) => {
    if (board[i] || result) return;
    const next = board.map((v,idx) => idx===i ? 'X' : v);
    const w = checkWinner(next);
    if (w) return resolve(next, w);
    // AI
    const ai = aiMove(next);
    if (ai === undefined) return resolve(next, 'draw');
    const after = next.map((v,idx) => idx===ai ? 'O' : v);
    const w2 = checkWinner(after);
    setBoard(after);
    if (w2) resolve(after, w2);
  };

  const resolve = (b, w) => {
    setBoard(b);
    setResult(w);
    if (w === 'X') setWins(p => p + 1);
  };

  const nextRound = () => {
    if (round >= ROUNDS) return finish();
    setBoard(Array(9).fill(null));
    setResult(null);
    setRound(r => r + 1);
  };

  const finish = () => {
    const pts = wins >= 2 ? 300 : wins === 1 ? 150 : 50;
    clearZone(currentZone, pts);
  };

  const symbols = { X:'🚀', O:'👾', null:'' };

  return (
    <div className="bg-gray-900 border border-purple-500 rounded-2xl p-6 text-white">
      <div className="flex justify-between items-center mb-2">
        <span className="text-purple-400 font-bold text-sm uppercase tracking-widest">🚀 Tic Tac Toe</span>
        <span className="text-gray-400 text-sm">Round {round}/{ROUNDS} · Wins: {wins}</span>
      </div>
      <p className="text-gray-400 text-xs mb-4 text-center">You are 🚀 · Beat the AI 👾</p>

      <div className="grid grid-cols-3 gap-2 mb-4">
        {board.map((v,i) => (
          <button key={i} onClick={() => click(i)}
            className={`h-20 text-3xl rounded-xl border-2 transition-all ${
              v ? 'bg-gray-700 border-gray-500 cursor-default'
                : 'bg-gray-800 border-gray-600 hover:border-purple-400 hover:bg-gray-700'
            }`}>
            {symbols[v]}
          </button>
        ))}
      </div>

      {result && (
        <div className="text-center">
          <p className="text-xl font-bold mb-3">
            {result==='X' ? '🎉 You Win!' : result==='draw' ? '🤝 Draw!' : '😅 AI Wins!'}
          </p>
          {round < ROUNDS
            ? <button onClick={nextRound} className="px-6 py-2 bg-purple-600 hover:bg-purple-500 rounded-full font-bold">
                Next Round →
              </button>
            : <button onClick={finish} className="px-6 py-2 bg-green-600 hover:bg-green-500 rounded-full font-bold">
                ✅ Finish ({wins >= 2 ? '+300' : wins===1 ? '+150' : '+50'} pts) →
              </button>
          }
        </div>
      )}
    </div>
  );
}