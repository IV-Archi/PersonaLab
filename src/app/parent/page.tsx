'use client';

import Navbar from '@/components/Navbar';
import { mockParentData } from '@/lib/ai-service';
import styles from './parent.module.css';

export default function ParentPage() {
  const d = mockParentData;
  const c = d.child;

  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>👨‍👩‍👧 Parent View</h1>
            <p className={styles.subtitle}>Hello, {d.parentName}. Here&apos;s {c.name}&apos;s learning update.</p>
          </div>

          {/* Quick Stats */}
          <div className={styles.quickStats}>
            <div className={`${styles.quickCard} ${c.studiedToday ? styles.studiedYes : styles.studiedNo}`}>
              <span className={styles.quickEmoji}>{c.studiedToday ? '✅' : '❌'}</span>
              <span className={styles.quickLabel}>{c.studiedToday ? 'Studied Today' : 'Not Studied Today'}</span>
            </div>
            <div className={`${styles.quickCard}`}>
              <span className={styles.quickEmoji}>🔥</span>
              <div>
                <span className={styles.quickVal}>{c.streakDays} Days</span>
                <span className={styles.quickLabel}>Study Streak</span>
              </div>
            </div>
            <div className={`${styles.quickCard}`}>
              <span className={styles.quickEmoji}>⏱️</span>
              <div>
                <span className={styles.quickVal}>{c.weeklyHours}h</span>
                <span className={styles.quickLabel}>This Week</span>
              </div>
            </div>
            <div className={`${styles.quickCard}`}>
              <span className={styles.quickEmoji}>📊</span>
              <div>
                <span className={styles.quickVal}>{c.overallProgress}%</span>
                <span className={styles.quickLabel}>Overall Progress</span>
              </div>
            </div>
          </div>

          <div className={styles.grid}>
            {/* Subjects */}
            <div className={`${styles.card}`}>
              <h2 className={styles.cardTitle}>📚 Subject Overview</h2>
              <div className={styles.subjectList}>
                {c.subjects.map((subj, i) => (
                  <div key={i} className={styles.subjectRow}>
                    <div className={styles.subjectInfo}>
                      <span className={styles.subjectName}>{subj.name}</span>
                      <span className={styles.subjectTrend}>
                        {subj.trend === 'improving' && '📈 Improving'}
                        {subj.trend === 'stable' && '➡️ Stable'}
                        {subj.trend === 'declining' && '📉 Needs Attention'}
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
            <div className={`${styles.card}`}>
              <h2 className={styles.cardTitle}>📋 Recent Activity</h2>
              <div className={styles.activityList}>
                {c.recentActivity.map((act, i) => (
                  <div key={i} className={styles.activityItem}>
                    <div className={styles.activityDot} />
                    <div className={styles.activityContent}>
                      <span className={styles.activityDate}>{act.date}</span>
                      <span className={styles.activityText}>{act.activity}</span>
                      <span className={styles.activitySubject}>{act.subject}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className={`${styles.card} ${styles.recsCard}`}>
              <h2 className={styles.cardTitle}>💡 Recommendations</h2>
              <div className={styles.recsList}>
                {c.recommendations.map((rec, i) => (
                  <div key={i} className={styles.recItem}>
                    <span className={styles.recIcon}>
                      {i === 0 ? '📌' : i === 1 ? '🌟' : i === 2 ? '⚠️' : '💪'}
                    </span>
                    <p>{rec}</p>
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
