import { useEffect, useState } from 'react';
import { useGameStore, ZONES } from '../../store/useGameStore';
import { resumeData } from '../../data/resumeData';

const STARS = Array.from({ length: 20 }, () => ({
  width:    Math.random() * 3 + 1,
  height:   Math.random() * 3 + 1,
  top:      Math.random() * 100,
  left:     Math.random() * 100,
  duration: Math.random() * 3 + 1,
  delay:    Math.random() * 2,
  opacity:  Math.random() * 0.7 + 0.3,
}));

const GAME_NAMES = {
  intro: 'Space Quiz', skills: 'Memory Match', projects: 'Tic Tac Toe',
  education: 'Rock Paper Scissors', experience: 'Speed Typing', achievements: 'Word Scramble', contact: 'Space Quiz',
};

export default function FinalScreen() {
  const { score, closeFinal } = useGameStore();
  const [visible, setVisible] = useState(false);
  const maxScore   = 1800;
  const grade      = score >= 1400 ? 'S' : score >= 1000 ? 'A' : score >= 600 ? 'B' : 'C';
  const gradeColor = { S: 'text-yellow-400', A: 'text-cyan-400', B: 'text-green-400', C: 'text-gray-400' };
  const gradeLabel = { S: 'Stellar!', A: 'Awesome!', B: 'Great Job!', C: 'Well Done!' };

  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  const handleContact = () => {
    const subject = encodeURIComponent("Hey Kritika, I explored your Resume Quest!");
    const body    = encodeURIComponent(`Hi Kritika,\nI just explored your 3D resume and scored ${score} points.\nI'd love to connect.\n\nBest,`);
    window.open(`https://mail.google.com/mail/?view=cm&to=kritika2311singh@gmail.com&su=${subject}&body=${body}`, '_blank');
  };

  return (
    <div className={`absolute inset-0 z-50 flex items-center justify-center bg-black text-white overflow-y-auto transition-opacity duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {STARS.map((s, i) => (
          <div key={i} className="absolute rounded-full bg-white animate-ping"
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

      <div className="relative text-center max-w-lg w-full mx-4 py-8">
        <div className="text-5xl font-black tracking-tight bg-gradient-to-r from-cyan-400 via-white to-cyan-400 bg-clip-text text-transparent mb-1">
          QUEST COMPLETE
        </div>
        <p className="text-gray-400 text-sm mb-6">You've explored {resumeData.intro.name}'s universe!</p>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-4">
          <div className={`text-8xl font-black ${gradeColor[grade]}`}>{grade}</div>
          <div className="text-sm text-gray-400 mb-1">{gradeLabel[grade]}</div>
          <div className="text-3xl font-bold">{score} <span className="text-gray-500 text-base">/ {maxScore} pts</span></div>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-6 text-sm">
          {ZONES.map(zone => (
            <div key={zone} className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 flex justify-between items-center">
              <span className="text-gray-300">{GAME_NAMES[zone]}</span>
              <span className="text-green-400">✅</span>
            </div>
          ))}
        </div>

        <div className="flex gap-3 justify-center flex-wrap">
          <button onClick={handleContact}
            className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-full transition-all hover:scale-105">
            📬 Contact Me
          </button>
          <a href={resumeData.contact.github} target="_blank" rel="noreferrer"
            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full border border-white/20 transition-all">
            GitHub
          </a>
          <a href={resumeData.contact.linkedin} target="_blank" rel="noreferrer"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full transition-all">
            LinkedIn
          </a>
          <button onClick={closeFinal}
            className="px-6 py-3 bg-white/5 text-gray-400 rounded-full hover:bg-white/10 border border-white/10 transition-all">
            ↩ Play Again
          </button>
        </div>
      </div>
    </div>
  );
}