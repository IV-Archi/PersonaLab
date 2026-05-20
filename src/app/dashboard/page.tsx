'use client';

import Navbar from '@/components/Navbar';
import { mockStudentData } from '@/lib/ai-service';
import Link from 'next/link';
import styles from './dashboard.module.css';

export default function DashboardPage() {
  const d = mockStudentData;
  const progressPercent = Math.round((d.completedLessons / d.totalLessons) * 100);

  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.container}>
          {/* Header */}
          <div className={styles.header}>
            <div>
              <h1 className={styles.greeting}>Welcome back, {d.name}! 👋</h1>
              <p className={styles.subtitle}>Let&apos;s continue learning. You&apos;re doing great!</p>
            </div>
            <div className={styles.headerActions}>
              <Link href="/tutor" className="btn btn-primary">💬 AI Tutor</Link>
              <Link href="/practice" className="btn btn-secondary">📝 Practice</Link>
            </div>
          </div>

          {/* Stats Row */}
          <div className={styles.statsRow}>
            <div className={`${styles.statCard}`}>
              <div className={styles.statIcon}>🔥</div>
              <div className={styles.statInfo}>
                <span className={styles.statValue}>{d.streak}</span>
                <span className={styles.statLabel}>Day Streak</span>
              </div>
            </div>
            <div className={`${styles.statCard}`}>
              <div className={styles.statIcon}>📚</div>
              <div className={styles.statInfo}>
                <span className={styles.statValue}>{d.completedLessons}/{d.totalLessons}</span>
                <span className={styles.statLabel}>Lessons Done</span>
              </div>
            </div>
            <div className={`${styles.statCard}`}>
              <div className={styles.statIcon}>⭐</div>
              <div className={styles.statInfo}>
                <span className={styles.statValue}>{d.level}</span>
                <span className={styles.statLabel}>Current Level</span>
              </div>
            </div>
            <div className={`${styles.statCard}`}>
              <div className={styles.statIcon}>🎯</div>
              <div className={styles.statInfo}>
                <span className={styles.statValue}>{d.weeklyCompleted}/{d.weeklyGoal}</span>
                <span className={styles.statLabel}>Weekly Goal</span>
              </div>
            </div>
          </div>

          {/* Main Grid */}
          <div className={styles.grid}>
            {/* Today's Plan */}
            <div className={`${styles.card}`}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>📋 Today&apos;s Plan</h2>
                <span className="badge badge-primary">{d.todayPlan.filter(t => t.done).length}/{d.todayPlan.length}</span>
              </div>
              <div className={styles.planList}>
                {d.todayPlan.map((task) => (
                  <div key={task.id} className={`${styles.planItem} ${task.done ? styles.planDone : ''}`}>
                    <div className={styles.planCheck}>{task.done ? '✅' : '⬜'}</div>
                    <div className={styles.planInfo}>
                      <span className={styles.planTitle}>{task.title}</span>
                      <span className={styles.planMeta}>{task.subject} • {task.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Overall Progress */}
            <div className={`${styles.card}`}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>📈 Overall Progress</h2>
                <span className="badge badge-success">{progressPercent}%</span>
              </div>
              <div className={styles.progressRing}>
                <svg viewBox="0 0 120 120" className={styles.ringChart}>
                  <circle cx="60" cy="60" r="50" className={styles.ringBg} />
                  <circle cx="60" cy="60" r="50" className={styles.ringFill}
                    style={{ strokeDashoffset: `${314 - (314 * progressPercent) / 100}` }} />
                </svg>
                <div className={styles.ringLabel}>
                  <span className={styles.ringValue}>{progressPercent}%</span>
                  <span className={styles.ringText}>Complete</span>
                </div>
              </div>
              <div className={styles.subjectBars}>
                {Object.entries(d.subjectProgress).map(([subject, progress]) => (
                  <div key={subject} className={styles.subjectBar}>
                    <div className={styles.subjectBarHeader}>
                      <span>{subject}</span>
                      <span className={styles.subjectPercent}>{progress}%</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weak Topics */}
            <div className={`${styles.card}`}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>⚠️ Weak Topics</h2>
                <Link href="/practice" className="btn btn-ghost btn-sm">Practice →</Link>
              </div>
              <div className={styles.topicList}>
                {d.weakTopics.map((topic, i) => (
                  <div key={i} className={styles.topicItem}>
                    <div className={styles.topicInfo}>
                      <span className={styles.topicName}>{topic.name}</span>
                      <span className={styles.topicSubject}>{topic.subject}</span>
                    </div>
                    <div className={styles.topicScore}>
                      <span className={`badge ${topic.score < 50 ? 'badge-error' : 'badge-warning'}`}>
                        {topic.score}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Quizzes */}
            <div className={`${styles.card}`}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>📝 Recent Quizzes</h2>
                <Link href="/progress" className="btn btn-ghost btn-sm">View All →</Link>
              </div>
              <div className={styles.quizList}>
                {d.recentQuizzes.map((quiz, i) => (
                  <div key={i} className={styles.quizItem}>
                    <div className={styles.quizInfo}>
                      <span className={styles.quizTopic}>{quiz.topic}</span>
                      <span className={styles.quizDate}>{quiz.date}</span>
                    </div>
                    <div className={styles.quizScore}>
                      <span className={`badge ${quiz.score >= 80 ? 'badge-success' : quiz.score >= 60 ? 'badge-warning' : 'badge-error'}`}>
                        {quiz.score}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Recommendation */}
            <div className={`${styles.card} ${styles.aiCard}`}>
              <div className={styles.aiCardContent}>
                <div className={styles.aiAvatar}>🤖</div>
                <h3>AI Recommendation</h3>
                <p>You scored below 70% on <strong>Fractions</strong>. I recommend reviewing it with simpler examples before moving on.</p>
                <div className={styles.aiActions}>
                  <Link href="/tutor" className="btn btn-primary btn-sm">Review with AI</Link>
                  <Link href="/practice" className="btn btn-secondary btn-sm">Practice Now</Link>
                </div>
              </div>
            </div>

            {/* Strong Topics */}
            <div className={`${styles.card}`}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>💪 Strong Topics</h2>
              </div>
              <div className={styles.topicList}>
                {d.strongTopics.map((topic, i) => (
                  <div key={i} className={styles.topicItem}>
                    <div className={styles.topicInfo}>
                      <span className={styles.topicName}>{topic.name}</span>
                      <span className={styles.topicSubject}>{topic.subject}</span>
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
