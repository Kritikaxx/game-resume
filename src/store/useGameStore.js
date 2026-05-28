import { create } from 'zustand';

export const ZONES = ['intro', 'skills', 'projects', 'education', 'achievements', 'contact'];

export const useGameStore = create((set, get) => ({
  gameStarted: false,
  currentZone: 'intro',
  visitedZones: [],
  unlockedZones: ['intro'],   
  clearedZones: [],           
  activeCard: null,
  showFinal: false,
  score: 0,
  cameraTarget: [0, 0, 0],
  cameraZoomed: false,        
  activeGame: null,
  collectedBadges: [],            

  startGame: () => set({ gameStarted: true, activeGame: null }),

  goToZone: (zone) => {
    const { unlockedZones, visitedZones } = get();
  if (!unlockedZones.includes(zone)) return;

  const zoneIndex = ZONES.indexOf(zone);
  const isNew = !visitedZones.includes(zone);

  set({
    currentZone: zone,
    cameraTarget: [zoneIndex * 14, 0, 0],
    cameraZoomed: false,
    visitedZones: isNew ? [...visitedZones, zone] : visitedZones,
    activeGame: null,   //never auto opens game on zone entry
  });
  },

  zoomIntoZone: () => set({ cameraZoomed: true }),
  zoomOut: () => set({ cameraZoomed: false }),

  clearZone: (zone, points) => {
    const { clearedZones, unlockedZones, score } = get();
    if (clearedZones.includes(zone)) return;

    const zoneIndex = ZONES.indexOf(zone);
    const nextZone = ZONES[zoneIndex + 1];
    const newCleared = [...clearedZones, zone];
    const newUnlocked = nextZone
      ? [...new Set([...unlockedZones, nextZone])]
      : unlockedZones;

    const allDone = newCleared.length === ZONES.length;

    set({
      clearedZones: newCleared,
      unlockedZones: newUnlocked,
      score: score + points,
      activeGame: null,
      activeCard: allDone ? null : null,
      showFinal: allDone,
    });
  },

  openInfoCard: (card) => set({ activeCard: card, cameraZoomed: true }),
  closeCard: () => set({ activeCard: null, cameraZoomed: false }),
  setActiveGame: (game) => set({ activeGame: game }),
  closeGame: () => set({ activeGame: null }),
  setActiveCard: (card) => set({ activeCard: card }),
  addScore: (pts) => set(s => ({ score: s.score + pts })),
  closeFinal: () => set({
    gameStarted: false,
    currentZone: 'intro',
    visitedZones: [],
    unlockedZones: ['intro'],
    clearedZones: [],
    activeCard: null,
    showFinal: false,
    score: 0,
    cameraTarget: [0, 0, 0],
    cameraZoomed: false,
    activeGame: null,
    collectedBadges: [],  
  }),
}));