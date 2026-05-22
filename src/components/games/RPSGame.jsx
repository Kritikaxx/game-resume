import { useState, useCallback, useRef, useEffect } from 'react';
import { useGameStore } from '../../store/useGameStore';

const CHOICES = ['🪨', '📄', '✂️'];
const NAMES   = ['Rock', 'Paper', 'Scissors'];
const ROUNDS  = 5;

function getResult(player, ai) {
  if (player === ai) return 'draw';
  if ((player===0&&ai===2)||(player===1&&ai===0)||(player===2&&ai===1)) return 'win';
  return 'lose';
}

function getPoints(playerWins) {
  if (playerWins >= 3) return 300;
  if (playerWins >= 2) return 150;
  return 50;
}

// Stable random outside component — not called during render
const getRandom = () => Math.floor(Math.random() * 3);

export default function RPSGame() {
  const { clearZone, currentZone } = useGameStore();
  const [scores, setScores] = useState({ player: 0, ai: 0 });
  const [round,  setRound]  = useState(1);
  const [last,   setLast]   = useState(null);
  const scoresRef = useRef(scores);
  // Sync ref after render to avoid updating refs during render
  useEffect(() => {
    scoresRef.current = scores;
  }, [scores]);

  const play = useCallback((playerChoice) => {
    const aiChoice = getRandom();
    const result   = getResult(playerChoice, aiChoice);
    setLast({ player: playerChoice, ai: aiChoice, result });
    setScores(prev => ({
      player: prev.player + (result === 'win'  ? 1 : 0),
      ai:     prev.ai     + (result === 'lose' ? 1 : 0),
    }));
    setRound(r => r + 1);
  }, []);

  const finish = useCallback(() => {
    clearZone(currentZone, getPoints(scoresRef.current.player));
  }, [clearZone, currentZone]);

  if (round > ROUNDS) return (
    <div className="bg-gray-900 border border-yellow-500 rounded-2xl p-8 text-white text-center">
      <div className="text-5xl mb-3">{scores.player >= 3 ? '🏆' : '💫'}</div>
      <h2 className="text-2xl font-bold text-yellow-400 mb-2">
        {scores.player > scores.ai ? 'You Win!' : scores.player === scores.ai ? 'Tied!' : 'AI Wins!'}
      </h2>
      <p className="text-gray-300 mb-1">
        You <span className="text-green-400 font-bold">{scores.player}</span>
        {' – '}
        <span className="text-red-400 font-bold">{scores.ai}</span> AI
      </p>
      <p className="text-yellow-300 font-bold text-xl mb-6">+{getPoints(scores.player)} pts</p>
      <button
        onClick={finish}
        className="px-8 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-full text-lg"
      >
        ✅ Unlock Next Zone →
      </button>
    </div>
  );

  return (
    <div className="bg-gray-900 border border-yellow-500 rounded-2xl p-6 text-white">
      <div className="flex justify-between items-center mb-2">
        <span className="text-yellow-400 font-bold text-sm uppercase tracking-widest">🪨 Rock Paper Scissors</span>
        <span className="text-gray-400 text-sm">Round {round}/{ROUNDS}</span>
      </div>
      <p className="text-gray-400 text-xs mb-2 text-center">
        You <span className="text-green-400 font-bold">{scores.player}</span>
        {' – '}
        <span className="text-red-400 font-bold">{scores.ai}</span> AI
      </p>

      {last && (
        <div className="text-center text-2xl mb-3 py-2 rounded-xl bg-gray-800">
          {CHOICES[last.player]} vs {CHOICES[last.ai]} —{' '}
          <span className={
            last.result === 'win'  ? 'text-green-400' :
            last.result === 'lose' ? 'text-red-400'   : 'text-gray-400'
          }>
            {last.result.toUpperCase()}
          </span>
        </div>
      )}

      <p className="text-center text-sm text-gray-300 mb-3">Pick your move:</p>
      <div className="grid grid-cols-3 gap-3">
        {CHOICES.map((c, i) => (
          <button
            key={i}
            onClick={() => play(i)}
            className="h-20 rounded-xl bg-gray-800 border-2 border-gray-600 hover:border-yellow-400 hover:bg-gray-700 transition-all flex flex-col items-center justify-center"
          >
            <span className="text-4xl">{c}</span>
            <span className="text-xs text-gray-400 mt-1">{NAMES[i]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}