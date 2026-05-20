/* ============================================
   PERSONA LAB — AI Service (Mock)
   Ready to connect with real AI API later
   ============================================ */

export interface ExplanationResult {
  explanation: string;
  example: string;
  practiceQuestion: string;
}

export interface PracticeQuestion {
  id: number;
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: string;
}

export interface AnswerFeedback {
  isCorrect: boolean;
  feedback: string;
  explanation: string;
  hint: string;
  similarQuestion?: string;
}

export interface Recommendation {
  action: 'repeat' | 'advance' | 'practice';
  topic: string;
  reason: string;
  difficulty: string;
}

export interface LevelResult {
  level: 'beginner' | 'intermediate' | 'advanced';
  score: number;
  strengths: string[];
  weaknesses: string[];
}

// --- AI Explanation Engine ---
export function explainTopic(
  topic: string,
  studentLevel: string,
  language: string
): ExplanationResult {
  const explanations: Record<string, ExplanationResult> = {
    'fractions': {
      explanation: "A fraction shows a part of a whole. Think of a pizza. If you cut it into 4 equal slices and eat 1 slice, you ate 1/4 of the pizza. The top number (numerator) tells how many parts you have. The bottom number (denominator) tells how many equal parts the whole is divided into.",
      example: "Imagine a chocolate bar with 8 pieces. You eat 3 pieces. You ate 3/8 of the chocolate bar. 3 is the numerator, 8 is the denominator.",
      practiceQuestion: "A cake is cut into 6 equal pieces. You eat 2 pieces. What fraction of the cake did you eat?"
    },
    'equations': {
      explanation: "An equation is like a balance scale. Both sides must be equal. When you see 2x + 5 = 15, your job is to find what number x is. You do this by moving numbers to the other side, step by step.",
      example: "Let's solve 2x + 5 = 15:\nStep 1: Move 5 to the other side → 2x = 15 - 5 → 2x = 10\nStep 2: Divide both sides by 2 → x = 10 ÷ 2 → x = 5\nCheck: 2(5) + 5 = 15 ✓",
      practiceQuestion: "Try this one: 3x + 4 = 13. What is x?"
    },
    'photosynthesis': {
      explanation: "Photosynthesis is how plants make their own food. Plants take in sunlight, water, and carbon dioxide (CO₂) and turn them into glucose (sugar) and oxygen. It happens in the leaves, in tiny parts called chloroplasts.",
      example: "Think of it like cooking: Sunlight is the stove, water and CO₂ are the ingredients, and glucose is the meal. Oxygen is like the steam that comes out — we breathe it!",
      practiceQuestion: "What are the three things a plant needs to make food through photosynthesis?"
    },
    'gravity': {
      explanation: "Gravity is a force that pulls objects toward each other. The bigger an object, the stronger its gravity. Earth's gravity is what keeps us on the ground and makes things fall when we drop them.",
      example: "When you throw a ball up, gravity pulls it back down. The Moon has less gravity than Earth — that's why astronauts can jump so high on the Moon!",
      practiceQuestion: "Why do astronauts float in space? Is it because there is no gravity, or because they are falling around Earth?"
    },
  };

  const defaultExplanation: ExplanationResult = {
    explanation: `Let me explain ${topic} in a simple way. This topic is about understanding the core concept and applying it to real-world examples. We'll break it down step by step so it's easy to follow.`,
    example: `Here's a real-life example of ${topic} that you might encounter in everyday life. Understanding this connection helps make the concept stick.`,
    practiceQuestion: `Based on what we just learned about ${topic}, can you explain the main idea in your own words?`
  };

  return explanations[topic.toLowerCase()] || defaultExplanation;
}

