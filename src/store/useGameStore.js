import { create } from 'zustand';

const ZONES = ['intro', 'skills', 'projects', 'education', 'achievements', 'contact'];

export const useGameStore = create((set, get) => ({
  gameStarted: false,
  currentZone: 'intro',
  visitedZones: [],
  collectedBadges: [],
  activeCard: null,
  showFinal: false,
  score: 0,

  startGame: () => set({ gameStarted: true }),

  goToZone: (zone) => {
    const { visitedZones, score } = get();
    const isNew = !visitedZones.includes(zone);
    set({
      currentZone: zone,
      visitedZones: isNew ? [...visitedZones, zone] : visitedZones,
      score: isNew ? score + 100 : score,
    });
    // Show final screen if all zones visited
    const newVisited = isNew ? [...visitedZones, zone] : visitedZones;
    if (newVisited.length === ZONES.length) {
      setTimeout(() => set({ showFinal: true }), 1000);
    }
  },

  collectBadge: (badge) => {
    const { collectedBadges, score } = get();
    if (!collectedBadges.includes(badge)) {
      set({ collectedBadges: [...collectedBadges, badge], score: score + 50 });
    }
  },

  setActiveCard: (card) => set({ activeCard: card }),
  closeCard: () => set({ activeCard: null }),
  closeFinal: () => set({ showFinal: false }),
}));