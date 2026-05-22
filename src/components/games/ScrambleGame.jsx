import { useState } from 'react';
import { useGameStore } from '../../store/useGameStore';

const WORDS = [
  { word: 'NEBULA',   hint: '🌌 A cloud of gas and dust in space' },
  { word: 'COMET',    hint: '☄️ A space rock with a glowing tail' },
  { word: 'GALAXY',   hint: '🌠 A system of millions of stars' },
  { word: 'ORBIT',    hint: '🪐 The path a planet takes around a star' },
  { word: 'METEOR',   hint: '💫 A space rock that enters the atmosphere' },
];

function scramble(word) {
  const arr = word.split('');
  for (let i = arr.length-1; i>0; i--) {
    const j = Math.floor(Math.random()*(i+1));
    [arr[i],arr[j]] = [arr[j],arr[i]];
  }
  const s = arr.join('');
  return s === word ? scramble(word) : s;
}

export default function ScrambleGame() {
  const { clearZone, currentZone } = useGameStore();
  const [index,  setIndex]  = useState(0);
  const [input,  setInput]  = useState('');
  const [score,  setScore]  = useState(0);
  const [status, setStatus] = useState(null); // 'correct' | 'wrong'
  const [done,   setDone]   = useState(false);
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
    }, 900);
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
      <h2 className="text-2xl font-bold text-orange-400 mb-2">Scramble Complete!</h2>
      <p className="text-gray-300 mb-1">Score: <span className="text-yellow-400 font-bold">{score}</span> / 500</p>
      <p className="text-orange-300 font-bold text-xl mb-6">+{score} pts</p>
      <button onClick={() => clearZone(currentZone, score)}
        className="px-8 py-3 bg-orange-500 hover:bg-orange-400 text-black font-bold rounded-full text-lg">
        ✅ Unlock Next Zone →
      </button>
    </div>
  );

  const current = WORDS[index];
  return (
    <div className="bg-gray-900 border border-orange-500 rounded-2xl p-6 text-white">
      <div className="flex justify-between items-center mb-4">
        <span className="text-orange-400 font-bold text-sm uppercase tracking-widest">🔤 Word Scramble</span>
        <span className="text-gray-400 text-sm">{index+1}/{WORDS.length} · {score} pts</span>
      </div>
      <p className="text-gray-400 text-xs mb-2 text-center">{current.hint}</p>

      <div className="text-center text-4xl font-bold tracking-[0.3em] py-4 bg-gray-800 rounded-xl mb-4 text-cyan-300">
        {scrambled[index]}
      </div>

      <input
        value={input}
        onChange={e => setInput(e.target.value.toUpperCase())}
        onKeyDown={e => e.key==='Enter' && check()}
        placeholder="Type the unscrambled word..."
        className={`w-full px-4 py-3 rounded-xl bg-gray-800 border-2 text-white text-center text-lg font-bold uppercase tracking-widest outline-none mb-3 transition-colors ${
          status==='correct' ? 'border-green-400 bg-green-900'
          : status==='wrong' ? 'border-red-400 bg-red-900'
          : 'border-gray-600 focus:border-orange-400'
        }`}
      />
      <div className="flex gap-3">
        <button onClick={check}
          className="flex-1 py-3 bg-orange-500 hover:bg-orange-400 text-black font-bold rounded-xl">
          Check ↵
        </button>
        <button onClick={skip}
          className="px-5 py-3 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-xl text-sm">
          Skip
        </button>
      </div>
    </div>
  );
}