// --- AI Quiz Generator ---
export function generatePractice(
  subject: string,
  topic: string,
  difficulty: string,
  language: string
): PracticeQuestion[] {
  const mathQuestions: PracticeQuestion[] = [
    {
      id: 1,
      question: "What is 3/4 + 1/4?",
      options: ["1", "2/4", "4/8", "3/4"],
      correctAnswer: "1",
      explanation: "When fractions have the same denominator, just add the numerators: 3 + 1 = 4. So 4/4 = 1.",
      difficulty: "easy"
    },
    {
      id: 2,
      question: "Solve for x: 5x - 3 = 12",
      options: ["x = 2", "x = 3", "x = 5", "x = 15"],
      correctAnswer: "x = 3",
      explanation: "Add 3 to both sides: 5x = 15. Divide by 5: x = 3. Check: 5(3) - 3 = 12 ✓",
      difficulty: "medium"
    },
    {
      id: 3,
      question: "What is the area of a rectangle with length 8 cm and width 5 cm?",
      options: ["13 cm²", "26 cm²", "40 cm²", "80 cm²"],
      correctAnswer: "40 cm²",
      explanation: "Area of a rectangle = length × width = 8 × 5 = 40 cm²",
      difficulty: "easy"
    },
    {
      id: 4,
      question: "What is 15% of 200?",
      options: ["15", "20", "30", "35"],
      correctAnswer: "30",
      explanation: "15% means 15/100. So 15/100 × 200 = 30.",
      difficulty: "medium"
    },
    {
      id: 5,
      question: "If a triangle has angles of 60° and 80°, what is the third angle?",
      options: ["20°", "40°", "60°", "100°"],
      correctAnswer: "40°",
      explanation: "All angles in a triangle add up to 180°. So 180 - 60 - 80 = 40°.",
      difficulty: "easy"
    },
  ];

  const scienceQuestions: PracticeQuestion[] = [
    {
      id: 1,
      question: "What gas do plants release during photosynthesis?",
      options: ["Carbon dioxide", "Nitrogen", "Oxygen", "Hydrogen"],
      correctAnswer: "Oxygen",
      explanation: "During photosynthesis, plants absorb CO₂ and release O₂ (oxygen) as a byproduct.",
      difficulty: "easy"
    },
    {
      id: 2,
      question: "What is the powerhouse of the cell?",
      options: ["Nucleus", "Ribosome", "Mitochondria", "Chloroplast"],
      correctAnswer: "Mitochondria",
      explanation: "Mitochondria generate most of the cell's supply of ATP, which is used as energy.",
      difficulty: "easy"
    },
    {
      id: 3,
      question: "What force keeps planets orbiting around the Sun?",
      options: ["Magnetic force", "Gravity", "Friction", "Nuclear force"],
      correctAnswer: "Gravity",
      explanation: "Gravity is the force that pulls objects with mass toward each other. The Sun's gravity keeps Earth and other planets in orbit.",
      difficulty: "easy"
    },
    {
      id: 4,
      question: "Water boils at what temperature (in Celsius)?",
      options: ["50°C", "75°C", "100°C", "200°C"],
      correctAnswer: "100°C",
      explanation: "At sea level, water boils at 100°C (212°F).",
      difficulty: "easy"
    },
    {
      id: 5,
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correctAnswer: "Mars",
      explanation: "Mars appears red because of iron oxide (rust) on its surface.",
      difficulty: "easy"
    },
  ];

  const englishQuestions: PracticeQuestion[] = [
    {
      id: 1,
      question: "Choose the correct sentence:",
      options: ["She don't like apples.", "She doesn't likes apples.", "She doesn't like apples.", "She not like apples."],
      correctAnswer: "She doesn't like apples.",
      explanation: "With third person singular (she/he/it), we use 'doesn't' + base form of the verb.",
      difficulty: "easy"
    },
    {
      id: 2,
      question: "What is the past tense of 'go'?",
      options: ["goed", "gone", "went", "going"],
      correctAnswer: "went",
      explanation: "'Go' is an irregular verb. Its past simple form is 'went', not 'goed'.",
      difficulty: "easy"
    },
    {
      id: 3,
      question: "Fill in the blank: 'I have been living here ___ 2015.'",
      options: ["for", "since", "from", "at"],
      correctAnswer: "since",
      explanation: "We use 'since' with a specific point in time (2015). We use 'for' with a period of time (5 years).",
      difficulty: "medium"
    },
    {
      id: 4,
      question: "Which word is an adjective?",
      options: ["quickly", "beautiful", "run", "happiness"],
      correctAnswer: "beautiful",
      explanation: "An adjective describes a noun. 'Beautiful' describes things (beautiful day, beautiful person).",
      difficulty: "easy"
    },
    {
      id: 5,
      question: "Choose the correct form: 'If I ___ rich, I would travel.'",
      options: ["am", "was", "were", "be"],
      correctAnswer: "were",
      explanation: "In second conditional (unreal situations), we use 'were' for all subjects: 'If I were...', 'If she were...'",
      difficulty: "medium"
    },
  ];

  const historyQuestions: PracticeQuestion[] = [
    {
      id: 1,
      question: "In what year did World War II end?",
      options: ["1940", "1943", "1945", "1950"],
      correctAnswer: "1945",
      explanation: "WWII ended in 1945. Germany surrendered in May, and Japan surrendered in September after atomic bombs were dropped.",
      difficulty: "easy"
    },
    {
      id: 2,
      question: "Who was the first President of the United States?",
      options: ["Thomas Jefferson", "Abraham Lincoln", "George Washington", "John Adams"],
      correctAnswer: "George Washington",
      explanation: "George Washington served as the first president from 1789 to 1797.",
      difficulty: "easy"
    },
    {
      id: 3,
      question: "The Great Wall of China was primarily built to protect against whom?",
      options: ["Romans", "Mongols", "Japanese", "Persians"],
      correctAnswer: "Mongols",
      explanation: "The Great Wall was built over centuries primarily to protect Chinese states from invasions by northern nomadic groups, especially the Mongols.",
      difficulty: "medium"
    },
    {
      id: 4,
      question: "What ancient civilization built the pyramids at Giza?",
      options: ["Romans", "Greeks", "Egyptians", "Mayans"],
      correctAnswer: "Egyptians",
      explanation: "The pyramids at Giza were built by the ancient Egyptians as tombs for their pharaohs, around 2500 BC.",
      difficulty: "easy"
    },
    {
      id: 5,
      question: "When did Kazakhstan gain independence?",
      options: ["1989", "1990", "1991", "1993"],
      correctAnswer: "1991",
      explanation: "Kazakhstan declared independence on December 16, 1991, following the dissolution of the Soviet Union.",
      difficulty: "easy"
    },
  ];

  const questionMap: Record<string, PracticeQuestion[]> = {
    math: mathQuestions,
    science: scienceQuestions,
    english: englishQuestions,
    history: historyQuestions,
  };

  return questionMap[subject.toLowerCase()] || mathQuestions;
}

