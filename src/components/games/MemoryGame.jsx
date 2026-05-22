import { useState } from 'react';
import { useGameStore } from '../../store/useGameStore';

const EMOJIS = ['⭐', '🌙', '🪐', '☄️', '🚀', '🛸', '🌌', '🔭'];

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function buildDeck() {
  // Always 4 pairs = 8 cards — fully completable, no odd card
  const chosen = shuffle([...EMOJIS]).slice(0, 4);
  const deck   = shuffle([...chosen, ...chosen]);
  return deck.map((e, i) => ({ id: i, emoji: e, flipped: false, matched: false }));
}

export default function MemoryGame() {
  const { clearZone, currentZone } = useGameStore();
  const [cards,   setCards]   = useState(() => buildDeck());
  const [flipped, setFlipped] = useState([]);
  const [moves,   setMoves]   = useState(0);
  const [done,    setDone]    = useState(false);

  const flip = (id) => {
    if (flipped.length === 2) return;
    const card = cards.find(c => c.id === id);
    if (!card || card.flipped || card.matched) return;

    const newCards   = cards.map(c => c.id === id ? { ...c, flipped: true } : c);
    const newFlipped = [...flipped, id];
    setCards(newCards);
    setFlipped(newFlipped);
    setMoves(m => m + 1);

    if (newFlipped.length === 2) {
      const [a, b] = newFlipped.map(fid => newCards.find(c => c.id === fid));
      if (a.emoji === b.emoji) {
        setTimeout(() => {
          const matched = newCards.map(c =>
            newFlipped.includes(c.id) ? { ...c, matched: true } : c
          );
          setCards(matched);
          setFlipped([]);
          // Check win — all 8 matched
          if (matched.every(c => c.matched)) setDone(true);
        }, 400);
      } else {
        setTimeout(() => {
          setCards(prev =>
            prev.map(c => newFlipped.includes(c.id) ? { ...c, flipped: false } : c)
          );
          setFlipped([]);
        }, 800);
      }
    }
  };

  const pts = Math.max(300 - moves * 10, 100);

  if (done) return (
    <div className="bg-gray-900 border border-green-500 rounded-2xl p-8 text-white text-center">
      <div className="text-5xl mb-3">🎉</div>
      <h2 className="text-2xl font-bold text-green-400 mb-2">All Pairs Found!</h2>
      <p className="text-gray-300 mb-1">
        Completed in <span className="text-yellow-400 font-bold">{moves}</span> moves
      </p>
      <p className="text-green-300 font-bold text-xl mb-6">+{pts} pts</p>
      <button
        onClick={() => clearZone(currentZone, pts)}
        className="px-8 py-3 bg-green-500 hover:bg-green-400 text-black font-bold rounded-full text-lg"
      >
        ✅ Unlock Next Zone →
      </button>
    </div>
  );

  return (
    <div className="bg-gray-900 border border-green-500 rounded-2xl p-6 text-white">
      <div className="flex justify-between items-center mb-4">
        <span className="text-green-400 font-bold text-sm uppercase tracking-widest">⭐ Memory Match</span>
        <span className="text-gray-400 text-sm">Moves: {moves}</span>
      </div>
      <p className="text-gray-400 text-xs mb-4 text-center">Flip cards to find all 4 matching pairs!</p>
      {/* 4×2 grid — always fully completable */}
      <div className="grid grid-cols-4 gap-3">
        {cards.map(card => (
          <button
            key={card.id}
            onClick={() => flip(card.id)}
            className={`h-16 rounded-xl text-2xl font-bold transition-all duration-300 border-2 ${
              card.matched
                ? 'bg-green-800 border-green-400 scale-95'
                : card.flipped
                ? 'bg-gray-700 border-cyan-400'
                : 'bg-gray-800 border-gray-600 hover:border-gray-400 hover:bg-gray-700'
            }`}
          >
            {card.flipped || card.matched ? card.emoji : '?'}
          </button>
        ))}
      </div>
    </div>
  );
}