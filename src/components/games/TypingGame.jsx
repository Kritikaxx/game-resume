import { useState, useEffect, useRef } from 'react';
import { useGameStore } from '../../store/useGameStore';

const SENTENCES = [
  "Interstellar travel requires overcoming the vast distances between star systems",
  "The event horizon of a black hole marks the boundary of no return for light",
  "Neutron stars are so dense that a teaspoon of their matter weighs a billion tons",
  "The James Webb Space Telescope captures infrared light from the earliest galaxies",
  "Solar winds carry charged particles that create auroras near the magnetic poles",
];

const TIME_LIMIT = 30;
const ROUNDS     = 3;

const SHUFFLED = [...SENTENCES].sort(() => Math.random() - 0.5);

export default function TypingGame() {
  const { clearZone, currentZone } = useGameStore();

  const [roundIndex, setRoundIndex] = useState(0);
  const [input,      setInput]      = useState('');
  const [timeLeft,   setTimeLeft]   = useState(TIME_LIMIT);
  const [totalScore, setTotalScore] = useState(0);
  const [phase,      setPhase]      = useState('intro');
  const [flashType,  setFlashType]  = useState(null);

  const [roundStats, setRoundStats] = useState([]);
  const roundStartTime = useRef(null);

  const inputRef = useRef(null);
  const sentence = SHUFFLED[roundIndex % SHUFFLED.length];

  //Timer
  useEffect(() => {
    if (phase !== 'playing') return;
    if (timeLeft <= 0) {
      endRound(false, 0);
      return;
    }
    const t = setTimeout(() => setTimeLeft(v => v - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, phase]); // eslint-disable-line react-hooks/exhaustive-deps

  //Focus input when playing starts
  useEffect(() => {
    if (phase === 'playing') {
      roundStartTime.current = Date.now();
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [phase, roundIndex]);

  function endRound(correct, pts) {
  const timeTaken = correct
    ? Math.max(1, TIME_LIMIT - timeLeft)
    : TIME_LIMIT;

  const typed         = inputRef.current?.value || '';

  const correctChars  = typed.split('').filter((c, i) =>
    c.toLowerCase() === sentence[i]?.toLowerCase()
  ).length;
  const acc           = typed.length > 0
    ? Math.round((correctChars / typed.length) * 100)
    : 0;

  //Always calculate WPM based on chars typed, not full sentence
  const charsTyped    = typed.length;
  const wordsTyped    = charsTyped / 5;
  const wpm           = Math.round((wordsTyped / timeTaken) * 60);

  //Partial points even on timeout based on % of sentence completed
  const completionPct = Math.min(charsTyped / sentence.length, 1);
  const finalPts      = correct
    ? pts
    : Math.round(completionPct * acc * 0.5); // partial credit

  setRoundStats(prev => [...prev, {
    round: roundIndex + 1,
    wpm,
    acc,
    correct,
    timeTaken,
    pts: finalPts,
  }]);

  setFlashType(correct ? 'correct' : 'wrong');
  setPhase('flash');
  if (finalPts > 0) setTotalScore(s => s + finalPts);

  setTimeout(() => {
    setFlashType(null);
    const nextRound = roundIndex + 1;
    if (nextRound >= ROUNDS) {
      setPhase('done');
    } else {
      setRoundIndex(nextRound);
      setInput('');
      setTimeLeft(TIME_LIMIT);
      setPhase('playing');
    }
  }, 700);
}

  function handleInput(e) {
    const val = e.target.value;
    setInput(val);
    if (val.toLowerCase() === sentence.toLowerCase()) {
      const timeTaken = Math.max(1, TIME_LIMIT - timeLeft);
      const pts       = Math.max(50, Math.round((sentence.length / timeTaken) * 50));
      endRound(true, pts);
    }
  }

  function start() {
    setPhase('playing');
  }

  function finish() {
    clearZone(currentZone, totalScore);
  }

  function renderSentence() {
    return sentence.split('').map((char, i) => {
      let cls = 'text-gray-500';
      if (i < input.length) {
        cls = input[i].toLowerCase() === char.toLowerCase() ? 'text-green-400' : 'text-red-400';
      } else if (i === input.length) {
        cls = 'text-white border-b border-cyan-400';
      }
      return <span key={i} className={cls}>{char}</span>;
    });
  }

  const accuracy = input.length > 0
    ? Math.round(input.split('').filter((c, i) => c.toLowerCase() === sentence[i]?.toLowerCase()).length / input.length * 100)
    : 100;

  const timerColor = timeLeft > 15 ? 'text-green-400' : timeLeft > 8 ? 'text-yellow-400' : 'text-red-400 animate-pulse';
  const barColor   = timeLeft > 15 ? 'bg-green-400'   : timeLeft > 8 ? 'bg-yellow-400'   : 'bg-red-400';

  if (phase === 'done') {
    const avgWpm = roundStats.length > 0
      ? Math.round(roundStats.reduce((s, r) => s + r.wpm, 0) / roundStats.length)
      : 0;
    const avgAcc = roundStats.length > 0
      ? Math.round(roundStats.reduce((s, r) => s + r.acc, 0) / roundStats.length)
      : 0;
    const wpmLabel =
      avgWpm >= 60 ? '🚀 Expert Typist!' :
      avgWpm >= 40 ? '⚡ Fast Typist!'   :
      avgWpm >= 20 ? '✅ Good Typist'    : '🌱 Keep Practising';

    return (
      <div className="bg-gray-900 border border-cyan-500 rounded-2xl p-6 text-white">
        <div className="text-center mb-4">
          <div className="text-4xl mb-1">⌨️</div>
          <h2 className="text-2xl font-bold text-cyan-400">Speed Test Complete!</h2>
        </div>

        {/* WPM highlight */}
        <div className="bg-gray-800 rounded-xl p-4 mb-4 text-center">
          <div className="text-5xl font-black text-cyan-400">{avgWpm}</div>
          <div className="text-gray-400 text-sm">avg words per minute</div>
          <div className="text-yellow-400 font-bold mt-1">{wpmLabel}</div>
        </div>

        {/* Per-round breakdown */}
        <div className="space-y-2 mb-4">
          {roundStats.map((r, i) => (
            <div key={i} className="flex justify-between items-center bg-gray-800 rounded-lg px-3 py-2 text-sm">
              <span className="text-gray-400">Round {r.round}</span>
              <span className={r.correct ? 'text-green-400' : 'text-red-400'}>
                {r.correct ? '✓' : '✗'}
              </span>
              <span className="text-cyan-300">{r.wpm} WPM</span>
              <span className="text-gray-300">{r.acc}% acc</span>
              <span className="text-yellow-400">+{r.pts} pts</span>
            </div>
          ))}
        </div>

        {/* Summary row */}
        <div className="flex justify-between text-sm bg-gray-800 rounded-lg px-3 py-2 mb-5 border border-gray-600">
          <span className="text-gray-400">Avg Accuracy</span>
          <span className="text-green-400 font-bold">{avgAcc}%</span>
          <span className="text-gray-400">Total Score</span>
          <span className="text-cyan-400 font-bold">+{totalScore} pts</span>
        </div>

        <button onClick={finish}
          className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-full text-lg">
          Unlock Next Zone →
        </button>
      </div>
    );
  }

  // INTRO 
  if (phase === 'intro') return (
    <div className="bg-gray-900 border border-cyan-500 rounded-2xl p-8 text-white text-center">
      <div className="text-5xl mb-3">⌨️</div>
      <h2 className="text-2xl font-bold text-cyan-400 mb-2">Speed Typing</h2>
      <p className="text-gray-400 mb-4">Type space sentences as fast as you can!</p>
      <div className="bg-gray-800 rounded-xl p-3 mb-6 text-sm text-gray-300 space-y-1">
        <p>⏱️ <span className="text-white">{TIME_LIMIT}s</span> per round-finish early for bonus pts</p>
        <p>🎯 <span className="text-white">{ROUNDS} rounds</span> total</p>
        <p> Final score shows your <span className="text-white">WPM speed</span></p>
      </div>
      <button onClick={start}
        className="px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-full text-lg">
        Start Typing →
      </button>
    </div>
  );

  //PLAYING/FLASH
  return (
    <div className={`bg-gray-900 border rounded-2xl p-5 text-white transition-colors duration-200 ${
      flashType === 'correct' ? 'border-green-400'
      : flashType === 'wrong' ? 'border-red-400'
      : 'border-cyan-500'
    }`}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-cyan-400 font-bold text-xs uppercase tracking-widest">⌨️Speed Typing</span>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-gray-400">Round {roundIndex + 1}/{ROUNDS}</span>
          <span className={`font-black text-lg ${timerColor}`}>{timeLeft}s</span>
        </div>
      </div>

      <div className="bg-gray-700 rounded-full h-1.5 mb-3 overflow-hidden">
        <div className={`h-1.5 rounded-full transition-all duration-1000 ${barColor}`}
          style={{ width: `${(timeLeft / TIME_LIMIT) * 100}%` }} />
      </div>

      <div className="bg-gray-800 rounded-xl p-3 mb-3 text-base font-mono leading-relaxed tracking-wide text-center">
        {renderSentence()}
      </div>

      <input
        ref={inputRef}
        value={input}
        onChange={handleInput}
        disabled={phase === 'flash'}
        placeholder="Type here..."
        className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border-2 border-gray-600 focus:border-cyan-400 text-white outline-none mb-2 font-mono text-sm disabled:opacity-40"
      />

      <div className="flex justify-between text-xs text-gray-500">
        <span>Accuracy: <span className="text-gray-300">{accuracy}%</span></span>
        <span>Score: <span className="text-cyan-300 font-bold">{totalScore} pts</span></span>
        <span>{input.length}/{sentence.length} chars</span>
      </div>
    </div>
  );
}