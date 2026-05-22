import { useState } from 'react';
import { useGameStore } from '../../store/useGameStore';

const QUESTIONS = {
  intro: [
    {
      q: "Which planet is known as the Red Planet?",
      opts: ["Venus", "Mars", "Jupiter", "Saturn"],
      ans: 1,
    },
    {
      q: "How many moons does Earth have?",
      opts: ["1", "2", "3", "0"],
      ans: 0,
    },
    {
      q: "What is the closest star to Earth?",
      opts: ["Sirius", "Alpha Centauri", "The Sun", "Betelgeuse"],
      ans: 2,
    },
  ],
  contact: [
    {
      q: "What galaxy do we live in?",
      opts: ["Andromeda", "Milky Way", "Triangulum", "Whirlpool"],
      ans: 1,
    },
    {
      q: "What is a light-year a measure of?",
      opts: ["Time", "Speed", "Distance", "Mass"],
      ans: 2,
    },
    {
      q: "Which planet has the most moons?",
      opts: ["Jupiter", "Saturn", "Uranus", "Neptune"],
      ans: 1,
    },
  ],
};

export default function QuizGame({ zone }) {
  const { clearZone, currentZone } = useGameStore();
  const questions = QUESTIONS[zone];
  const [index,   setIndex]   = useState(0);
  const [selected, setSelected] = useState(null);
  const [correct,  setCorrect]  = useState(0);
  const [done,     setDone]     = useState(false);

  const handleAnswer = (i) => {
    if (selected !== null) return;
    setSelected(i);
    const isRight = i === questions[index].ans;
    if (isRight) setCorrect(c => c + 1);
    setTimeout(() => {
      if (index + 1 < questions.length) {
        setIndex(idx => idx + 1);
        setSelected(null);
      } else {
        setDone(true);
      }
    }, 900);
  };

  const finish = () => {
    const pts = correct * 100;
    clearZone(currentZone, pts);
  };

  if (done) return (
    <div className="bg-gray-900 border border-cyan-500 rounded-2xl p-8 text-white text-center">
      <div className="text-5xl mb-3">🚀</div>
      <h2 className="text-2xl font-bold text-cyan-400 mb-2">Quiz Complete!</h2>
      <p className="text-gray-300 mb-1">You got <span className="text-yellow-400 font-bold">{correct}/{questions.length}</span> correct</p>
      <p className="text-cyan-300 font-bold text-xl mb-6">+{correct * 100} pts</p>
      <button onClick={finish}
        className="px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-full text-lg">
        {correct >= 2 ? '✅ Unlock Next Zone →' : '➡️ Continue'}
      </button>
    </div>
  );

  const q = questions[index];
  return (
    <div className="bg-gray-900 border border-cyan-500 rounded-2xl p-6 text-white">
      <div className="flex justify-between items-center mb-4">
        <span className="text-cyan-400 font-bold text-sm uppercase tracking-widest">🌌 Space Quiz</span>
        <span className="text-gray-400 text-sm">{index + 1} / {questions.length}</span>
      </div>
      <h2 className="text-xl font-bold mb-6">{q.q}</h2>
      <div className="grid grid-cols-1 gap-3">
        {q.opts.map((opt, i) => {
          let cls = "w-full py-3 px-4 rounded-xl text-left text-sm font-medium transition-all border ";
          if (selected === null)          cls += "bg-gray-800 border-gray-700 hover:border-cyan-500 hover:bg-gray-700";
          else if (i === q.ans)           cls += "bg-green-700 border-green-400";
          else if (i === selected)        cls += "bg-red-800 border-red-500";
          else                            cls += "bg-gray-800 border-gray-700 opacity-50";
          return <button key={i} onClick={() => handleAnswer(i)} className={cls}>{String.fromCharCode(65+i)}. {opt}</button>;
        })}
      </div>
    </div>
  );
}