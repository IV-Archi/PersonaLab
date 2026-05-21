/* ============================================
   PERSONA LAB — AI Service (Trilingual & Multi-Subject)
   ============================================ */

export interface ExplanationResult {
  explanation: string;
  example: string;
  practiceQuestion: string;
}

export interface PracticeQuestion {
  id: number;
  type: 'multiple-choice' | 'true-false' | 'short-answer' | 'fill-blank' | 'step-problem' | 'explanation';
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

// --- Multi-Subject, Trilingual Question Bank ---
const QUESTION_BANK: Record<string, Record<string, PracticeQuestion[]>> = {
  math: {
    en: [
      {
        id: 1,
        type: 'multiple-choice',
        question: "What is 3/4 + 1/4?",
        options: ["1", "2/4", "4/8", "3/4"],
        correctAnswer: "1",
        explanation: "When fractions have the same denominator, just add the numerators: 3 + 1 = 4. So 4/4 = 1.",
        difficulty: "easy"
      },
      {
        id: 2,
        type: 'step-problem',
        question: "Solve for x: 5x - 3 = 12. Show the first step value.",
        correctAnswer: "15",
        explanation: "Add 3 to both sides to isolate the variable: 5x = 12 + 3, which is 5x = 15.",
        difficulty: "medium"
      },
      {
        id: 3,
        type: 'true-false',
        question: "A triangle can have two right angles. (True/False)",
        options: ["True", "False"],
        correctAnswer: "False",
        explanation: "The sum of angles in a triangle is 180°. Two right angles would equal 180° alone, leaving 0° for the third angle, which is impossible.",
        difficulty: "easy"
      },
      {
        id: 4,
        type: 'fill-blank',
        question: "The area of a rectangle with length 8 cm and width 5 cm is ___ cm².",
        correctAnswer: "40",
        explanation: "Area of a rectangle = length × width = 8 × 5 = 40.",
        difficulty: "easy"
      },
      {
        id: 5,
        type: 'explanation',
        question: "Explain why dividing by a fraction is the same as multiplying by its reciprocal.",
        correctAnswer: "reciprocal",
        explanation: "Dividing by a number is finding how many times it fits into another. Dividing by 1/2 is asking how many halves are in the whole, which is multiplying by 2 (the reciprocal).",
        difficulty: "hard"
      }
    ],
    ru: [
      {
        id: 1,
        type: 'multiple-choice',
        question: "Чему равно 3/4 + 1/4?",
        options: ["1", "2/4", "4/8", "3/4"],
        correctAnswer: "1",
        explanation: "Если знаменатели одинаковые, просто сложите числители: 3 + 1 = 4. Получается 4/4 = 1.",
        difficulty: "easy"
      },
      {
        id: 2,
        type: 'step-problem',
        question: "Решите уравнение: 5x - 3 = 12. Чему равна правая часть после первого шага?",
        correctAnswer: "15",
        explanation: "Прибавьте 3 к обеим частям уравнения: 5x = 12 + 3, следовательно, 5x = 15.",
        difficulty: "medium"
      },
      {
        id: 3,
        type: 'true-false',
        question: "У треугольника может быть два прямых угла. (Верно/Неверно)",
        options: ["Верно", "Неверно"],
        correctAnswer: "Неверно",
        explanation: "Сумма углов треугольника равна 180°. Два прямых угла уже составят 180°, что невозможно.",
        difficulty: "easy"
      },
      {
        id: 4,
        type: 'fill-blank',
        question: "Площадь прямоугольника со сторонами 8 см и 5 см равна ___ см².",
        correctAnswer: "40",
        explanation: "Площадь прямоугольника = длина × ширина = 8 × 5 = 40.",
        difficulty: "easy"
      },
      {
        id: 5,
        type: 'explanation',
        question: "Объясните, почему деление на дробь равносильно умножению на обратную дробь.",
        correctAnswer: "обратную дробь",
        explanation: "Деление на 1/2 показывает, сколько половин содержится в целом, что эквивалентно умножению на 2.",
        difficulty: "hard"
      }
    ],
    kz: [
      {
        id: 1,
        type: 'multiple-choice',
        question: "3/4 + 1/4 неге тең?",
        options: ["1", "2/4", "4/8", "3/4"],
        correctAnswer: "1",
        explanation: "Бөлімдері бірдей болса, алымдарын қосамыз: 3 + 1 = 4. Сонда 4/4 = 1 болады.",
        difficulty: "easy"
      },
      {
        id: 2,
        type: 'step-problem',
        question: "Теңдеуді шешіңіз: 5x - 3 = 12. Бірінші қадамнан кейінгі оң жақ мәні неге тең?",
        correctAnswer: "15",
        explanation: "Теңдеудің екі жағына да 3-ті қосамыз: 5x = 12 + 3, яғни 5x = 15.",
        difficulty: "medium"
      },
      {
        id: 3,
        type: 'true-false',
        question: "Үшбұрышта екі тік бұрыш болуы мүмкін бе? (Иә/Жоқ)",
        options: ["Иә", "Жоқ"],
        correctAnswer: "Жоқ",
        explanation: "Үшбұрыштың ішкі бұрыштарының қосындысы 180° тең. Екі тік бұрыш 180°-ты құрап қояды, бұл мүмкін емес.",
        difficulty: "easy"
      },
      {
        id: 4,
        type: 'fill-blank',
        question: "Ұзындығы 8 см және ені 5 см тік төртбұрыштың ауданы ___ см² тең.",
        correctAnswer: "40",
        explanation: "Тік төртбұрыштың ауданы = ұзындығы × ені = 8 × 5 = 40.",
        difficulty: "easy"
      },
      {
        id: 5,
        type: 'explanation',
        question: "Неліктен бөлшекке бөлу оның кері бөлшегіне көбейтумен бірдей екенін түсіндіріңіз.",
        correctAnswer: "кері бөлшек",
        explanation: "Санды 1/2-ге бөлу оның ішінде қанша жарты барын табу деген сөз, бұл 2-ге көбейтумен тең.",
        difficulty: "hard"
      }
    ]
  },
  english: {
    en: [
      {
        id: 1,
        type: 'multiple-choice',
        question: "Choose the correct sentence:",
        options: ["She don't like apples.", "She doesn't likes apples.", "She doesn't like apples.", "She not like apples."],
        correctAnswer: "She doesn't like apples.",
        explanation: "With third person singular (she/he/it), we use 'doesn't' + base form of the verb.",
        difficulty: "easy"
      },
      {
        id: 2,
        type: 'fill-blank',
        question: "Write the past simple form of 'go':",
        correctAnswer: "went",
        explanation: "'Go' is an irregular verb. Its past simple form is 'went'.",
        difficulty: "easy"
      },
      {
        id: 3,
        type: 'true-false',
        question: "In English, adjectives usually come before nouns. (True/False)",
        options: ["True", "False"],
        correctAnswer: "True",
        explanation: "Adjectives describe the noun and generally precede it (e.g., 'a blue sky').",
        difficulty: "easy"
      }
    ],
    ru: [
      {
        id: 1,
        type: 'multiple-choice',
        question: "Выберите правильное предложение:",
        options: ["She don't like apples.", "She doesn't likes apples.", "She doesn't like apples.", "She not like apples."],
        correctAnswer: "She doesn't like apples.",
        explanation: "С третьим лицом единственного числа (she/he/it) мы используем 'doesn't' + начальную форму глагола.",
        difficulty: "easy"
      },
      {
        id: 2,
        type: 'fill-blank',
        question: "Напишите прошедшую форму глагола 'go':",
        correctAnswer: "went",
        explanation: "Глагол 'go' неправильный. Его форма прошедшего времени — 'went'.",
        difficulty: "easy"
      },
      {
        id: 3,
        type: 'true-false',
        question: "В английском языке прилагательные обычно идут перед существительными. (Верно/Неверно)",
        options: ["Верно", "Неверно"],
        correctAnswer: "Верно",
        explanation: "Прилагательные описывают существительное и обычно предшествуют ему (например, 'a blue sky').",
        difficulty: "easy"
      }
    ],
    kz: [
      {
        id: 1,
        type: 'multiple-choice',
        question: "Дұрыс сөйлемді таңдаңыз:",
        options: ["She don't like apples.", "She doesn't likes apples.", "She doesn't like apples.", "She not like apples."],
        correctAnswer: "She doesn't like apples.",
        explanation: "Үшінші жақта (she/he/it) 'doesn't' + етістіктің негізгі формасы қолданылады.",
        difficulty: "easy"
      },
      {
        id: 2,
        type: 'fill-blank',
        question: "'Go' етістігінің өткен шақ (Past Simple) формасын жазыңыз:",
        correctAnswer: "went",
        explanation: "'Go' бұрыс етістік. Оның өткен шақ формасы — 'went'.",
        difficulty: "easy"
      },
      {
        id: 3,
        type: 'true-false',
        question: "Ағылшын тілінде сын есімдер әдетте зат есімнің алдында келеді. (Иә/Жоқ)",
        options: ["Иә", "Жоқ"],
        correctAnswer: "Иә",
        explanation: "Сын есімдер зат есімді сипаттайды және әдетте оның алдында тұрады (мысалы, 'a blue sky').",
        difficulty: "easy"
      }
    ]
  },
  science: {
    en: [
      {
        id: 1,
        type: 'multiple-choice',
        question: "What gas do plants release during photosynthesis?",
        options: ["Carbon dioxide", "Nitrogen", "Oxygen", "Hydrogen"],
        correctAnswer: "Oxygen",
        explanation: "Plants convert carbon dioxide and water into glucose and release oxygen (O2) into the atmosphere.",
        difficulty: "easy"
      },
      {
        id: 2,
        type: 'true-false',
        question: "Sound travels faster in water than in air. (True/False)",
        options: ["True", "False"],
        correctAnswer: "True",
        explanation: "Sound travels faster in denser mediums like liquids and solids because particles are closer together.",
        difficulty: "medium"
      }
    ],
    ru: [
      {
        id: 1,
        type: 'multiple-choice',
        question: "Какой газ выделяют растения при фотосинтезе?",
        options: ["Углекислый газ", "Азот", "Кислород", "Водород"],
        correctAnswer: "Кислород",
        explanation: "Растения превращают углекислый газ и воду в глюкозу, выделяя кислород (O2) в атмосферу.",
        difficulty: "easy"
      },
      {
        id: 2,
        type: 'true-false',
        question: "Звук распространяется в воде быстрее, чем в воздухе. (Верно/Неверно)",
        options: ["Верно", "Неверно"],
        correctAnswer: "Верно",
        explanation: "Звук движется быстрее в более плотных средах (жидкостях и твердых телах), так как молекулы расположены ближе.",
        difficulty: "medium"
      }
    ],
    kz: [
      {
        id: 1,
        type: 'multiple-choice',
        question: "Өсімдіктер фотосинтез кезінде қандай газ бөледі?",
        options: ["Көмірқышқыл газы", "Азот", "Оттек", "Сутек"],
        correctAnswer: "Оттек",
        explanation: "Өсімдіктер көмірқышқыл газы мен суды глюкозаға айналдырып, атмосфераға оттегін (O2) бөледі.",
        difficulty: "easy"
      },
      {
        id: 2,
        type: 'true-false',
        question: "Дыбыс суда ауаға қарағанда жылдамырақ таралады. (Иә/Жоқ)",
        options: ["Иә", "Жоқ"],
        correctAnswer: "Иә",
        explanation: "Тығыз ортада (сұйықтықтар мен қатты денелерде) молекулалар жақын орналасқандықтан дыбыс тез таралады.",
        difficulty: "medium"
      }
    ]
  },
  history: {
    en: [
      {
        id: 1,
        type: 'multiple-choice',
        question: "In what year did World War II end?",
        options: ["1940", "1943", "1945", "1950"],
        correctAnswer: "1945",
        explanation: "WWII officially ended in 1945 following the surrender of Germany and Japan.",
        difficulty: "easy"
      },
      {
        id: 2,
        type: 'fill-blank',
        question: "Kazakhstan declared independence in the year ___.",
        correctAnswer: "1991",
        explanation: "Kazakhstan gained independence on December 16, 1991.",
        difficulty: "easy"
      }
    ],
    ru: [
      {
        id: 1,
        type: 'multiple-choice',
        question: "В каком году закончилась Вторая мировая война?",
        options: ["1940", "1943", "1945", "1950"],
        correctAnswer: "1945",
        explanation: "Вторая мировая война официально завершилась в 1945 году капитуляцией Германии и Японии.",
        difficulty: "easy"
      },
      {
        id: 2,
        type: 'fill-blank',
        question: "Казахстан провозгласил независимость в ___ году.",
        correctAnswer: "1991",
        explanation: "Казахстан обрел независимость 16 декабря 1991 года.",
        difficulty: "easy"
      }
    ],
    kz: [
      {
        id: 1,
        type: 'multiple-choice',
        question: "Екінші дүниежүзілік соғыс қай жылы аяқталды?",
        options: ["1940", "1943", "1945", "1950"],
        correctAnswer: "1945",
        explanation: "Екінші дүниежүзілік соғыс ресми түрде 1945 жылы Германия мен Жапонияның тізе бүгуімен аяқталды.",
        difficulty: "easy"
      },
      {
        id: 2,
        type: 'fill-blank',
        question: "Қазақстан өзінің тәуелсіздігін ___ жылы жариялады.",
        correctAnswer: "1991",
        explanation: "Қазақстан 1991 жылы 16 желтоқсанда тәуелсіздігін жариялады.",
        difficulty: "easy"
      }
    ]
  },
  geography: {
    en: [
      {
        id: 1,
        type: 'multiple-choice',
        question: "Which is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
        correctAnswer: "Pacific Ocean",
        explanation: "The Pacific Ocean is the largest and deepest of Earth's oceanic divisions.",
        difficulty: "easy"
      },
      {
        id: 2,
        type: 'true-false',
        question: "The equator passes through Brazil. (True/False)",
        options: ["True", "False"],
        correctAnswer: "True",
        explanation: "The equator passes directly through northern Brazil and several other nations.",
        difficulty: "medium"
      }
    ],
    ru: [
      {
        id: 1,
        type: 'multiple-choice',
        question: "Какой океан является самым большим на Земле?",
        options: ["Атлантический", "Индийский", "Тихий", "Северный Ледовитый"],
        correctAnswer: "Тихий",
        explanation: "Тихий океан — самый большой и глубокий океан планеты.",
        difficulty: "easy"
      },
      {
        id: 2,
        type: 'true-false',
        question: "Экватор проходит через Бразилию. (Верно/Неверно)",
        options: ["Верно", "Неверно"],
        correctAnswer: "Верно",
        explanation: "Экватор проходит через северную часть Бразилии.",
        difficulty: "medium"
      }
    ],
    kz: [
      {
        id: 1,
        type: 'multiple-choice',
        question: "Жер бетіндегі ең үлкен мұхит қайсысы?",
        options: ["Атлант мұхиты", "Үнді мұхиты", "Тынық мұхиты", "Солтүстік Мұзды мұхиты"],
        correctAnswer: "Тынық мұхиты",
        explanation: "Тынық мұхиты — Жер шарындағы ең үлкен және ең терең мұхит бөлігі.",
        difficulty: "easy"
      },
      {
        id: 2,
        type: 'true-false',
        question: "Экватор Бразилия арқылы өтеді ме? (Иә/Жоқ)",
        options: ["Иә", "Жоқ"],
        correctAnswer: "Иә",
        explanation: "Экватор Бразилияның солтүстік бөлігі арқылы тікелей өтеді.",
        difficulty: "medium"
      }
    ]
  },
  economics: {
    en: [
      {
        id: 1,
        type: 'multiple-choice',
        question: "What happens to price when supply exceeds demand?",
        options: ["It goes up", "It goes down", "It remains stable", "It doubles"],
        correctAnswer: "It goes down",
        explanation: "When there is excess supply and low demand, sellers reduce prices to attract buyers.",
        difficulty: "medium"
      },
      {
        id: 2,
        type: 'true-false',
        question: "Inflation means your money gains purchasing power. (True/False)",
        options: ["True", "False"],
        correctAnswer: "False",
        explanation: "Inflation reduces purchasing power because it represents a general rise in prices.",
        difficulty: "easy"
      }
    ],
    ru: [
      {
        id: 1,
        type: 'multiple-choice',
        question: "Что происходит с ценой, когда предложение превышает спрос?",
        options: ["Она растет", "Она падает", "Остается стабильной", "Удваивается"],
        correctAnswer: "Она падает",
        explanation: "При избытке предложения продавцы снижают цены, чтобы стимулировать покупки.",
        difficulty: "medium"
      },
      {
        id: 2,
        type: 'true-false',
        question: "Инфляция означает, что ваши деньги приобретают большую покупательную способность. (Верно/Неверно)",
        options: ["Верно", "Неверно"],
        correctAnswer: "Неверно",
        explanation: "Инфляция снижает покупательную способность из-за роста цен.",
        difficulty: "easy"
      }
    ],
    kz: [
      {
        id: 1,
        type: 'multiple-choice',
        question: "Ұсыныс сұраныстан асып кеткенде баға не болады?",
        options: ["Өседі", "Төмендейді", "Тұрақты болып қалады", "Екі еселенеді"],
        correctAnswer: "Төмендейді",
        explanation: "Ұсыныс артық болып, сұраныс аз болғанда, сатушылар сатып алушыларды тарту үшін бағаны төмендетеді.",
        difficulty: "medium"
      },
      {
        id: 2,
        type: 'true-false',
        question: "Инфляция ақшаның сатып алу қабілетінің өсетінін білдіреді ме? (Иә/Жоқ)",
        options: ["Иә", "Жоқ"],
        correctAnswer: "Жоқ",
        explanation: "Инфляция бағаның өсуі салдарынан ақшаның сатып алу қабілетін төмендетеді.",
        difficulty: "easy"
      }
    ]
  }
};

export function generatePractice(
  subject: string,
  topic: string,
  difficulty: string,
  language: string
): PracticeQuestion[] {
  const normSubject = subject.toLowerCase();
  const langKey = language.toLowerCase().startsWith('ru') || language.toLowerCase() === 'русский' ? 'ru' : 
                  (language.toLowerCase().startsWith('kz') || language.toLowerCase() === 'қазақша' ? 'kz' : 'en');
  
  const subjectsMap = QUESTION_BANK[normSubject] || QUESTION_BANK.math;
  return subjectsMap[langKey] || subjectsMap.en;
}

export function checkAnswer(
  question: string,
  studentAnswer: string,
  correctAnswer: string,
  language: string
): AnswerFeedback {
  const isCorrect = studentAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase();
  const isKz = language === 'kz' || language.toLowerCase().includes('қазақ');
  const isRu = language === 'ru' || language.toLowerCase().includes('рус');

  if (isCorrect) {
    return {
      isCorrect: true,
      feedback: isKz ? "Өте жақсы! 🎉 Бұл дұрыс!" : isRu ? "Отличная работа! 🎉 Это правильно!" : "Excellent work! 🎉 That's correct!",
      explanation: isKz ? "Тұжырымдаманы жақсы түсіндіңіз." : isRu ? "Вы отлично поняли концепцию." : "You understood the concept well.",
      hint: isKz ? "Келесі сұраққа дайынсыз." : isRu ? "Вы готовы к следующему вопросу." : "You're ready to try the next question.",
    };
  }

  return {
    isCorrect: false,
    feedback: isKz ? "Жақсы талпыныс, бірақ мүлдем дұрыс емес." : isRu ? "Хорошая попытка, но не совсем верно." : "Good try, but not quite right.",
    explanation: (isKz ? "Дұрыс жауап: " : isRu ? "Правильный ответ: " : "Correct answer: ") + `"${correctAnswer}".`,
    hint: isKz ? "Мәселені кішігірім қадамдарға бөліп көріңіз." : isRu ? "Попробуйте разбить задачу на мелкие шаги." : "Try to break the problem into smaller steps.",
  };
}

export const mockTeacherData = {
  name: "Ms. Nurlan",
  totalStudents: 28,
  classAverage: 78,
  students: [
    { id: 1, name: "Alex K.", level: "Intermediate", progress: 68, weakTopic: "Fractions", lastActive: "Today", honestUseRate: 95 },
    { id: 2, name: "Dana M.", level: "Advanced", progress: 92, weakTopic: "None", lastActive: "Today", honestUseRate: 100 },
    { id: 3, name: "Timur S.", level: "Beginner", progress: 45, weakTopic: "Equations", lastActive: "Yesterday", honestUseRate: 85 },
    { id: 4, name: "Aisha R.", level: "Intermediate", progress: 74, weakTopic: "Grammar", lastActive: "Today", honestUseRate: 90 },
    { id: 5, name: "Nursultan B.", level: "Intermediate", progress: 61, weakTopic: "Essay Writing", lastActive: "2 days ago", honestUseRate: 88 },
  ],
  classWeakTopics: [
    { topic: "Fractions", studentsStruggling: 12 },
    { topic: "Essay Writing", studentsStruggling: 9 },
    { topic: "Chemical Formulas", studentsStruggling: 7 },
  ],
};

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
    ],
    recommendations: [
      "Focus on Fractions — it's currently a weak area.",
      "Good progress in Science! Keep encouraging Alex.",
    ],
  },
};