// --- AI Answer Checker ---
export function checkAnswer(
  question: string,
  studentAnswer: string,
  correctAnswer: string,
  language: string
): AnswerFeedback {
  const isCorrect = studentAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase();

  if (isCorrect) {
    return {
      isCorrect: true,
      feedback: "Excellent work! 🎉 That's correct!",
      explanation: "You understood the concept well. Keep it up!",
      hint: "You're ready to try a harder question.",
    };
  }

  return {
    isCorrect: false,
    feedback: "Good try, but not quite right.",
    explanation: `The correct answer is "${correctAnswer}". Let me explain why. Look at the key part of the question and think about what concept applies here.`,
    hint: "Try to break the problem into smaller steps. What do you know for sure?",
    similarQuestion: "Try a similar question to practice this concept.",
  };
}

// --- AI Recommendation System ---
export function recommendNextStep(
  studentProgress: Record<string, number>,
  weakTopics: string[]
): Recommendation {
  if (weakTopics.length > 0) {
    return {
      action: 'repeat',
      topic: weakTopics[0],
      reason: `You scored below 70% on ${weakTopics[0]}. Let's review it with simpler examples.`,
      difficulty: 'easy',
    };
  }

  return {
    action: 'advance',
    topic: 'Next chapter',
    reason: "Great job! You're doing well. Time to move to the next topic.",
    difficulty: 'medium',
  };
}

