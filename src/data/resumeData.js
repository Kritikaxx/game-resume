export const resumeData = {
  intro: {
    name: "Your Name",
    title: "Full Stack Developer",
    tagline: "Building things that matter",
  },
  skills: [
    { name: "React",   level: 90, color: "#61DAFB" },
    { name: "Node.js", level: 80, color: "#68A063" },
    { name: "Three.js",level: 70, color: "#FF6B6B" },
    { name: "Python",  level: 75, color: "#FFD700" },
    { name: "MongoDB", level: 65, color: "#4DB33D" },
  ],
  projects: [
    {
      name: "Project Alpha",
      description: "A web app that does amazing things",
      tech: ["React", "Node.js", "MongoDB"],
      link: "https://github.com/yourname/project-alpha",
    },
    {
      name: "Project Beta",
      description: "An AI-powered tool",
      tech: ["Python", "FastAPI"],
      link: "https://github.com/yourname/project-beta",
    },
    {
      name: "Project Gamma",
      description: "Mobile-first e-commerce platform",
      tech: ["React Native", "Firebase"],
      link: "https://github.com/yourname/project-gamma",
    },
  ],
  education: [
    { degree: "B.Tech Computer Science", school: "Your University", year: "2022–2026", grade: "8.5 CGPA" },
    { degree: "Class 12 (PCM)",          school: "Your School",     year: "2022",      grade: "92%" },
  ],
  achievements: [
    { title: "Hackathon Winner",       org: "TechFest 2024", icon: "🏆" },
    { title: "AWS Cloud Practitioner", org: "Amazon",        icon: "☁️" },
    { title: "React Developer Cert",   org: "Meta",          icon: "📜" },
  ],
  contact: {
    email: "you@email.com",
    github: "https://github.com/yourname",
    linkedin: "https://linkedin.com/in/yourname",
    phone: "+91-XXXXXXXXXX",
  },

  // ── Quiz questions per zone (used for scoring game) ──────────────────────
  quizzes: {
    intro: {
      id: "q_intro",
      question: "What is my primary role?",
      options: ["UI Designer", "Full Stack Developer", "Data Scientist", "DevOps Engineer"],
      correct: 1,
    },
    skills: {
      id: "q_skills",
      question: "Which frontend library do I use most?",
      options: ["Vue.js", "Angular", "React", "Svelte"],
      correct: 2,
    },
    projects: {
      id: "q_projects",
      question: "Which database did I use in Project Alpha?",
      options: ["PostgreSQL", "MongoDB", "Firebase", "SQLite"],
      correct: 1,
    },
    education: {
      id: "q_education",
      question: "What is my current CGPA?",
      options: ["7.5", "9.0", "8.5", "8.0"],
      correct: 2,
    },
    achievements: {
      id: "q_achievements",
      question: "Which cloud certification do I hold?",
      options: ["Google Cloud", "Azure", "AWS", "IBM Cloud"],
      correct: 2,
    },
    contact: {
      id: "q_contact",
      question: "Where can you find my open source work?",
      options: ["Dribbble", "Behance", "GitHub", "GitLab"],
      correct: 2,
    },
  },
};