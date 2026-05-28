import { useGameStore, ZONES } from '../../store/useGameStore';
import { resumeData } from '../../data/resumeData';

const GAME_NAMES = { intro:'Space Quiz', skills:'Memory Match', projects:'Tic Tac Toe', education:'Rock Paper Scissors', achievements:'Word Scramble', contact:'Space Quiz' };

export default function FinalScreen() {
  const { score, closeFinal } = useGameStore();
  const maxScore = 1800;
  const grade = score >= 1400 ? 'S' : score >= 1000 ? 'A' : score >= 600 ? 'B' : 'C';
  const gradeColor = { S:'text-yellow-400', A:'text-cyan-400', B:'text-green-400', C:'text-gray-400' };

  // ← CHANGED: opens Gmail compose with email, subject and body pre-filled
  const handleContact = () => {
    const subject = encodeURIComponent("Hey Kritika, I explored your Resume Quest!");
    const body    = encodeURIComponent(
      `Hi Kritika,\n\nI just explored your interactive 3D resume and scored ${score} points.\n\nI'd love to connect.\n\nBest regards,`
    );
    window.open(
      `https://mail.google.com/mail/?view=cm&to=kritika2311singh@gmail.com&su=${subject}&body=${body}`,
      '_blank'
    );
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/95 text-white overflow-y-auto">
      <div className="text-center max-w-lg w-full mx-4 py-8">
        <div className="text-6xl mb-3">🌌</div>
        <h1 className="text-4xl font-bold text-cyan-400 mb-1">RESUME QUEST COMPLETE</h1>
        <p className="text-gray-400 mb-6">You've explored all of {resumeData.intro.name}'s universe!</p>

        <div className="bg-gray-900 rounded-2xl p-6 mb-6 border border-gray-700">
          <div className={`text-7xl font-black mb-1 ${gradeColor[grade]}`}>{grade}</div>
          <div className="text-3xl font-bold text-white mb-1">{score} <span className="text-gray-400 text-lg">/ {maxScore} pts</span></div>
          <div className="text-gray-400 text-sm">All 6 zones cleared</div>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-6 text-sm">
          {ZONES.map(zone => (
            <div key={zone} className="bg-gray-800 rounded-xl px-3 py-2 flex justify-between items-center">
              <span className="text-gray-300">{GAME_NAMES[zone]}</span>
              <span className="text-green-400 font-bold">✅</span>
            </div>
          ))}
        </div>

        <div className="flex gap-3 justify-center flex-wrap">
          {/* ← CHANGED: opens Gmail compose with email, subject and body pre-filled */}
          <button
            onClick={handleContact}
            className="px-6 py-3 bg-cyan-500 text-black font-bold rounded-full hover:bg-cyan-400 transition-all"
          >
            📬 Contact {resumeData.intro.name}
          </button>

          <a href={resumeData.contact.github} target="_blank" rel="noreferrer"
            className="px-6 py-3 bg-gray-700 text-white font-bold rounded-full hover:bg-gray-600 transition-all">
            GitHub
          </a>

          <a href={resumeData.contact.linkedin} target="_blank" rel="noreferrer"
            className="px-6 py-3 bg-blue-700 text-white font-bold rounded-full hover:bg-blue-600 transition-all">
            LinkedIn
          </a>

          <button onClick={closeFinal}
            className="px-6 py-3 bg-gray-800 text-gray-300 rounded-full hover:bg-gray-700 border border-gray-600 transition-all">
            ↩ Play Again
          </button>
        </div>
      </div>
    </div>
  );
}