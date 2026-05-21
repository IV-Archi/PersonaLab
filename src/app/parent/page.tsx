'use client';

import Navbar from '@/components/Navbar';
import { useApp } from '@/components/ThemeProvider';
import tr from '@/lib/translations';
import { mockParentData } from '@/lib/ai-service';
import styles from './parent.module.css';

export default function ParentPage() {
  const { lang } = useApp();
  const t = tr.parent;
  const d = mockParentData;
  const c = d.child;

  const localizedSubjects: Record<string, Record<string, string>> = {
    Math: { en: 'Math', ru: 'Математика', kz: 'Математика' },
    English: { en: 'English', ru: 'Английский', kz: 'Ағылшын тілі' },
    Science: { en: 'Science', ru: 'Наука', kz: 'Жаратылыстану' },
    History: { en: 'History', ru: 'История', kz: 'Тарих' },
    Geography: { en: 'Geography', ru: 'География', kz: 'География' },
    Economics: { en: 'Economics', ru: 'Экономика', kz: 'Экономика' }
  };

  const localizedTrends: Record<string, Record<string, string>> = {
    improving: { en: '📈 Improving', ru: '📈 Улучшается', kz: '📈 Жақсаруда' },
    stable: { en: '➡️ Stable', ru: '➡️ Стабильно', kz: '➡️ Тұрақты' },
    declining: { en: '📉 Needs Attention', ru: '📉 Требует внимания', kz: '📉 Назар аударуды қажет' }
  };

  const localizedActivities: Record<string, Record<string, string>> = {
    'Completed Algebra quiz (80%)': {
      en: 'Completed Algebra quiz (80%)',
      ru: 'Выполнил тест по алгебре (80%)',
      kz: 'Алгебрадан тест тапсырды (80%)'
    },
    'Practiced Grammar exercises': {
      en: 'Practiced Grammar exercises',
      ru: 'Практиковал грамматические упражнения',
      kz: 'Грамматикалық жаттығуларды орындады'
    }
  };

  const localizedRecs = [
    {
      en: "Focus on Fractions — it's currently a weak area.",
      ru: "Обратите внимание на дроби — на данный момент это слабая область.",
      kz: "Бөлшектерге назар аударыңыз — бұл қазіргі уақытта әлсіз тұсы."
    },
    {
      en: "Good progress in Science! Keep encouraging Alex.",
      ru: "Отличный прогресс в науке! Продолжайте поддерживать Алекса.",
      kz: "Жаратылыстанудан жақсы прогресс! Алексті қолдауды жалғастырыңыз."
    }
  ];

  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.container}>
          
          {/* Integrity Disclaimer */}
          <div className={styles.integrityBanner}>
            <span className={styles.integrityIcon}>🛡️</span>
            <p className={styles.integrityText}>
              <strong>{lang === 'kz' ? 'Академиялық адалдық кепілдігі:' : lang === 'ru' ? 'Гарантия честности:' : 'Academic Integrity Shield:'}</strong> {t.parentNote[lang]}
            </p>
          </div>

          <div className={styles.header}>
            <h1 className={styles.title}>👨‍👩‍👧 {t.title[lang]}</h1>
            <p className={styles.subtitle}>
              {lang === 'kz' ? `Сәлеметсіз бе, ${d.parentName}. Мұнда ${c.name} есімінің оқу нәтижелері бар:` :
               lang === 'ru' ? `Здравствуйте, ${d.parentName}. Обзор успеваемости ${c.name}:` :
               `Hello, ${d.parentName}. Here's ${c.name}'s learning update.`}
            </p>
          </div>

          {/* Quick Stats */}
          <div className={styles.quickStats}>
            <div className={`${styles.quickCard} ${c.studiedToday ? styles.studiedYes : styles.studiedNo}`}>
              <span className={styles.quickEmoji}>{c.studiedToday ? '✅' : '❌'}</span>
              <span className={styles.quickLabel}>{c.studiedToday ? t.studiedToday[lang] : t.notStudied[lang]}</span>
            </div>
            <div className={styles.quickCard}>
              <span className={styles.quickEmoji}>🔥</span>
              <div>
                <span className={styles.quickVal}>{c.streakDays} {lang === 'kz' ? 'күн' : lang === 'ru' ? 'дней' : 'Days'}</span>
                <span className={styles.quickLabel}>{t.studyStreak[lang]}</span>
              </div>
            </div>
            <div className={styles.quickCard}>
              <span className={styles.quickEmoji}>⏱️</span>
              <div>
                <span className={styles.quickVal}>{c.weeklyHours}h</span>
                <span className={styles.quickLabel}>{t.thisWeek[lang]}</span>
              </div>
            </div>
            <div className={styles.quickCard}>
              <span className={styles.quickEmoji}>📊</span>
              <div>
                <span className={styles.quickVal}>{c.overallProgress}%</span>
                <span className={styles.quickLabel}>{t.overallProgress[lang]}</span>
              </div>
            </div>
          </div>

          <div className={styles.grid}>
            {/* Subjects */}
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>📚 {t.subjectOverview[lang]}</h2>
              <div className={styles.subjectList}>
                {c.subjects.map((subj, i) => (
                  <div key={i} className={styles.subjectRow}>
                    <div className={styles.subjectInfo}>
                      <span className={styles.subjectName}>{localizedSubjects[subj.name]?.[lang] || subj.name}</span>
                      <span className={styles.subjectTrend}>
                        {localizedTrends[subj.trend]?.[lang] || subj.trend}
                      </span>
                    </div>
                    <div className={styles.subjectProgress}>
                      <div className="progress-bar" style={{ width: '120px' }}>
                        <div className="progress-bar-fill" style={{ width: `${subj.progress}%` }} />
                      </div>
                      <span className={`badge ${subj.progress >= 80 ? 'badge-success' : subj.progress >= 60 ? 'badge-warning' : 'badge-error'}`}>
                        {subj.progress}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>📋 {t.recentActivity[lang]}</h2>
              <div className={styles.activityList}>
                {c.recentActivity.map((act, i) => (
                  <div key={i} className={styles.activityItem}>
                    <div className={styles.activityDot} />
                    <div className={styles.activityContent}>
                      <span className={styles.activityDate}>
                        {act.date === 'Today' ? (lang === 'kz' ? 'Бүгін' : lang === 'ru' ? 'Сегодня' : 'Today') :
                         act.date === 'Yesterday' ? (lang === 'kz' ? 'Кеше' : lang === 'ru' ? 'Вчера' : 'Yesterday') :
                         act.date}
                      </span>
                      <span className={styles.activityText}>{localizedActivities[act.activity]?.[lang] || act.activity}</span>
                      <span className={styles.activitySubject}>{localizedSubjects[act.subject]?.[lang] || act.subject}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className={`${styles.card} ${styles.recsCard}`}>
              <h2 className={styles.cardTitle}>💡 {t.recommendations[lang]}</h2>
              <div className={styles.recsList}>
                {c.recommendations.map((rec, i) => (
                  <div key={i} className={styles.recItem}>
                    <span className={styles.recIcon}>
                      {i === 0 ? '📌' : i === 1 ? '🌟' : i === 2 ? '⚠️' : '💪'}
                    </span>
                    <p>{localizedRecs[i]?.[lang] || rec}</p>
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
