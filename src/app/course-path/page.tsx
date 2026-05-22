'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { useApp } from '@/components/ThemeProvider';
import { useUser } from '@/components/UserContext';
import tr from '@/lib/translations';
import Link from 'next/link';
import styles from './course-path.module.css';

interface Resource {
  title: string;
  url: string;
  type: 'course' | 'youtube';
}

interface Subject {
  id: string;
  name: string;
  difficulty: string;
  whyUseful: string;
  aiAdvice?: string;
  resources: Resource[];
}

interface CoursePathData {
  careerGoal: string;
  coreSubjects: Subject[];
  electives: Subject[];
}

interface CuratedTrack {
  id: string;
  name: string;
  goal: string;
  image: string;
  description: string;
  data: CoursePathData;
}

const CURATED_TRACKS: CuratedTrack[] = [
  {
    id: 'programming',
    name: 'Programming & IT',
    goal: 'Full-Stack Web Developer',
    image: '/assets/course-paths/programming.png',
    description: 'Learn modern web engineering from standard algorithms to building enterprise React/Next.js platforms.',
    data: {
      careerGoal: 'Full-Stack Web Developer',
      coreSubjects: [
        {
          id: 'prog1',
          name: 'React & Next.js Framework',
          difficulty: 'Medium',
          whyUseful: 'The most popular modern web development framework for creating high-performance interactive interfaces.',
          resources: [
            { title: 'Next.js 14 Full Tutorial for Beginners (YouTube)', url: 'https://www.youtube.com/watch?v=ZjAqacqy_To', type: 'youtube' },
            { title: 'Official Next.js Interactive Dashboard Course', url: 'https://nextjs.org/learn', type: 'course' }
          ]
        },
        {
          id: 'prog2',
          name: 'Data Structures & Algorithms',
          difficulty: 'High',
          whyUseful: 'Fundamental coding patterns, complexity analysis (Big O), trees, sorting, and interview preparation.',
          resources: [
            { title: 'Data Structures & Algorithms Easy to Advanced (YouTube)', url: 'https://www.youtube.com/watch?v=8hly31xKjns', type: 'youtube' },
            { title: 'MIT Introduction to Algorithms 6.006 Lecture Playlist', url: 'https://www.youtube.com/playlist?list=PLUl4u3cNGP61Oq3tWYp6V_F-5jb5L2iHb', type: 'course' }
          ]
        }
      ],
      electives: [
        {
          id: 'prog3',
          name: 'Relational Databases & SQL',
          difficulty: 'Medium',
          whyUseful: 'Understand relational database design, query optimization, Postgres, and Supabase database integrations.',
          aiAdvice: 'Crucial for any full-stack developer. Storing persistent user data is the heart of every modern web app.',
          resources: [
            { title: 'SQL Tutorial - Full Database Course for Beginners (YouTube)', url: 'https://www.youtube.com/watch?v=HXV3zeQKqGY', type: 'youtube' },
            { title: 'Supabase Official Database Video Guides', url: 'https://supabase.com/docs', type: 'course' }
          ]
        }
      ]
    }
  },
  {
    id: 'mathematics',
    name: 'Advanced Mathematics',
    goal: 'Data Science & ML Foundation',
    image: '/assets/course-paths/mathematics.png',
    description: 'Master calculus, linear algebra, and statistical models that form the backbone of modern machine learning.',
    data: {
      careerGoal: 'Data Science & Machine Learning Foundations',
      coreSubjects: [
        {
          id: 'math1',
          name: 'Essence of Calculus',
          difficulty: 'High',
          whyUseful: 'Understand derivatives, limits, integrals, and gradient descent algorithms in optimization.',
          resources: [
            { title: 'Essence of Calculus by 3Blue1Brown (YouTube)', url: 'https://www.youtube.com/watch?v=WUvTyaaNkzM', type: 'youtube' },
            { title: 'Khan Academy Calculus 1 & 2', url: 'https://www.khanacademy.org/math/calculus-1', type: 'course' }
          ]
        },
        {
          id: 'math2',
          name: 'Linear Algebra',
          difficulty: 'Medium',
          whyUseful: 'Vectors, matrix operations, eigenvalues, and coordinate projections essential for neural networks.',
          resources: [
            { title: 'Essence of Linear Algebra by 3Blue1Brown (YouTube)', url: 'https://www.youtube.com/watch?v=fNk_zzaMoSs', type: 'youtube' },
            { title: 'MIT 18.06 Linear Algebra lectures by Gilbert Strang (YouTube)', url: 'https://www.youtube.com/playlist?list=PLE7DDD91010BC51F8', type: 'course' }
          ]
        }
      ],
      electives: [
        {
          id: 'math3',
          name: 'Probability & Applied Statistics',
          difficulty: 'Medium',
          whyUseful: 'Hypothesis testing, Bayesian inference, regression analysis, and statistical significance.',
          aiAdvice: 'Highly recommended for anyone looking to analyze data or build machine learning models.',
          resources: [
            { title: 'Statistics - A Full University Course on Data Science (YouTube)', url: 'https://www.youtube.com/watch?v=xxpc-HPKN28', type: 'youtube' },
            { title: 'Khan Academy Probability & Statistics', url: 'https://www.khanacademy.org/math/statistics-probability', type: 'course' }
          ]
        }
      ]
    }
  },
  {
    id: 'physics',
    name: 'Physics & Engineering',
    goal: 'Aerospace & Mechanical Engineering',
    image: '/assets/course-paths/physics.png',
    description: 'Explore the fundamental principles of the universe, from classical motion dynamics to electricity.',
    data: {
      careerGoal: 'Aerospace & Mechanical Engineering',
      coreSubjects: [
        {
          id: 'phys1',
          name: 'Classical Mechanics',
          difficulty: 'High',
          whyUseful: 'Newtonian laws of motion, kinematics, work-energy theorem, orbital dynamics, and rotational systems.',
          resources: [
            { title: 'Crash Course Physics: Classical Mechanics (YouTube)', url: 'https://www.youtube.com/watch?v=gJraY4k0w2A', type: 'youtube' },
            { title: 'MIT Physics I: Classical Mechanics Lectures (YouTube)', url: 'https://www.youtube.com/playlist?list=PLUl4u3cNGP60BplZ1WItiZ7xVwq90RHYy', type: 'course' }
          ]
        },
        {
          id: 'phys2',
          name: 'Electricity & Magnetism',
          difficulty: 'High',
          whyUseful: 'Electric fields, circuits, magnetic induction, electromagnetic waves, and Maxwell equations.',
          resources: [
            { title: 'Crash Course Physics: Electricity & Magnetism (YouTube)', url: 'https://www.youtube.com/watch?v=TflVvQ5L4Gg', type: 'youtube' },
            { title: 'MIT Physics II: Electricity and Magnetism Lectures (YouTube)', url: 'https://www.youtube.com/playlist?list=PLUl4u3cNGP61Fm12aG27n3mWygM8spgCh', type: 'course' }
          ]
        }
      ],
      electives: [
        {
          id: 'phys3',
          name: 'Thermodynamics & Heat Cycles',
          difficulty: 'Medium',
          whyUseful: 'Entropy, laws of thermodynamics, combustion cycles, engines, and heat transfer equations.',
          aiAdvice: 'Essential for understanding jet engines, propulsion systems, and energy conversion systems.',
          resources: [
            { title: 'Thermodynamics - Crash Course Physics (YouTube)', url: 'https://www.youtube.com/watch?v=4l451Sgn2P8', type: 'youtube' },
            { title: 'MIT Thermodynamics Lectures Series (YouTube)', url: 'https://www.youtube.com/playlist?list=PLUl4u3cNGP62gMKyT-H6Xpif2xT4A6aHj', type: 'course' }
          ]
        }
      ]
    }
  },
  {
    id: 'chemistry',
    name: 'Chemistry & Biology',
    goal: 'Biomedical Science & Medicine',
    image: '/assets/course-paths/chemistry.png',
    description: 'Delve into the molecular foundation of life, organic compound reactions, and cellular machinery.',
    data: {
      careerGoal: 'Biomedical Science & Medicine',
      coreSubjects: [
        {
          id: 'chem1',
          name: 'Organic Chemistry',
          difficulty: 'High',
          whyUseful: 'Structure, synthesis, properties, and chemical reactions of organic elements and macromolecules.',
          resources: [
            { title: 'Organic Chemistry 1 Full Tutorial Course (YouTube)', url: 'https://www.youtube.com/watch?v=HTMRxV-3t88', type: 'youtube' },
            { title: 'Khan Academy Organic Chemistry Track', url: 'https://www.khanacademy.org/science/organic-chemistry', type: 'course' }
          ]
        },
        {
          id: 'chem2',
          name: 'Molecular & Cell Biology',
          difficulty: 'Medium',
          whyUseful: 'Structure of cell organelles, DNA transcription/translation, genetic engineering, and cellular metabolism.',
          resources: [
            { title: 'Biology - Cell Structures & Functions (YouTube)', url: 'https://www.youtube.com/watch?v=cPK6s79J5U8', type: 'youtube' },
            { title: 'MIT 7.01 Fundamentals of Biology Lectures (YouTube)', url: 'https://www.youtube.com/playlist?list=PLUl4u3cNGP63uZgAbJgVknTkr5x5LsnWf', type: 'course' }
          ]
        }
      ],
      electives: [
        {
          id: 'chem3',
          name: 'Principles of Biochemistry',
          difficulty: 'High',
          whyUseful: 'Metabolic pathways, enzyme kinetics, structural biology of lipids, proteins, and carbohydrates.',
          aiAdvice: 'Synthesizes chemistry and biology. Highly recommended for students looking to enter medicine, pharmacology, or genetics.',
          resources: [
            { title: 'Biochemistry Full Course for Pre-Med Students (YouTube)', url: 'https://www.youtube.com/watch?v=ZgBOE7qB5H4', type: 'youtube' },
            { title: 'Harvard Principles of Biochemistry Course (EdX)', url: 'https://www.edx.org/learn/biochemistry/harvard-university-principles-of-biochemistry', type: 'course' }
          ]
        }
      ]
    }
  },
  {
    id: 'economics',
    name: 'Economics & Finance',
    goal: 'Investment & Financial Analyst',
    image: '/assets/course-paths/economics.png',
    description: 'Understand global micro/macro markets, corporate asset valuation, and investment strategies.',
    data: {
      careerGoal: 'Investment & Financial Analyst',
      coreSubjects: [
        {
          id: 'econ1',
          name: 'Macro & Microeconomics Basics',
          difficulty: 'Medium',
          whyUseful: 'Supply-demand elasticities, consumer choices, GDP indicators, inflation indices, and central bank monetary policies.',
          resources: [
            { title: 'Micro & Macroeconomics Basics (Crash Course) (YouTube)', url: 'https://www.youtube.com/watch?v=3ez10ADR_gM', type: 'youtube' },
            { title: 'Khan Academy AP Macroeconomics Course', url: 'https://www.khanacademy.org/economics-finance-domain/ap-macroeconomics', type: 'course' }
          ]
        },
        {
          id: 'econ2',
          name: 'Corporate Finance & Accounting',
          difficulty: 'High',
          whyUseful: 'Reading balance sheets, income statements, capital structuring, discounted cash flow (DCF) model, and company valuations.',
          resources: [
            { title: 'Corporate Finance Course for Beginners (YouTube)', url: 'https://www.youtube.com/watch?v=W_Y4eX1_FmY', type: 'youtube' },
            { title: 'Wharton Fundamentals of Finance Online Course', url: 'https://www.coursera.org/learn/wharton-finance', type: 'course' }
          ]
        }
      ],
      electives: [
        {
          id: 'econ3',
          name: 'Financial Markets & Investing',
          difficulty: 'Medium',
          whyUseful: 'Stock indices, treasury bonds, risk hedging, portfolio theory, and behavioral finance theories.',
          aiAdvice: 'Helps students understand how capital markets price risk and allocate resources in real-world scenarios.',
          resources: [
            { title: 'Financial Markets by Yale University Lectures (YouTube)', url: 'https://www.youtube.com/playlist?list=PL8F880A183C90554E', type: 'youtube' },
            { title: 'Yale Open Courses: Econ 252 Financial Markets', url: 'https://oyc.yale.edu/economics/econ-252', type: 'course' }
          ]
        }
      ]
    }
  },
  {
    id: 'history',
    name: 'History & Literature',
    goal: 'Liberal Arts & Cultural Studies',
    image: '/assets/course-paths/history.png',
    description: 'Explore the events that shaped human history, and analyze influential literary works and ideas.',
    data: {
      careerGoal: 'Liberal Arts & Cultural Studies',
      coreSubjects: [
        {
          id: 'hist1',
          name: 'World History Overview',
          difficulty: 'Easy',
          whyUseful: 'Understand the rise and fall of civilizations, global trade networks, world wars, and post-war geopolitics.',
          resources: [
            { title: 'World History Full Series by John Green (YouTube)', url: 'https://www.youtube.com/watch?v=Yocja_N5s1I', type: 'youtube' },
            { title: 'Khan Academy AP World History', url: 'https://www.khanacademy.org/humanities/world-history', type: 'course' }
          ]
        },
        {
          id: 'hist2',
          name: 'English Literature & Rhetoric',
          difficulty: 'Easy',
          whyUseful: 'Critical analysis of classic novels, writing structured argumentative essays, and persuasive public speaking.',
          resources: [
            { title: 'English Literature Analysis Guide (YouTube)', url: 'https://www.youtube.com/watch?v=gT_Zt2G_Kzo', type: 'youtube' },
            { title: 'Harvard Rhetoric: Art of Persuasive Writing (EdX)', url: 'https://www.edx.org/learn/writing/harvard-university-rhetoric-the-art-of-persuasive-writing-and-public-speaking', type: 'course' }
          ]
        }
      ],
      electives: [
        {
          id: 'hist3',
          name: 'Philosophy & Logic',
          difficulty: 'Medium',
          whyUseful: 'Socratic dialogue, ethical theories, epistemological questions, formal logic, and cognitive argument analysis.',
          aiAdvice: 'Deepens critical thinking and argumentative precision; valuable for legal studies or writing careers.',
          resources: [
            { title: 'Philosophy Complete Crash Course Series (YouTube)', url: 'https://www.youtube.com/playlist?list=PL8dPuuaLjXtNgK6MZucdYldNk5bDYQQmR', type: 'youtube' },
            { title: 'MIT Introduction to Philosophy Course (EdX)', url: 'https://www.edx.org/learn/philosophy/massachusetts-institute-of-technology-introduction-to-philosophy', type: 'course' }
          ]
        }
      ]
    }
  }
];