// --- AI Level Detector ---
export function detectLearningLevel(
  quizResults: { score: number; total: number }[]
): LevelResult {
  const totalScore = quizResults.reduce((sum, r) => sum + r.score, 0);
  const totalQuestions = quizResults.reduce((sum, r) => sum + r.total, 0);
  const percentage = totalQuestions > 0 ? (totalScore / totalQuestions) * 100 : 0;

  if (percentage >= 80) {
    return {
      level: 'advanced',
      score: percentage,
      strengths: ['Problem solving', 'Quick learning', 'Application'],
      weaknesses: [],
    };
  } else if (percentage >= 50) {
    return {
      level: 'intermediate',
      score: percentage,
      strengths: ['Basic understanding', 'Effort'],
      weaknesses: ['Complex problems', 'Application'],
    };
  }

  return {
    level: 'beginner',
    score: percentage,
    strengths: ['Willingness to learn'],
    weaknesses: ['Fundamentals', 'Practice needed'],
  };
}

// --- AI Chat Response (for Tutor) ---
export function getAIChatResponse(
  message: string,
  subject: string,
  difficulty: string,
  language: string
): string {
  const lowerMsg = message.toLowerCase();

  if (lowerMsg.includes("don't understand") || lowerMsg.includes("help") || lowerMsg.includes("explain")) {
    return `I'd love to help! Let's break this down together. 😊\n\nInstead of trying to understand everything at once, let's start with the basics. What specific part feels confusing? Is it the concept itself, or applying it to problems?\n\nTell me what you already know, and we'll build from there step by step.`;
  }

  if (lowerMsg.includes("solve") || lowerMsg.includes("answer") || lowerMsg.includes("what is")) {
    return `Great question! But instead of just giving you the answer, let's work through it together — that way you'll really understand it. 💡\n\nWhat do you think the first step should be? Don't worry if you're not sure — take your best guess and I'll guide you from there.`;
  }

  if (lowerMsg.includes("practice") || lowerMsg.includes("quiz") || lowerMsg.includes("test")) {
    return `Let's practice! 📝 I'll give you a question. Try your best, and I'll help if you get stuck.\n\nHere's your question:\nIf a rectangle has a length of 12 cm and a width of 5 cm, what is its perimeter?\n\nTake your time and tell me your answer!`;
  }

  if (lowerMsg.includes("wrong") || lowerMsg.includes("mistake") || lowerMsg.includes("incorrect")) {
    return `No worries at all — mistakes are how we learn! 🌟\n\nLet's look at where things went differently. Can you show me your work or tell me what steps you took? That way I can find exactly where the mix-up happened and help you fix it.`;
  }

  if (lowerMsg.includes("fraction")) {
    return `Let's talk about fractions! 🍕\n\nA fraction represents a part of a whole. Think of it like slicing a pizza:\n- If you cut a pizza into 4 equal pieces and take 1, you have **1/4**\n- The top number (numerator) = pieces you took\n- The bottom number (denominator) = total pieces\n\nNow try this: If there are 8 slices and you eat 3, what fraction did you eat?\n\nType your answer!`;
  }

  if (lowerMsg.includes("equation") || lowerMsg.includes("algebra")) {
    return `Equations are like puzzles! 🧩\n\nThe goal is to find the mystery number (usually x). Think of it as a balance scale — whatever you do to one side, do to the other.\n\nLet's try: **2x + 6 = 14**\n\nStep 1: What should we do first to isolate x?\n(Hint: try to get rid of the +6)\n\nWhat do you think?`;
  }

  return `That's a great question! Let me help you understand this better. 😊\n\nCould you tell me a bit more about what you're working on? For example:\n- What subject is this for?\n- What have you tried so far?\n- Is there a specific part that's confusing?\n\nThe more I know, the better I can help you learn!`;
}

