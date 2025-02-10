// src/constants/gameData.ts

export const LEVELS = {
  1: {
    name: "Basic Info",
    targets: [
      {
        id: "name",
        info: "Avdhoot Fulsundar",
        type: "basic",
        points: 100,
      },
      {
        id: "role",
        info: "Full Stack Developer",
        type: "basic",
        points: 100,
      },
      {
        id: "education",
        info: "VIT Pune - AI and Data Science",
        type: "basic",
        points: 100,
      },
    ],
  },
  2: {
    name: "Skills Arena",
    targets: [
      {
        id: "cpp",
        info: "C++",
        type: "skill",
        points: 150,
      },
      {
        id: "python",
        info: "Python",
        type: "skill",
        points: 150,
      },
      {
        id: "javascript",
        info: "JavaScript",
        type: "skill",
        points: 150,
      },
      {
        id: "react",
        info: "React & Next.js",
        type: "skill",
        points: 200,
      },
    ],
  },
  3: {
    name: "Projects Showdown",
    targets: [
      {
        id: "secure-data",
        info: "Secure data in images using AES algorithm",
        type: "project",
        points: 300,
      },
      {
        id: "code-explainer",
        info: "CodeExplainer - AI-powered code explanation tool",
        type: "project",
        points: 300,
      },
      {
        id: "code-test-forge",
        info: "CodeTestForge - Automated test case generator",
        type: "project",
        points: 300,
      },
    ],
  },
};

export const WEAPONS = {
  react: {
    name: "React Beam",
    damage: 30,
    speed: 8,
    color: "blue",
    special: "Chain reaction effect",
  },
  python: {
    name: "Python Striker",
    damage: 25,
    speed: 6,
    color: "green",
    special: "Splits into multiple projectiles",
  },
  javascript: {
    name: "JS Blaster",
    damage: 20,
    speed: 10,
    color: "yellow",
    special: "Rapid fire",
  },
  cpp: {
    name: "C++ Cannon",
    damage: 40,
    speed: 5,
    color: "red",
    special: "High damage",
  },
};

export const POWERUPS = {
  framework: {
    name: "Framework Boost",
    duration: 5000,
    effect: "Increased damage",
  },
  database: {
    name: "Database Shield",
    duration: 3000,
    effect: "Temporary invincibility",
  },
  git: {
    name: "Git Checkpoint",
    effect: "Save progress",
  },
};
