export const resumeData = {
  intro: {
    name: "Kritika Singh",
    title: "Software Development Engineer",
    tagline: "Crafting solutions with purpose & perspective • ML enthusiast • Currently @Deloitte",
  },

  skills: [
    { name: "React",       level: 75, color: "#61DAFB" , usedIn: "UniDoc, Weather Dashboard, Ascendons Internship",},
    { name: "Java & JavaScript",      level: 85, color: "#FFD700",  usedIn: "Bank Management System, Ascendons Internship, UniDoc & Weather Dashboard", },
    { name: "C++",        level: 80, color: "#FF6B35" , usedIn: "Data Structures & Algorithms, Competitive Programming",},
    { name: "TypeScript",  level: 70, color: "#3178C6" , usedIn: "UniDoc, Ascendons Internship",},
    { name: "Python & SQL",         level: 75, color: "#00599C" , usedIn: "Vision Assistant (YOLOv8)",},
  ],

  projects: [
    {
      name: "UniDoc",
      description: "Serverless document management platform using React, TypeScript & Firebase with rich text editing, secure auth and dual format export (PDF/DOCX).",
      tech: ["React", "TypeScript", "Firebase"],
      link: "https://github.com/Kritikaxx/MajorProject",
    },
    {
      name: "Vision Assistant",
      description: "Deep learning object detection system using YOLOv8 with Multi-Objective Optimization, OpenCV integration for real-time assistive vision.",
      tech: ["Python", "YOLOv8", "OpenCV"],
      link: "https://github.com/anushree0218/Detection",
    },
    {
      name: "Weather Dashboard",
      description: "Real-time weather app with city search, dynamic UI, theme toggling, animated loading states and auto location detection via OpenWeatherMap API.",
      tech: ["React", "OpenWeatherMap API"],
      link: "https://github.com/Kritikaxx/Weather-app",
    },
  ],

  education: [
    {
      degree: "B.Tech-Information Technology",
      school: "KIIT, Bhubaneswar",
      year: "2022-2026",
      grade: "CGPA: 8.76",
    },
    {
      degree: "Class 12 (PCM)",
      school: "Loyola School, Jamshedpur",
      year: "2020-2022",
      grade: "75.5%",
    },
    {
      degree: "Class 10",
      school: "Loyola School, Jamshedpur",
      year: "2020",
      grade: "92.2%",
    },
  ],

  achievements: [
    { title: "Enactus India Nationals",  org: "1st Place- Project Vistaar 2024",       icon: "🥇" },
    { title: "Flipkart GRID 7.0",        org: "National Semi-Finalist",                  icon: "🏆" },
    { title: "HULT Prize 2024",          org: "3rd Place- Project Encube",              icon: "🥉" },
  ],

  contact: {
    email:    "kritika2311singh@gmail.com",
    github:   "https://github.com/Kritikaxx",
    linkedin: "https://www.linkedin.com/in/kritikasingh23",
    phone:    "+91-8092664001",
  },

  quizzes: {
    intro: {
      id: "q_intro",
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correct: 1,
    },
    contact: {
      id: "q_contact",
      question: "What galaxy do we live in?",
      options: ["Andromeda", "Triangulum", "Milky Way", "Whirlpool"],
      correct: 2,
    },
  },
};