'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { useApp } from '@/components/ThemeProvider';
import tr from '@/lib/translations';
import { getLocalStats, completeTodayTask, type UserStats } from '@/lib/user-store';
import Link from 'next/link';
import styles from './dashboard.module.css';

export default function DashboardPage() {
  const { lang } = useApp();
  const dt = tr.dashboard;

  const [stats, setStats] = useState<UserStats | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStats(getLocalStats());
  }, []);

  const handleToggleTask = (id: number) => {
    if (!stats) return;
    const updated = completeTodayTask(id);
    setStats({ ...updated });
  };

  if (!stats) {
    return (
      <>
        <Navbar />
        <main className={styles.page}>
          <div className={styles.container}>
            <p>Loading stats...</p>
          </div>
        </main>
      </>
    );
  }

  const progressPercent = Math.round((stats.completedLessons / stats.totalLessons) * 100);

  // Subject Translation Mapping helper
  const localizedSubjects: Record<string, Record<string, string>> = {
    Math: { en: 'Math', ru: 'Математика', kz: 'Математика' },
    English: { en: 'English', ru: 'Английский', kz: 'Ағылшын тілі' },
    Science: { en: 'Science', ru: 'Наука', kz: 'Жаратылыстану' },
    History: { en: 'History', ru: 'История', kz: 'Тарих' },
    Geography: { en: 'Geography', ru: 'География', kz: 'География' },
    Economics: { en: 'Economics', ru: 'Экономика', kz: 'Экономика' }
  };

  // Weak topic localized name mappings
  const localizedTopics: Record<string, Record<string, string>> = {
    'Fractions & Ratios': { en: 'Fractions & Ratios', ru: 'Дроби и отношения', kz: 'Бөлшектер мен қатынастар' },
    'Demand & Supply curves': { en: 'Demand & Supply curves', ru: 'Кривые спроса и предложения', kz: 'Сұраныс пен ұсыныс қисықтары' },
    'Climate Zones': { en: 'Climate Zones', ru: 'Климатические зоны', kz: 'Климаттық зоналар' },
    'World War II': { en: 'World War II', ru: 'Вторая мировая война', kz: 'Екінші дүниежүзілік соғыс' },
    'Verb Tenses': { en: 'Verb Tenses', ru: 'Времена глаголов', kz: 'Етістік шақтары' },
    'Basic Fractions': { en: 'Basic Fractions', ru: 'Простые дроби', kz: 'Жай бөлшектер' },
    'Global Warming': { en: 'Global Warming', ru: 'Глобальное потепление', kz: 'Жаһандық жылыну' },
    'Verb Conjugation': { en: 'Verb Conjugation', ru: 'Спряжение глаголов', kz: 'Етістіктің жіктелуі' }
  };

  // Localized AI recommendations
  const localizedRec = {
    en: `Based on your recent practice, you scored low on ${stats.weakTopics[0]?.name || 'Fractions'}. Let's work on this topic today with Labby.`,
    ru: `На основе последних результатов, у вас низкий балл по теме "${localizedTopics[stats.weakTopics[0]?.name || '']?.ru || 'Дроби'}". Рекомендуем повторить ее сегодня.`,
    kz: `Соңғы жаттығулар нәтижесі бойынша, сізде "${localizedTopics[stats.weakTopics[0]?.name || '']?.kz || 'Бөлшектер'}" тақырыбы төмен. Бүгін осыны қайталайық.`
  };

  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.container}>
          
          {/* Trust notice */}
          <div className={styles.trustRow}>
            <span>🛡️</span>
            <p>{tr.trust.academicHonesty[lang]}</p>
          </div>

          <div className={styles.header}>
            <div>
              <h1 className={styles.greeting}>{dt.welcome[lang]}, {stats.name}</h1>
              <p className={styles.subtitle}>{dt.subtitle[lang]}</p>
            </div>
            <div className={styles.headerActions}>
              <Link href="/tutor" className="btn btn-primary">{tr.nav.tutor[lang]}</Link>
              <Link href="/practice" className="btn btn-secondary">{tr.nav.practice[lang]}</Link>
            </div>
          </div>

          {/* Stats Bar */}
          <div className={styles.statsRow}>
            {[
              { icon: '🔥', value: stats.streak, label: dt.streak[lang] },
              { icon: '📚', value: `${stats.completedLessons}/${stats.totalLessons}`, label: dt.lessons[lang] },
              { icon: '⭐', value: stats.level, label: dt.level[lang] },
              { icon: '💎', value: stats.xp, label: dt.xp[lang] },
            ].map((s, i) => (
              <div key={i} className={styles.statCard}>
                <div className={styles.statIcon}>{s.icon}</div>
                <div className={styles.statInfo}>
                  <span className={styles.statValue}>{s.value}</span>
                  <span className={styles.statLabel}>{s.label}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Mascot encouraging banner */}
          <div className={styles.mascotBanner}>
            <div className={styles.mascotBubble}>
              <span className={styles.mascotEmoji}>🤖</span>
              <p className={styles.mascotText}>{dt.mascotTip[lang]}</p>
            </div>
          </div>

          <div className={styles.grid}>
            
            {/* Today's study plan with check action */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>{dt.todayPlan[lang]}</h2>
                <span className="badge badge-brand">
                  {stats.todayPlan.filter(t => t.done).length}/{stats.todayPlan.length}
                </span>
              </div>
              <div className={styles.planList}>
                {stats.todayPlan.map(task => (
                  <div
                    key={task.id}
                    className={`${styles.planItem} ${task.done ? styles.planDone : ''}`}
                    onClick={() => handleToggleTask(task.id)}
                    style={{ cursor: task.done ? 'default' : 'pointer' }}
                  >
                    <div className={styles.planCheck}>{task.done ? '✓' : '○'}</div>
                    <div className={styles.planInfo}>
                      <span className={styles.planTitle}>{task.title}</span>
                      <span className={styles.planMeta}>{localizedSubjects[task.subject]?.[lang] || task.subject} · {task.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress Circular chart */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>{dt.overall[lang]}</h2>
                <span className="badge badge-success">{progressPercent}%</span>
              </div>
              <div className={styles.progressRing}>
                <svg viewBox="0 0 120 120" className={styles.ringChart}>
                  <circle cx="60" cy="60" r="50" className={styles.ringBg} />
                  <circle cx="60" cy="60" r="50" className={styles.ringFill} style={{ strokeDashoffset: `${314 - (314 * progressPercent) / 100}` }} />
                </svg>
                <div className={styles.ringLabel}>
                  <span className={styles.ringValue}>{progressPercent}%</span>
                  <span className={styles.ringText}>{dt.complete[lang]}</span>
                </div>
              </div>
              <div className={styles.subjectBars}>
                {Object.entries(stats.subjectProgress).map(([subject, progress]) => (
                  <div key={subject} className={styles.subjectBar}>
                    <div className={styles.subjectBarHeader}>
                      <span>{localizedSubjects[subject]?.[lang] || subject}</span>
                      <span className={styles.subjectPercent}>{progress}%</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Needs Improvement topics */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>{dt.weak[lang]}</h2>
                <Link href="/practice" className="btn btn-ghost btn-sm">{tr.nav.practice[lang]} →</Link>
              </div>
              <div className={styles.topicList}>
                {stats.weakTopics.map((topic, i) => (
                  <div key={i} className={styles.topicItem}>
                    <div className={styles.topicInfo}>
                      <span className={styles.topicName}>{localizedTopics[topic.name]?.[lang] || topic.name}</span>
                      <span className={styles.topicSubject}>{localizedSubjects[topic.subject]?.[lang] || topic.subject}</span>
                    </div>
                    <span className={`badge ${topic.score < 50 ? 'badge-error' : 'badge-warning'}`}>{topic.score}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Quizzes */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>{dt.quizzes[lang]}</h2>
                <Link href="/progress" className="btn btn-ghost btn-sm">{tr.nav.progress[lang]} →</Link>
              </div>
              <div className={styles.quizList}>
                {stats.recentQuizzes.map((quiz, i) => (
                  <div key={i} className={styles.quizItem}>
                    <div className={styles.quizInfo}>
                      <span className={styles.quizTopic}>{localizedTopics[quiz.topic]?.[lang] || quiz.topic}</span>
                      <span className={styles.quizDate}>{quiz.date}</span>
                    </div>
                    <span className={`badge ${quiz.score >= 80 ? 'badge-success' : quiz.score >= 60 ? 'badge-warning' : 'badge-error'}`}>{quiz.score}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI recommendation panel */}
            <div className={`${styles.card} ${styles.aiCard}`}>
              <div className={styles.aiCardContent}>
                <h3>🛡️ {dt.aiRec[lang]}</h3>
                <p>{localizedRec[lang] || localizedRec.en}</p>
                <div className={styles.aiActions}>
                  <Link href="/tutor" className="btn btn-primary btn-sm">{tr.nav.tutor[lang]}</Link>
                  <Link href="/practice" className="btn btn-secondary btn-sm">{tr.nav.practice[lang]}</Link>
                </div>
              </div>
            </div>

            {/* Strong Areas */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>{dt.strong[lang]}</h2>
              </div>
              <div className={styles.topicList}>
                {stats.strongTopics.map((topic, i) => (
                  <div key={i} className={styles.topicItem}>
                    <div className={styles.topicInfo}>
                      <span className={styles.topicName}>{localizedTopics[topic.name]?.[lang] || topic.name}</span>
                      <span className={styles.topicSubject}>{localizedSubjects[topic.subject]?.[lang] || topic.subject}</span>
                    </div>
                    <span className="badge badge-success">{topic.score}%</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>
    </>
  );
}
