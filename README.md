# Resume Quest 
### An interactive 3D resume experience — Kritika Singh

Instead of a traditional resume page, this is a space-themed 3D world where you explore my professional journey zone by zone, beat mini-games to unlock each section, and collect points along the way.
Built with React Three Fiber (Three.js), deployed on Vercel.

---

## Live Demo
🔗 [your-vercel-url.vercel.app](https://game-resume-virid.vercel.app/)

---

## How It Works

You land on a space station. Each section of my resume — Skills, Projects, Education, Experience, Achievements, Contact — is its own 3D zone floating in space. To move to the next zone you have to beat a mini-game. Click on the 3D objects in each zone to read the actual resume content.

---

## Controls

| Action | How |
|---|---|
| Look around | Click and drag the mouse |
| Navigate zones | Click the zone buttons at the top |
| Read resume info | Click any glowing 3D object |
| Unlock next zone | Hit the game button and win |

---

## Resume Sections

| Zone | What's Inside |
|---|---|
| Intro | Who I am |
| Skills | Tech stack with proficiency levels |
| Projects | UniDoc, Vision Assistant, Weather Dashboard |
| Education | KIIT + Loyola School |
| Experience | Tata Steel, Ascendons, Deloitte |
| Achievements | Enactus, Flipkart GRID, HULT Prize |
| Contact | Email, GitHub, LinkedIn |

---

## Mini-Games (one per zone)

- **Intro** — Space Quiz
- **Skills** — Memory Card Match
- **Projects** — Tic Tac Toe vs Computer
- **Education** — Rock Paper Scissors
- **Experience** — Speed Typing with WPM score
- **Achievements** — Word Scramble
- **Contact** — Space Quiz

Each game gives points. Your final score is graded S / A / B / C on the results screen.

---

## Tech Stack

- **React + Vite** — project foundation
- **React Three Fiber** — Three.js in React
- **@react-three/drei** — 3D helpers (Text, shapes, Stars, Environment)
- **Zustand** — game state management
- **Tailwind CSS** — all UI styling

---

## Run Locally

```bash
git clone https://github.com/Kritikaxx/game-resume
cd game-resume
npm install
npm run dev
```
Opens at `http://localhost:5173`

---

## Project Structure
src/
├── components/
│   ├── scenes/       # 7 x 3D zone rooms
│   ├── games/        # 7 x mini-games
│   └── hud/          # UI overlays
├── store/            # Zustand game state
└── data/             # Resume content

---

*Submitted as part of the Interactive 3D Resume individual assignment.*
*Kritika Singh · kritika2311singh@gmail.com*