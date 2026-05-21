'use client';

import Navbar from '@/components/Navbar';
import { useApp } from '@/components/ThemeProvider';
import tr from '@/lib/translations';
import { mockStudentData } from '@/lib/ai-service';
import Link from 'next/link';
import styles from './dashboard.module.css';

export default function DashboardPage() {
  const { lang } = useApp();
  const d = mockStudentData;
  const dt = tr.dashboard;
  const progressPercent = Math.round((d.completedLessons / d.totalLessons) * 100);

  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.container}>
          <div className={styles.header}>
            <div>
              <h1 className={styles.greeting}>{dt.welcome[lang]}, {d.name}</h1>
              <p className={styles.subtitle}>{dt.subtitle[lang]}</p>
            </div>
            <div className={styles.headerActions}>
              <Link href="/tutor" className="btn btn-primary">{tr.nav.tutor[lang]}</Link>
              <Link href="/practice" className="btn btn-secondary">{tr.nav.practice[lang]}</Link>
            </div>
          </div>

          <div className={styles.statsRow}>
            {[
              { icon: '🔥', value: d.streak, label: dt.streak[lang] },
              { icon: '📚', value: `${d.completedLessons}/${d.totalLessons}`, label: dt.lessons[lang] },
              { icon: '⭐', value: d.level, label: dt.level[lang] },
              { icon: '🎯', value: `${d.weeklyCompleted}/${d.weeklyGoal}`, label: dt.weeklyGoal[lang] },
            ].map((s, i) => (
              <div key={i} className={styles.statCard}>
                <div className={styles.statIcon}>{s.icon}</div>
                <div className={styles.statInfo}><span className={styles.statValue}>{s.value}</span><span className={styles.statLabel}>{s.label}</span></div>
              </div>
            ))}
          </div>

          <div className={styles.grid}>
            <div className={styles.card}>
              <div className={styles.cardHeader}><h2 className={styles.cardTitle}>{dt.todayPlan[lang]}</h2><span className="badge badge-brand">{d.todayPlan.filter(t => t.done).length}/{d.todayPlan.length}</span></div>
              <div className={styles.planList}>
                {d.todayPlan.map(task => (
                  <div key={task.id} className={`${styles.planItem} ${task.done ? styles.planDone : ''}`}>
                    <div className={styles.planCheck}>{task.done ? '✓' : '○'}</div>
                    <div className={styles.planInfo}><span className={styles.planTitle}>{task.title}</span><span className={styles.planMeta}>{task.subject} · {task.duration}</span></div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardHeader}><h2 className={styles.cardTitle}>{dt.overall[lang]}</h2><span className="badge badge-success">{progressPercent}%</span></div>
              <div className={styles.progressRing}>
                <svg viewBox="0 0 120 120" className={styles.ringChart}>
                  <circle cx="60" cy="60" r="50" className={styles.ringBg} />
                  <circle cx="60" cy="60" r="50" className={styles.ringFill} style={{ strokeDashoffset: `${314 - (314 * progressPercent) / 100}` }} />
                </svg>
                <div className={styles.ringLabel}><span className={styles.ringValue}>{progressPercent}%</span><span className={styles.ringText}>{dt.complete[lang]}</span></div>
              </div>
              <div className={styles.subjectBars}>
                {Object.entries(d.subjectProgress).map(([subject, progress]) => (
                  <div key={subject} className={styles.subjectBar}>
                    <div className={styles.subjectBarHeader}><span>{subject}</span><span className={styles.subjectPercent}>{progress}%</span></div>
                    <div className="progress-bar"><div className="progress-bar-fill" style={{ width: `${progress}%` }} /></div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardHeader}><h2 className={styles.cardTitle}>{dt.weak[lang]}</h2><Link href="/practice" className="btn btn-ghost btn-sm">{tr.nav.practice[lang]} →</Link></div>
              <div className={styles.topicList}>
                {d.weakTopics.map((topic, i) => (
                  <div key={i} className={styles.topicItem}>
                    <div className={styles.topicInfo}><span className={styles.topicName}>{topic.name}</span><span className={styles.topicSubject}>{topic.subject}</span></div>
                    <span className={`badge ${topic.score < 50 ? 'badge-error' : 'badge-warning'}`}>{topic.score}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardHeader}><h2 className={styles.cardTitle}>{dt.quizzes[lang]}</h2><Link href="/progress" className="btn btn-ghost btn-sm">{tr.nav.progress[lang]} →</Link></div>
              <div className={styles.quizList}>
                {d.recentQuizzes.map((quiz, i) => (
                  <div key={i} className={styles.quizItem}>
                    <div className={styles.quizInfo}><span className={styles.quizTopic}>{quiz.topic}</span><span className={styles.quizDate}>{quiz.date}</span></div>
                    <span className={`badge ${quiz.score >= 80 ? 'badge-success' : quiz.score >= 60 ? 'badge-warning' : 'badge-error'}`}>{quiz.score}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={`${styles.card} ${styles.aiCard}`}>
              <div className={styles.aiCardContent}>
                <h3>{dt.aiRec[lang]}</h3>
                <p>You scored below 70% on <strong>Fractions</strong>. I recommend reviewing it with simpler examples before moving on.</p>
                <div className={styles.aiActions}>
                  <Link href="/tutor" className="btn btn-primary btn-sm">{tr.nav.tutor[lang]}</Link>
                  <Link href="/practice" className="btn btn-secondary btn-sm">{tr.nav.practice[lang]}</Link>
                </div>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardHeader}><h2 className={styles.cardTitle}>{dt.strong[lang]}</h2></div>
              <div className={styles.topicList}>
                {d.strongTopics.map((topic, i) => (
                  <div key={i} className={styles.topicItem}>
                    <div className={styles.topicInfo}><span className={styles.topicName}>{topic.name}</span><span className={styles.topicSubject}>{topic.subject}</span></div>
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