// --- Mock Student Data ---
export const mockStudentData = {
  name: "Alex",
  grade: 8,
  streak: 7,
  level: "Intermediate",
  completedLessons: 24,
  totalLessons: 40,
  weeklyGoal: 5,
  weeklyCompleted: 3,
  todayPlan: [
    { id: 1, title: "Review: Linear Equations", subject: "Math", done: true, duration: "15 min" },
    { id: 2, title: "Practice: Word Problems", subject: "Math", done: false, duration: "20 min" },
    { id: 3, title: "Learn: Photosynthesis", subject: "Science", done: false, duration: "15 min" },
    { id: 4, title: "Quiz: Past Tenses", subject: "English", done: false, duration: "10 min" },
  ],
  weakTopics: [
    { name: "Fractions", subject: "Math", score: 45 },
    { name: "Essay Writing", subject: "English", score: 52 },
    { name: "Chemical Reactions", subject: "Science", score: 58 },
  ],
  strongTopics: [
    { name: "Geometry", subject: "Math", score: 92 },
    { name: "Reading Comprehension", subject: "English", score: 88 },
    { name: "World History", subject: "History", score: 85 },
  ],
  recentQuizzes: [
    { topic: "Algebra Basics", score: 80, total: 100, date: "May 19" },
    { topic: "Grammar Rules", score: 70, total: 100, date: "May 18" },
    { topic: "Cell Biology", score: 90, total: 100, date: "May 17" },
    { topic: "Ancient History", score: 75, total: 100, date: "May 16" },
  ],
  weeklyProgress: [65, 72, 58, 80, 75, 88, 70],
  subjectProgress: {
    Math: 68,
    English: 74,
    Science: 82,
    History: 71,
  },
};

// --- Mock Teacher Data ---
export const mockTeacherData = {
  name: "Ms. Nurlan",
  totalStudents: 28,
  classAverage: 72,
  students: [
    { id: 1, name: "Alex K.", level: "Intermediate", progress: 68, weakTopic: "Fractions", lastActive: "Today" },
    { id: 2, name: "Dana M.", level: "Advanced", progress: 92, weakTopic: "None", lastActive: "Today" },
    { id: 3, name: "Timur S.", level: "Beginner", progress: 45, weakTopic: "Equations", lastActive: "Yesterday" },
    { id: 4, name: "Aisha R.", level: "Intermediate", progress: 74, weakTopic: "Grammar", lastActive: "Today" },
    { id: 5, name: "Nursultan B.", level: "Intermediate", progress: 61, weakTopic: "Essay Writing", lastActive: "2 days ago" },
    { id: 6, name: "Madina T.", level: "Advanced", progress: 88, weakTopic: "None", lastActive: "Today" },
    { id: 7, name: "Arman D.", level: "Beginner", progress: 38, weakTopic: "Basic Math", lastActive: "3 days ago" },
    { id: 8, name: "Kamila Z.", level: "Intermediate", progress: 70, weakTopic: "Science", lastActive: "Today" },
  ],
  classWeakTopics: [
    { topic: "Fractions", studentsStruggling: 12 },
    { topic: "Essay Writing", studentsStruggling: 9 },
    { topic: "Chemical Formulas", studentsStruggling: 7 },
    { topic: "Word Problems", studentsStruggling: 6 },
  ],
};

// --- Mock Parent Data ---
export const mockParentData = {
  parentName: "Mr. Karimov",
  child: {
    name: "Alex",
    grade: 8,
    studiedToday: true,
    streakDays: 7,
    weeklyHours: 4.5,
    overallProgress: 68,
    subjects: [
      { name: "Math", progress: 68, trend: "improving" as const },
      { name: "English", progress: 74, trend: "stable" as const },
      { name: "Science", progress: 82, trend: "improving" as const },
      { name: "History", progress: 71, trend: "declining" as const },
    ],
    recentActivity: [
      { date: "Today", activity: "Completed Algebra quiz (80%)", subject: "Math" },
      { date: "Yesterday", activity: "Practiced Grammar exercises", subject: "English" },
      { date: "May 18", activity: "Learned about Cell Biology (90%)", subject: "Science" },
      { date: "May 17", activity: "Reviewed Ancient History", subject: "History" },
    ],
    recommendations: [
      "Alex should spend more time on Fractions — it's a weak area.",
      "Great improvement in Science! Encourage Alex to keep it up.",
      "Consider reviewing History topics — progress has slowed down.",
      "Alex has been consistent this week. Keep the study streak going!",
    ],
  },
};
