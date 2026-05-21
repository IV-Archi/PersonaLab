export interface QuizHistoryItem {
  topic: string;
  date: string;
  score: number;
  subject: string;
}

export interface TopicProgress {
  name: string;
  subject: string;
  score: number;
}

export interface UserStats {
  name: string;
  xp: number;
  streak: number;
  level: number;
  completedLessons: number;
  totalLessons: number;
  weeklyGoal: number;
  weeklyCompleted: number;
  todayPlan: { id: number; title: string; subject: string; duration: string; done: boolean }[];
  weeklyProgress: number[];
  subjectProgress: Record<string, number>;
  weakTopics: TopicProgress[];
  strongTopics: TopicProgress[];
  recentQuizzes: QuizHistoryItem[];
  badges: string[];
}

const DEFAULT_STATS: UserStats = {
  name: 'Arman',
  xp: 320,
  streak: 4,
  level: 3,
  completedLessons: 12,
  totalLessons: 30,
  weeklyGoal: 5,
  weeklyCompleted: 3,
  todayPlan: [
    { id: 1, title: 'Solve 5 Quadratic Equations', subject: 'Math', duration: '15 mins', done: false },
    { id: 2, title: 'Read Photosynthesis outline', subject: 'Science', duration: '10 mins', done: true },
    { id: 3, title: 'Review Essay outlines with AI', subject: 'English', duration: '20 mins', done: false },
  ],
  weeklyProgress: [40, 60, 50, 70, 0, 0, 0],
  subjectProgress: {
    Math: 65,
    English: 85,
    Science: 72,
    History: 90,
    Geography: 45,
    Economics: 30
  },
  weakTopics: [
    { name: 'Fractions & Ratios', subject: 'Math', score: 45 },
    { name: 'Demand & Supply curves', subject: 'Economics', score: 30 },
    { name: 'Climate Zones', subject: 'Geography', score: 48 },
  ],
  strongTopics: [
    { name: 'World War II', subject: 'History', score: 92 },
    { name: 'Verb Tenses', subject: 'English', score: 88 },
  ],
  recentQuizzes: [
    { topic: 'Verb Conjugation', date: 'Yesterday', score: 90, subject: 'English' },
    { topic: 'Basic Fractions', date: '2 days ago', score: 45, subject: 'Math' },
    { topic: 'Global Warming', date: '3 days ago', score: 75, subject: 'Science' },
  ],
  badges: ['streak3', 'honestLearner']
};

export function getLocalStats(): UserStats {
  if (typeof window === 'undefined') return DEFAULT_STATS;
  try {
    const data = localStorage.getItem('pl-user-stats');
    if (data) {
      return JSON.parse(data);
    }
    localStorage.setItem('pl-user-stats', JSON.stringify(DEFAULT_STATS));
    return DEFAULT_STATS;
  } catch {
    return DEFAULT_STATS;
  }
}

export function saveLocalStats(stats: UserStats) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('pl-user-stats', JSON.stringify(stats));
  } catch (e) {
    console.error(e);
  }
}

export function addXP(amount: number): UserStats {
  const stats = getLocalStats();
  stats.xp += amount;
  
  // Quick level up math
  const newLevel = Math.floor(stats.xp / 150) + 1;
  if (newLevel > stats.level) {
    stats.level = newLevel;
  }

  saveLocalStats(stats);
  return stats;
}

export function completeTodayTask(id: number): UserStats {
  const stats = getLocalStats();
  const task = stats.todayPlan.find(t => t.id === id);
  if (task && !task.done) {
    task.done = true;
    stats.xp += 30; // Bonus XP
    stats.weeklyCompleted = Math.min(stats.weeklyGoal, stats.weeklyCompleted + 1);
    stats.completedLessons += 1;
    saveLocalStats(stats);
  }
  return stats;
}

export function addQuizResult(topic: string, subject: string, score: number): UserStats {
  const stats = getLocalStats();
  const newItem: QuizHistoryItem = {
    topic,
    subject,
    score,
    date: 'Today'
  };
  stats.recentQuizzes.unshift(newItem);
  if (stats.recentQuizzes.length > 5) stats.recentQuizzes.pop();

  // Update subject progress based on score
  if (stats.subjectProgress[subject] !== undefined) {
    stats.subjectProgress[subject] = Math.round((stats.subjectProgress[subject] * 2 + score) / 3);
  }

  // Adjust weak and strong lists
  if (score >= 80) {
    stats.strongTopics = stats.strongTopics.filter(t => t.name !== topic);
    stats.strongTopics.push({ name: topic, subject, score });
    stats.weakTopics = stats.weakTopics.filter(t => t.name !== topic);
    stats.xp += 50; // Performance XP
  } else if (score < 60) {
    stats.weakTopics = stats.weakTopics.filter(t => t.name !== topic);
    stats.weakTopics.push({ name: topic, subject, score });
    stats.strongTopics = stats.strongTopics.filter(t => t.name !== topic);
    stats.xp += 10;
  } else {
    stats.xp += 25;
  }

  // Double check honest badges if student completes quiz without issues
  if (!stats.badges.includes('mathMaster') && subject === 'Math' && score >= 90) {
    stats.badges.push('mathMaster');
  }

  saveLocalStats(stats);
  return stats;
}
