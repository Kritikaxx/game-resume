import { useGameStore, ZONES } from '../../store/useGameStore';

const ICONS = { intro:'👤', skills:'⭐', projects:'🚀', education:'🎓', experience:'💼', achievements:'🏆', contact:'📬' };
const GAME_LABEL = {
  intro: 'Space Quiz', skills: 'Memory Match', projects: 'Tic Tac Toe',
  education: 'Rock Paper Scissors', experience: 'Speed Typing', achievements: 'Word Scramble', contact: 'Space Quiz',
};

export default function HUD() {
  const { currentZone, clearedZones, unlockedZones, score, goToZone, setActiveGame } = useGameStore();
  const progress  = Math.round((clearedZones.length / ZONES.length) * 100);
  const isCleared = clearedZones.includes(currentZone);

  const GAME_KEY = {
    intro: 'quiz_intro', skills: 'memory', projects: 'tictactoe',
    education: 'rps', experience: 'typing', achievements: 'scramble', contact: 'quiz_contact',
  };

  return (
    <>
      {/* Zone nav */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 flex gap-2 bg-black/50 backdrop-blur-sm px-3 py-2 rounded-full">
        {ZONES.map(zone => {
          const cleared  = clearedZones.includes(zone);
          const unlocked = unlockedZones.includes(zone);
          const active   = currentZone === zone;
          return (
            <button key={zone} onClick={() => goToZone(zone)} disabled={!unlocked}
              title={!unlocked ? '🔒 Complete previous zone first' : zone}
              className={`flex flex-col items-center px-3 py-1 rounded-full text-xs font-bold transition-all duration-200 ${
                active    ? 'bg-cyan-400 text-black scale-110 shadow-lg shadow-cyan-400/40'
                : cleared  ? 'bg-green-700 text-white hover:bg-green-600'
                : unlocked ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                :            'bg-gray-900 text-gray-600 cursor-not-allowed opacity-50'
              }`}>
              <span>{cleared ? '✅' : unlocked ? ICONS[zone] : '🔒'}</span>
              <span className="mt-0.5">{zone.toUpperCase()}</span>
            </button>
          );
        })}
      </div>

      {/* Score */}
      <div className="absolute top-4 right-4 z-40 bg-black/70 backdrop-blur-sm text-white px-4 py-3 rounded-xl">
        <div className="text-cyan-400 font-bold text-lg">⭐ {score} pts</div>
        <div className="text-gray-400 text-xs">{clearedZones.length}/6 zones cleared</div>
      </div>

      {/* Controls hint */}
      <div className="absolute bottom-20 left-4 z-40 text-gray-500 text-xs space-y-1">
        <p>🖱️ <span className="text-gray-400">Drag</span> to look around 360°</p>
        <p>🖱️ <span className="text-gray-400">Click objects</span> to view info</p>
        <p>🎮 <span className="text-gray-400">Press button below</span> when ready</p>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 w-72">
        <div className="text-white text-xs text-center mb-1 font-bold tracking-widest">
          {ICONS[currentZone]} {currentZone.toUpperCase()} · PROGRESS {progress}%
        </div>
        <div className="bg-gray-800 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-cyan-500 to-green-400 h-2 rounded-full transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Unlock button — shown only if zone not yet cleared */}
      {!isCleared && (
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-40">
          <button
            onClick={() => setActiveGame(GAME_KEY[currentZone])}
            className="px-6 py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-full text-sm shadow-lg shadow-yellow-500/30 animate-pulse"
          >
            🎮 {GAME_LABEL[currentZone]} — Unlock Next Zone
          </button>
        </div>
      )}
      {isCleared && (
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-40">
          <div className="px-6 py-2 bg-green-800 text-green-300 font-bold rounded-full text-sm">
            ✅ Zone Cleared!
          </div>
        </div>
      )}
    </>
  );
}