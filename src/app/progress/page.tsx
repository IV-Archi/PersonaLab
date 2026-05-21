'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { useApp } from '@/components/ThemeProvider';
import tr from '@/lib/translations';
import { getLocalStats, type UserStats } from '@/lib/user-store';
import Link from 'next/link';
import styles from './progress.module.css';

export default function ProgressPage() {
  const { lang } = useApp();
  const pr = tr.progress;

  const [stats, setStats] = useState<UserStats | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStats(getLocalStats());
  }, []);

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
  const days = lang === 'kz' ? ['Дүй', 'Сей', 'Сәр', 'Бей', 'Жұм', 'Сен', 'Жек'] :
               lang === 'ru' ? ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'] :
               ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
               
  const weeklyProgressData = [65, 72, stats.xp > 100 ? 85 : 58, stats.xp > 200 ? 90 : 80, 75, stats.xp > 50 ? 80 : 0, stats.xp > 150 ? 70 : 0];
  const maxProgress = Math.max(...weeklyProgressData, 1);

  const localizedSubjects: Record<string, Record<string, string>> = {
    Math: { en: 'Math', ru: 'Математика', kz: 'Математика' },
    English: { en: 'English', ru: 'Английский', kz: 'Ағылшын тілі' },
    Science: { en: 'Science', ru: 'Наука', kz: 'Жаратылыстану' },
    History: { en: 'History', ru: 'История', kz: 'Тарих' },
    Geography: { en: 'Geography', ru: 'География', kz: 'География' },
    Economics: { en: 'Economics', ru: 'Экономика', kz: 'Экономика' }
  };

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
    en: `Based on your recent practice, you scored low on ${stats.weakTopics[0]?.name || 'Fractions'}. We recommend focusing on this topic in the AI Tutor.`,
    ru: `На основе ваших тестов, рекомендуем поработать над темой "${localizedTopics[stats.weakTopics[0]?.name || '']?.ru || 'Дроби'}". Воспользуйтесь ИИ Репетитором.`,
    kz: `Соңғы жаттығулар нәтижесі бойынша, ЖИ Тьютормен "${localizedTopics[stats.weakTopics[0]?.name || '']?.kz || 'Бөлшектер'}" тақырыбын қайталауды ұсынамыз.`
  };

  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.container}>
          
          {/* Trust notice */}
          <div className={styles.trustBanner}>
            <span className={styles.trustIcon}>🛡️</span>
            <p className={styles.trustText}>
              <strong>{tr.trust.guided[lang]}</strong> — {tr.trust.academicHonesty[lang]}
            </p>
          </div>

          <div className={styles.header}>
            <h1 className={styles.title}>📊 {pr.title[lang]}</h1>
            <p className={styles.subtitle}>{pr.subtitle[lang]}</p>
          </div>

          {/* Overview Stats */}
          <div className={styles.overviewRow}>
            <div className={styles.overviewCard}>
              <span className={styles.overviewIcon}>📚</span>
              <div className={styles.overviewInfo}>
                <span className={styles.overviewValue}>{stats.completedLessons}</span>
                <span className={styles.overviewLabel}>{pr.lessonsCompleted[lang]}</span>
              </div>
            </div>
            <div className={styles.overviewCard}>
              <span className={styles.overviewIcon}>🔥</span>
              <div className={styles.overviewInfo}>
                <span className={styles.overviewValue}>{stats.streak}</span>
                <span className={styles.overviewLabel}>{pr.studyStreak[lang]}</span>
              </div>
            </div>
            <div className={styles.overviewCard}>
              <span className={styles.overviewIcon}>🎯</span>
              <div className={styles.overviewInfo}>
                <span className={styles.overviewValue}>{progressPercent}%</span>
                <span className={styles.overviewLabel}>{pr.overallProgress[lang]}</span>
              </div>
            </div>
            <div className={styles.overviewCard}>
              <span className={styles.overviewIcon}>⭐</span>
              <div className={styles.overviewInfo}>
                <span className={styles.overviewValue}>{stats.level}</span>
                <span className={styles.overviewLabel}>{pr.currentLevel[lang]}</span>
              </div>
            </div>
          </div>

          {/* Motivation Stats & Badges */}
          <div className={styles.motivationSection} style={{ marginBottom: 'var(--space-6)' }}>
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>💎 {pr.motivationTitle[lang]}</h2>
              <div className={styles.motivationGrid}>
                <div>
                  <span className={styles.motivationLabel}>{pr.xpGained[lang]}</span>
                  <div className={styles.xpBox}>✨ {stats.xp} XP</div>
                </div>
                <div>
                  <span className={styles.motivationLabel}>{pr.badgesEarned[lang]}</span>
                  <div className={styles.badgeList}>
                    {stats.badges.map(b => (
                      <span key={b} className={styles.badgeItem}>
                        {b === 'streak3' ? pr.badgesList.streak3[lang] :
                         b === 'mathMaster' ? pr.badgesList.mathMaster[lang] :
                         pr.badgesList.honestLearner[lang]}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.grid}>
            {/* Weekly Chart */}
            <div className={`${styles.card} ${styles.chartCard}`}>
              <h2 className={styles.cardTitle}>📈 {pr.weekly[lang]}</h2>
              <div className={styles.chart}>
                {weeklyProgressData.map((val, i) => (
                  <div key={i} className={styles.chartCol}>
                    <div className={styles.chartBarWrap}>
                      <div className={styles.chartBar} style={{ height: `${(val / maxProgress) * 100}%` }}>
                        {val > 0 && <span className={styles.chartBarValue}>{val}%</span>}
                      </div>
                    </div>
                    <span className={styles.chartLabel}>{days[i]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Subject Progress */}
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>📚 {pr.subjectProgress[lang]}</h2>
              <div className={styles.subjectList}>
                {Object.entries(stats.subjectProgress).map(([subject, progress]) => (
                  <div key={subject} className={styles.subjectItem}>
                    <div className={styles.subjectHeader}>
                      <span className={styles.subjectName}>
                        {subject === 'Math' ? '🔢' : subject === 'English' ? '📖' : subject === 'Science' ? '🔬' : subject === 'History' ? '🏛️' : subject === 'Geography' ? '🌍' : '📈'} {localizedSubjects[subject]?.[lang] || subject}
                      </span>
                      <span className={`badge ${progress >= 80 ? 'badge-success' : progress >= 60 ? 'badge-warning' : 'badge-error'}`}>
                        {progress}%
                      </span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Quizzes */}
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>📝 {pr.quizHistory[lang]}</h2>
              <div className={styles.quizHistory}>
                {stats.recentQuizzes.map((quiz, i) => (
                  <div key={i} className={styles.quizRow}>
                    <div className={styles.quizInfo}>
                      <span className={styles.quizTopic}>{localizedTopics[quiz.topic]?.[lang] || quiz.topic}</span>
                      <span className={styles.quizDate}>{quiz.date}</span>
                    </div>
                    <div className={styles.quizScoreBar}>
                      <div className="progress-bar" style={{ flex: 1 }}>
                        <div className="progress-bar-fill" style={{ width: `${quiz.score}%` }} />
                      </div>
                      <span className={styles.quizPercent}>{quiz.score}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weak Topics */}
            <div className={styles.card}>
              <div className={styles.cardHeaderRow}>
                <h2 className={styles.cardTitle}>⚠️ {pr.needsImprovement[lang]}</h2>
                <Link href="/practice" className="btn btn-ghost btn-sm">{tr.nav.practice[lang]} →</Link>
              </div>
              <div className={styles.topicsList}>
                {stats.weakTopics.map((topic, i) => (
                  <div key={i} className={styles.topicRow}>
                    <div className={styles.topicInfo}>
                      <span className={styles.topicDot} style={{ background: topic.score < 50 ? 'var(--error)' : 'var(--warning)' }} />
                      <div>
                        <span className={styles.topicName}>{localizedTopics[topic.name]?.[lang] || topic.name}</span>
                        <span className={styles.topicSubject}>{localizedSubjects[topic.subject]?.[lang] || topic.subject}</span>
                      </div>
                    </div>
                    <span className={`badge ${topic.score < 50 ? 'badge-error' : 'badge-warning'}`}>{topic.score}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Strong Topics */}
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>💪 {pr.strongAreas[lang]}</h2>
              <div className={styles.topicsList}>
                {stats.strongTopics.map((topic, i) => (
                  <div key={i} className={styles.topicRow}>
                    <div className={styles.topicInfo}>
                      <span className={styles.topicDot} style={{ background: 'var(--success)' }} />
                      <div>
                        <span className={styles.topicName}>{localizedTopics[topic.name]?.[lang] || topic.name}</span>
                        <span className={styles.topicSubject}>{localizedSubjects[topic.subject]?.[lang] || topic.subject}</span>
                      </div>
                    </div>
                    <span className="badge badge-success">{topic.score}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Recommendation */}
            <div className={`${styles.card} ${styles.aiRecommend}`}>
              <div className={styles.aiHeader}>
                <span className={styles.aiEmoji}>🤖</span>
                <h2 className={styles.cardTitle}>{pr.aiRecommendation[lang]}</h2>
              </div>
              <p className={styles.aiText}>
                {localizedRec[lang] || localizedRec.en}
              </p>
              <div className={styles.aiActions}>
                <Link href="/tutor" className="btn btn-primary btn-sm">💬 {tr.nav.tutor[lang]}</Link>
                <Link href="/practice" className="btn btn-secondary btn-sm">📝 {tr.nav.practice[lang]}</Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
