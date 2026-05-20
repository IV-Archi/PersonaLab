'use client';

import Navbar from '@/components/Navbar';
import { mockStudentData } from '@/lib/ai-service';
import Link from 'next/link';
import styles from './progress.module.css';

export default function ProgressPage() {
  const d = mockStudentData;
  const progressPercent = Math.round((d.completedLessons / d.totalLessons) * 100);
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const maxProgress = Math.max(...d.weeklyProgress);

  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>📊 Your Progress</h1>
            <p className={styles.subtitle}>Track your growth, see your strengths, and find areas to improve.</p>
          </div>

          {/* Overview Stats */}
          <div className={styles.overviewRow}>
            <div className={`${styles.overviewCard}`}>
              <span className={styles.overviewIcon}>📚</span>
              <div className={styles.overviewInfo}>
                <span className={styles.overviewValue}>{d.completedLessons}</span>
                <span className={styles.overviewLabel}>Lessons Completed</span>
              </div>
            </div>
            <div className={`${styles.overviewCard}`}>
              <span className={styles.overviewIcon}>🔥</span>
              <div className={styles.overviewInfo}>
                <span className={styles.overviewValue}>{d.streak} Days</span>
                <span className={styles.overviewLabel}>Study Streak</span>
              </div>
            </div>
            <div className={`${styles.overviewCard}`}>
              <span className={styles.overviewIcon}>🎯</span>
              <div className={styles.overviewInfo}>
                <span className={styles.overviewValue}>{progressPercent}%</span>
                <span className={styles.overviewLabel}>Overall Progress</span>
              </div>
            </div>
            <div className={`${styles.overviewCard}`}>
              <span className={styles.overviewIcon}>⭐</span>
              <div className={styles.overviewInfo}>
                <span className={styles.overviewValue}>{d.level}</span>
                <span className={styles.overviewLabel}>Current Level</span>
              </div>
            </div>
          </div>

          <div className={styles.grid}>
            {/* Weekly Chart */}
            <div className={`${styles.card} ${styles.chartCard}`}>
              <h2 className={styles.cardTitle}>📈 Weekly Progress</h2>
              <div className={styles.chart}>
                {d.weeklyProgress.map((val, i) => (
                  <div key={i} className={styles.chartCol}>
                    <div className={styles.chartBarWrap}>
                      <div className={styles.chartBar} style={{ height: `${(val / maxProgress) * 100}%` }}>
                        <span className={styles.chartBarValue}>{val}%</span>
                      </div>
                    </div>
                    <span className={styles.chartLabel}>{days[i]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Subject Progress */}
            <div className={`${styles.card}`}>
              <h2 className={styles.cardTitle}>📚 Subject Progress</h2>
              <div className={styles.subjectList}>
                {Object.entries(d.subjectProgress).map(([subject, progress]) => (
                  <div key={subject} className={styles.subjectItem}>
                    <div className={styles.subjectHeader}>
                      <span className={styles.subjectName}>
                        {subject === 'Math' ? '🔢' : subject === 'English' ? '📖' : subject === 'Science' ? '🔬' : '🏛️'} {subject}
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
            <div className={`${styles.card}`}>
              <h2 className={styles.cardTitle}>📝 Quiz History</h2>
              <div className={styles.quizHistory}>
                {d.recentQuizzes.map((quiz, i) => (
                  <div key={i} className={styles.quizRow}>
                    <div className={styles.quizInfo}>
                      <span className={styles.quizTopic}>{quiz.topic}</span>
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
            <div className={`${styles.card}`}>
              <div className={styles.cardHeaderRow}>
                <h2 className={styles.cardTitle}>⚠️ Needs Improvement</h2>
                <Link href="/practice" className="btn btn-ghost btn-sm">Practice →</Link>
              </div>
              <div className={styles.topicsList}>
                {d.weakTopics.map((topic, i) => (
                  <div key={i} className={styles.topicRow}>
                    <div className={styles.topicInfo}>
                      <span className={styles.topicDot} style={{ background: topic.score < 50 ? 'var(--error)' : 'var(--warning)' }} />
                      <div>
                        <span className={styles.topicName}>{topic.name}</span>
                        <span className={styles.topicSubject}>{topic.subject}</span>
                      </div>
                    </div>
                    <span className={`badge ${topic.score < 50 ? 'badge-error' : 'badge-warning'}`}>{topic.score}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Strong Topics */}
            <div className={`${styles.card}`}>
              <h2 className={styles.cardTitle}>💪 Strong Areas</h2>
              <div className={styles.topicsList}>
                {d.strongTopics.map((topic, i) => (
                  <div key={i} className={styles.topicRow}>
                    <div className={styles.topicInfo}>
                      <span className={styles.topicDot} style={{ background: 'var(--success)' }} />
                      <div>
                        <span className={styles.topicName}>{topic.name}</span>
                        <span className={styles.topicSubject}>{topic.subject}</span>
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
                <h2 className={styles.cardTitle}>AI Recommendation</h2>
              </div>
              <p className={styles.aiText}>
                Based on your quiz results, I recommend focusing on <strong>Fractions</strong> this week.
                Your score is 45%, which means the fundamentals need more practice. Start with the AI Tutor
                for a guided review, then try the practice exercises.
              </p>
              <div className={styles.aiActions}>
                <Link href="/tutor" className="btn btn-primary btn-sm">💬 Review with AI</Link>
                <Link href="/practice" className="btn btn-secondary btn-sm">📝 Practice</Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
