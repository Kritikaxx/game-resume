import { useEffect, useState } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { resumeData } from '../../data/resumeData';

// Generated once at module load — never during render
const STARS = Array.from({ length: 20 }, () => ({
  width:    Math.random() * 3 + 1,
  height:   Math.random() * 3 + 1,
  top:      Math.random() * 100,
  left:     Math.random() * 100,
  duration: Math.random() * 3 + 1,
  delay:    Math.random() * 2,
  opacity:  Math.random() * 0.7 + 0.3,
}));

export default function StartScreen() {
  const startGame = useGameStore(s => s.startGame);
  const [visible, setVisible] = useState(false);

  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  return (
    <div className={`absolute inset-0 z-50 flex flex-col items-center justify-center bg-black text-white transition-opacity duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {STARS.map((s, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-ping"
            style={{
              width:             s.width + 'px',
              height:            s.height + 'px',
              top:               s.top + '%',
              left:              s.left + '%',
              animationDuration: s.duration + 's',
              animationDelay:    s.delay + 's',
              opacity:           s.opacity,
            }}
          />
        ))}
      </div>

      <div className="relative mb-2 text-center">
        <div className="text-7xl font-black tracking-tight bg-gradient-to-r from-cyan-400 via-white to-cyan-400 bg-clip-text text-transparent animate-pulse">
          RESUME QUEST
        </div>
        <div className="text-xl text-cyan-300 mt-1 tracking-widest font-light">
          {resumeData.intro.name}
        </div>
        <div className="text-gray-400 mt-1 text-sm tracking-wide">
          {resumeData.intro.title}
        </div>
      </div>

      <div className="w-32 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent my-6" />

      <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl px-8 py-5 mb-8 max-w-sm w-full mx-4 text-center">
        <p className="text-cyan-400 font-bold text-sm uppercase tracking-widest mb-4">How to Play</p>
        <div className="space-y-2 text-sm text-gray-300">
          <p>🌌 Navigate through <span className="text-white font-semibold">6 space zones</span></p>
          <p>🖱️ <span className="text-white font-semibold">Drag</span> to look around each zone</p>
          <p>🔍 <span className="text-white font-semibold">Click objects</span> to reveal resume info</p>
          <p>🎮 <span className="text-white font-semibold">Beat the mini-game</span> to unlock the next zone</p>
          <p>🏆 Score points and reach the <span className="text-white font-semibold">Final Screen</span></p>
        </div>
      </div>

      <button
        onClick={startGame}
        className="relative px-12 py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-black text-xl rounded-full transition-all duration-200 hover:scale-105 shadow-lg shadow-cyan-500/40"
      >
        START QUEST →
      </button>

      <p className="mt-4 text-gray-600 text-xs tracking-widest">DRAG • CLICK • EXPLORE • WIN</p>
    </div>
  );
}