import { useGameStore } from '../../store/useGameStore';
import { resumeData } from '../../data/resumeData';

const ZONES = ['intro', 'skills', 'projects', 'education', 'achievements', 'contact'];
const ICONS = { intro:'👤', skills:'⚡', projects:'🚀', education:'🎓', achievements:'🏆', contact:'📬' };

export default function HUD() {
  const { currentZone, visitedZones, collectedBadges, score, goToZone, startQuiz, quizAnswered } = useGameStore();
  const progress = Math.round((visitedZones.length / ZONES.length) * 100);

  return (
    <>
      {/* Zone navigation — top center */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 flex gap-2 bg-black/40 backdrop-blur-sm px-3 py-2 rounded-full">
        {ZONES.map(zone => (
          <button
            key={zone}
            onClick={() => goToZone(zone)}
            className={`flex flex-col items-center px-3 py-1 rounded-full text-xs font-bold transition-all duration-200 ${
              currentZone === zone
                ? 'bg-cyan-400 text-black scale-110 shadow-lg shadow-cyan-400/40'
                : visitedZones.includes(zone)
                ? 'bg-green-700 text-white hover:bg-green-600'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
            }`}
          >
            <span className="text-base leading-none">{ICONS[zone]}</span>
            <span className="mt-0.5">{zone.toUpperCase()}</span>
          </button>
        ))}
      </div>

      {/* Score — top right */}
      <div className="absolute top-4 right-4 z-40 bg-black/70 backdrop-blur-sm text-white px-4 py-3 rounded-xl text-sm space-y-1">
        <div className="text-cyan-400 font-bold text-lg">SCORE: {score}</div>
        <div className="text-gray-400 text-xs">Badges: {collectedBadges.length} 🎖️</div>
        <div className="text-gray-400 text-xs">Quizzes: {quizAnswered.length}/6 🧠</div>
      </div>

      {/* Quiz trigger buttons — per zone */}
      {resumeData.quizzes[currentZone] && !quizAnswered.includes(resumeData.quizzes[currentZone].id) && (
        <div className="absolute top-24 right-4 z-40">
          <button
            onClick={() => startQuiz(resumeData.quizzes[currentZone])}
            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-sm rounded-xl animate-pulse"
          >
            🎯 Zone Quiz (+150 pts)
          </button>
        </div>
      )}
      {resumeData.quizzes[currentZone] && quizAnswered.includes(resumeData.quizzes[currentZone].id) && (
        <div className="absolute top-24 right-4 z-40">
          <div className="px-4 py-2 bg-green-800 text-green-300 font-bold text-sm rounded-xl">
            ✅ Quiz Done
          </div>
        </div>
      )}

      {/* Controls hint — bottom left */}
      <div className="absolute bottom-16 left-4 z-40 text-gray-500 text-xs space-y-1">
        <p>🖱️ <span className="text-gray-400">Drag</span> to look around</p>
        <p>🖱️ <span className="text-gray-400">Click objects</span> to reveal info</p>
        <p>🎯 <span className="text-gray-400">Zone Quiz</span> to earn 150 pts</p>
      </div>

      {/* Progress bar — bottom center */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 w-72">
        <div className="text-white text-xs text-center mb-1 font-bold tracking-widest">
          {ICONS[currentZone]} {currentZone.toUpperCase()} ZONE &nbsp;·&nbsp; QUEST: {progress}%
        </div>
        <div className="bg-gray-700 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-cyan-500 to-green-400 h-2 rounded-full transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </>
  );
}