export default function CoursePathPage() {
  const { lang } = useApp();
  const { user } = useUser();
  const c = tr.coursePath;

  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [coursePath, setCoursePath] = useState<CoursePathData | null>(null);
  const [activeTrackId, setActiveTrackId] = useState<string | null>(null);
  const [error, setError] = useState('');

  // Initial load
  useEffect(() => {
    const savedPath = localStorage.getItem('pl-course-path');
    if (savedPath) {
      const parsed = JSON.parse(savedPath);
      setCoursePath(parsed);
      const matched = CURATED_TRACKS.find(t => t.data.careerGoal === parsed.careerGoal);
      if (matched) {
        setActiveTrackId(matched.id);
      }
    } else {
      setCoursePath(CURATED_TRACKS[0].data);
      setActiveTrackId(CURATED_TRACKS[0].id);
    }
  }, []);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);
    setError('');
    setLoadingStep(1);
    setActiveTrackId(null);

    // Simulate stepping through progress indicators beautifully
    const stepsIntervals = [1200, 2000, 3200];
    stepsIntervals.forEach((time, index) => {
      setTimeout(() => {
        setLoadingStep(index + 2);
      }, time);
    });

    try {
      const response = await fetch('/api/course-path', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: topic.trim(),
          language: lang === 'ru' ? 'Russian' : lang === 'kz' ? 'Kazakh' : 'English'
        })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to generate path.');
      }

      const data = await response.json();
      setCoursePath(data);
      localStorage.setItem('pl-course-path', JSON.stringify(data));
      
      // Auto scroll to custom generation results
      setTimeout(() => {
        const resultsEl = document.getElementById('results-section');
        if (resultsEl) {
          resultsEl.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } catch (err: any) {
      setError(err.message || 'Could not connect to generator API.');
    } finally {
      setLoading(false);
      setLoadingStep(0);
    }
  };

  // Helper strings for UI bilingual elements
  const tLabels = {
    curatedTitle: {
      en: '🎯 Explore Popular Learning Tracks',
      ru: '🎯 Популярные учебные направления',
      kz: '🎯 Танымал оқу бағыттары'
    },
    curatedSubtitle: {
      en: 'Select a curated track to instantly load its curriculum and educational resources.',
      ru: 'Выберите готовое направление, чтобы мгновенно загрузить программу и учебные ресурсы.',
      kz: 'Оқу жоспары мен ресурстарды бірден жүктеу үшін дайын бағытты таңдаңыз.'
    },
    customTitle: {
      en: '✨ Design a Custom Study Path with AI',
      ru: '✨ Создать индивидуальный путь с помощью ИИ',
      kz: '✨ ИИ көмегімен жеке оқу жолын жасау'
    },
    promptTitle: {
      en: 'What topic or career goal would you like to explore?',
      ru: 'Какую тему или профессиональную цель вы хотите изучить?',
      kz: 'Қандай тақырып немесе кәсіби мақсатты зерттегіңіз келеді?'
    },
    promptDesc: {
      en: 'Our AI Planner will craft a personalized curriculum with essential subjects, best free learning links, and highly viewed YouTube courses.',
      ru: 'ИИ составит персональную учебную программу с основными предметами, лучшими бесплатными ресурсами и популярными курсами на YouTube.',
      kz: 'Біздің ЖИ оқу жоспарлағышыңыз негізгі пәндерді, үздік тегін ресурстарды және танымал YouTube бейнелерін ұсынады.'
    },
    placeholder: {
      en: 'e.g. Next.js Web Developer, Quantum Computing, Calculus 1...',
      ru: 'например, Веб-разработчик Next.js, Квантовые вычисления, Математический анализ...',
      kz: 'мысалы, Next.js веб-әзірлеушісі, Кванттық физика, Математикалық анализ...'
    },
    generateBtn: {
      en: 'Generate Study Path',
      ru: 'Создать учебный путь',
      kz: 'Оқу жолын жасау'
    },
    loadingSteps: [
      { en: 'Analyzing requested topic...', ru: 'Анализ темы...', kz: 'Тақырыпты талдау...' },
      { en: 'Structuring academic curriculum...', ru: 'Структурирование программы...', kz: 'Бағдарламаны құрылымдау...' },
      { en: 'Scoping free resources and YouTube indices...', ru: 'Поиск бесплатных ресурсов и YouTube видео...', kz: 'Тегін ресурстар мен YouTube бейнелерін іздеу...' },
      { en: 'Finalizing custom guide path...', ru: 'Завершение построения пути...', kz: 'Жоспарды аяқтау...' }
    ],
    resourcesLabel: {
      en: 'Best Learning Resources',
      ru: 'Лучшие учебные ресурсы',
      kz: 'Үздік оқу ресурстары'
    },
    coursesTab: {
      en: 'Free Course',
      ru: 'Бесплатный курс',
      kz: 'Тегін курс'
    },
    youtubeTab: {
      en: 'YouTube Series',
      ru: 'Видео на YouTube',
      kz: 'YouTube бейнелері'
    }
  };

  return (
    <>
      <Navbar />
      <main className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>{c.title[lang]}</h1>
          <p className={styles.subtitle}>{c.subtitle[lang]}</p>
          {coursePath && (
            <div className={styles.careerGoal}>
              <span>{c.careerGoal[lang]}</span> {coursePath.careerGoal}
            </div>
          )}
        </header>

        {/* Curated Tracks Section */}
        <section className={styles.curatedSection}>
          <h2 className={styles.curatedTitle}>{tLabels.curatedTitle[lang]}</h2>
          <p className={styles.curatedSubtitle}>{tLabels.curatedSubtitle[lang]}</p>
          
          <div className={styles.curatedGrid}>
            {CURATED_TRACKS.map(track => (
              <div 
                key={track.id} 
                className={`${styles.curatedCard} ${activeTrackId === track.id ? styles.curatedCardActive : ''}`}
                onClick={() => {
                  setCoursePath(track.data);
                  setActiveTrackId(track.id);
                  localStorage.setItem('pl-course-path', JSON.stringify(track.data));
                  setTimeout(() => {
                    const resultsEl = document.getElementById('results-section');
                    if (resultsEl) {
                      resultsEl.scrollIntoView({ behavior: 'smooth' });
                    }
                  }, 50);
                }}
              >
                <div className={styles.curatedCardImageContainer}>
                  <img src={track.image} alt={track.name} className={styles.curatedCardImage} />
                  <div className={styles.curatedCardBadge}>{track.goal}</div>
                </div>
                <div className={styles.curatedCardContent}>
                  <h3 className={styles.curatedCardName}>{track.name}</h3>
                  <p className={styles.curatedCardDesc}>{track.description}</p>
                  <button className={styles.exploreTrackBtn}>
                    {lang === 'ru' ? 'Загрузить план' : lang === 'kz' ? 'Жоспарды жүктеу' : 'Load Track Plan'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Dynamic Search Box */}
        <section className={styles.promptContainer}>
          <h2 className={styles.promptTitle}>{tLabels.customTitle[lang]}</h2>
          <p className={styles.promptDesc}>{tLabels.promptDesc[lang]}</p>
          <form onSubmit={handleGenerate} className={styles.inputGroup}>
            <input
              type="text"
              className={styles.searchBar}
              placeholder={tLabels.placeholder[lang]}
              value={topic}
              onChange={e => setTopic(e.target.value)}
              disabled={loading}
              required
            />
            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? '⌛' : '✨'} {tLabels.generateBtn[lang]}
            </button>
          </form>
          {error && <div className={styles.error} style={{ marginTop: '16px' }}>{error}</div>}
        </section>

        {/* Loading Steps */}
        {loading && (
          <section className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <div className={styles.loadingSteps}>
              {tLabels.loadingSteps.map((step, idx) => (
                <div 
                  key={idx} 
                  className={`${styles.loadingStep} ${
                    loadingStep === idx + 1 ? styles.loadingStepActive : ''
                  } ${loadingStep > idx + 1 ? styles.loadingStepDone : ''}`}
                >
                  {step[lang]}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Display Generated Path */}
        {!loading && coursePath && (
          <div id="results-section" style={{ scrollMarginTop: '100px' }}>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>📚 {c.coreSubjects[lang]}</h2>
              <div className={styles.grid}>
                {coursePath.coreSubjects.map(subject => (
                  <div key={subject.id} className={styles.card}>
                    <div className={styles.cardHeader}>
                      <h3 className={styles.courseName}>{subject.name}</h3>
                      <span className={styles.difficulty}>{c.difficulty[lang]} {subject.difficulty}</span>
                    </div>
                    
                    <p className={styles.whyUseful}>
                      <strong>{c.whyUseful[lang]}</strong> {subject.whyUseful}
                    </p>

                    <div className={styles.resourceList}>
                      <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-tertiary)' }}>
                        {tLabels.resourcesLabel[lang]}:
                      </span>
                      {subject.resources.map((res, index) => (
                        <div key={index} className={styles.resourceItem}>
                          <a href={res.url} target="_blank" rel="noopener noreferrer" className={styles.resourceLink}>
                            <span className={styles.resourceTypeIcon}>
                              {res.type === 'youtube' ? '🎥' : '🌐'}
                            </span>
                            <span className={styles.resourceTitle}>{res.title}</span>
                          </a>
                          <span className={res.type === 'youtube' ? styles.youtubeBadge : styles.courseBadge}>
                            {res.type === 'youtube' ? tLabels.youtubeTab[lang] : tLabels.coursesTab[lang]}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className={styles.cardFooter}>
                      <Link href={`/tutor?subject=${encodeURIComponent(subject.name)}`} className="btn btn-secondary" style={{ width: '100%', textAlign: 'center' }}>
                        {c.studySupport[lang]}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {coursePath.electives && coursePath.electives.length > 0 && (
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>🎯 {c.electives[lang]}</h2>
                <div className={styles.grid}>
                  {coursePath.electives.map(subject => (
                    <div key={subject.id} className={styles.card}>
                      <div className={styles.cardHeader}>
                        <h3 className={styles.courseName}>{subject.name}</h3>
                        <span className={styles.difficulty}>{c.difficulty[lang]} {subject.difficulty}</span>
                      </div>
                      
                      <p className={styles.whyUseful}>
                        <strong>{c.whyUseful[lang]}</strong> {subject.whyUseful}
                      </p>

                      {subject.aiAdvice && (
                        <div className={styles.aiAdvice}>
                          <div className={styles.aiAdviceLabel}>✨ {c.aiAdvice[lang]}</div>
                          {subject.aiAdvice}
                        </div>
                      )}

                      <div className={styles.resourceList}>
                        <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-tertiary)' }}>
                          {tLabels.resourcesLabel[lang]}:
                        </span>
                        {subject.resources.map((res, index) => (
                          <div key={index} className={styles.resourceItem}>
                            <a href={res.url} target="_blank" rel="noopener noreferrer" className={styles.resourceLink}>
                              <span className={styles.resourceTypeIcon}>
                                {res.type === 'youtube' ? '🎥' : '🌐'}
                              </span>
                              <span className={styles.resourceTitle}>{res.title}</span>
                            </a>
                            <span className={res.type === 'youtube' ? styles.youtubeBadge : styles.courseBadge}>
                              {res.type === 'youtube' ? tLabels.youtubeTab[lang] : tLabels.coursesTab[lang]}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className={styles.cardFooter}>
                        <Link href={`/tutor?subject=${encodeURIComponent(subject.name)}`} className="btn btn-primary" style={{ width: '100%', textAlign: 'center' }}>
                          {c.studySupport[lang]}
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </main>
    </>
  );
}
