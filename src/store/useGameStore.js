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
  cameraTarget: [0, 0, 0],
  quizActive: false,
  quizQuestion: null,
  quizAnswered: [],

  startGame: () => set({ gameStarted: true }),

  goToZone: (zone) => {
    const { visitedZones } = get();
    const isNew = !visitedZones.includes(zone);
    const zoneIndex = ZONES.indexOf(zone);
    set({
      currentZone: zone,
      visitedZones: isNew ? [...visitedZones, zone] : visitedZones,
      cameraTarget: [zoneIndex * 12, 0, 0],
    });
    const newVisited = isNew ? [...visitedZones, zone] : visitedZones;
    if (newVisited.length === ZONES.length) {
      setTimeout(() => set({ showFinal: true }), 1500);
    }
  },

  collectBadge: (badge, points = 50) => {
    const { collectedBadges, score } = get();
    if (!collectedBadges.includes(badge)) {
      set({ collectedBadges: [...collectedBadges, badge], score: score + points });
    }
  },

  addScore: (points) => set(s => ({ score: s.score + points })),

  setActiveCard: (card) => set({ activeCard: card }),
  closeCard: () => set({ activeCard: null }),

  startQuiz: (question) => set({ quizActive: true, quizQuestion: question }),
  answerQuiz: (correct, questionId) => {
    const { quizAnswered, score } = get();
    if (quizAnswered.includes(questionId)) return;
    set({
      quizAnswered: [...quizAnswered, questionId],
      score: correct ? score + 150 : score,
      quizActive: false,
      quizQuestion: null,
    });
  },
  closeQuiz: () => set({ quizActive: false, quizQuestion: null }),

  closeFinal: () => set({ showFinal: false }),
}));