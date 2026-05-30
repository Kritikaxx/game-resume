import { useState } from 'react';
import { useGameStore } from '../../store/useGameStore';

const WORDS = [
  { word: 'NEBULA',  hint: 'A cloud of gas and dust in space' },
  { word: 'COMET',   hint: 'A space rock with a glowing tail' },
  { word: 'GALAXY',  hint: 'A system of millions of stars' },
  { word: 'ORBIT',   hint: 'The path a planet takes around a star' },
  { word: 'METEOR',  hint: 'A rock that enters the atmosphere' },
];

function scramble(word) {
  const arr = word.split('');
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join('') === word ? scramble(word) : arr.join('');
}

export default function ScrambleGame() {
  const { clearZone, currentZone } = useGameStore();
  const [index,    setIndex]    = useState(0);
  const [input,    setInput]    = useState('');
  const [score,    setScore]    = useState(0);
  const [status,   setStatus]   = useState(null);
  const [done,     setDone]     = useState(false);
  const [scrambled] = useState(() => WORDS.map(w => scramble(w.word)));

  const check = () => {
    const correct = input.trim().toUpperCase() === WORDS[index].word;
    setStatus(correct ? 'correct' : 'wrong');
    if (correct) setScore(s => s + 100);
    setTimeout(() => {
      setStatus(null);
      setInput('');
      if (index + 1 >= WORDS.length) setDone(true);
      else setIndex(i => i + 1);
    }, 700);
  };

  const skip = () => {
    setInput('');
    setStatus(null);
    if (index + 1 >= WORDS.length) setDone(true);
    else setIndex(i => i + 1);
  };

  if (done) return (
    <div className="bg-gray-900 border border-orange-500 rounded-2xl p-8 text-white text-center">
      <div className="text-5xl mb-3">🏆</div>
      <h2 className="text-2xl font-bold text-orange-400 mb-1">Complete!</h2>
      <p className="text-gray-400 mb-1">{score} / 500 pts scored</p>
      <p className="text-orange-300 font-bold text-2xl mb-6">+{score} pts</p>
      <button onClick={() => clearZone(currentZone, score)}
        className="px-8 py-3 bg-orange-500 hover:bg-orange-400 text-black font-bold rounded-full text-lg">
        Unlock Next Zone →
      </button>
    </div>
  );

  return (
    <div className="bg-gray-900 border border-orange-500 rounded-2xl p-6 text-white">

      {/* Progress dots */}
      <div className="flex justify-center gap-2 mb-5">
        {WORDS.map((_, i) => (
          <div key={i} className={`w-2 h-2 rounded-full transition-all ${
            i < index ? 'bg-green-400' : i === index ? 'bg-orange-400 scale-125' : 'bg-gray-600'
          }`} />
        ))}
      </div>

      {/* Hint */}
      <p className="text-gray-400 text-sm text-center mb-3 italic">{WORDS[index].hint}</p>

      {/* Scrambled word */}
      <div className="text-center text-4xl font-black tracking-[0.3em] py-4 rounded-xl mb-4 text-cyan-300">
        {scrambled[index]}
      </div>

      {/* Input */}
      <input
        value={input}
        onChange={e => setInput(e.target.value.toUpperCase())}
        onKeyDown={e => e.key === 'Enter' && check()}
        placeholder="Your answer..."
        className={`w-full px-4 py-3 rounded-xl bg-gray-800 border-2 text-white text-center text-lg font-bold uppercase tracking-widest outline-none mb-3 transition-colors ${
          status === 'correct' ? 'border-green-400 bg-green-900/40'
          : status === 'wrong' ? 'border-red-400 bg-red-900/40'
          : 'border-gray-600 focus:border-orange-400'
        }`}
      />

      <div className="flex gap-2">
        <button onClick={check}
          className="flex-1 py-3 bg-orange-500 hover:bg-orange-400 text-black font-bold rounded-xl transition-all">
          Check ↵
        </button>
        <button onClick={skip}
          className="px-5 py-3 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-xl text-sm transition-all">
          Skip
        </button>
      </div>

      {/* Score */}
      <p className="text-center text-gray-500 text-xs mt-3">{score} pts · word {index + 1} of {WORDS.length}</p>
    </div>
  );
}