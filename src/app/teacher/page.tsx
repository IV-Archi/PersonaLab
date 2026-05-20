'use client';

import Navbar from '@/components/Navbar';
import { mockTeacherData } from '@/lib/ai-service';
import styles from './teacher.module.css';

export default function TeacherPage() {
  const d = mockTeacherData;

  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.container}>
          <div className={styles.header}>
            <div>
              <h1 className={styles.title}>👩‍🏫 Teacher Dashboard</h1>
              <p className={styles.subtitle}>Welcome, {d.name}. Here&apos;s your class overview.</p>
            </div>
            <button className="btn btn-primary">📝 Create Assignment</button>
          </div>

          {/* Overview */}
          <div className={styles.statsRow}>
            <div className={`${styles.statCard}`}>
              <span className={styles.statIcon}>👥</span>
              <div>
                <span className={styles.statVal}>{d.totalStudents}</span>
                <span className={styles.statLabel}>Total Students</span>
              </div>
            </div>
            <div className={`${styles.statCard}`}>
              <span className={styles.statIcon}>📊</span>
              <div>
                <span className={styles.statVal}>{d.classAverage}%</span>
                <span className={styles.statLabel}>Class Average</span>
              </div>
            </div>
            <div className={`${styles.statCard}`}>
              <span className={styles.statIcon}>⚠️</span>
              <div>
                <span className={styles.statVal}>{d.students.filter(s => s.progress < 50).length}</span>
                <span className={styles.statLabel}>Need Attention</span>
              </div>
            </div>
            <div className={`${styles.statCard}`}>
              <span className={styles.statIcon}>🌟</span>
              <div>
                <span className={styles.statVal}>{d.students.filter(s => s.progress >= 80).length}</span>
                <span className={styles.statLabel}>Top Performers</span>
              </div>
            </div>
          </div>

          <div className={styles.grid}>
            {/* Student List */}
            <div className={`${styles.card} ${styles.studentsCard}`}>
              <h2 className={styles.cardTitle}>👥 Students</h2>
              <div className={styles.studentTable}>
                <div className={styles.tableHeader}>
                  <span>Student</span>
                  <span>Level</span>
                  <span>Progress</span>
                  <span>Weak Topic</span>
                  <span>Last Active</span>
                </div>
                {d.students.map(student => (
                  <div key={student.id} className={styles.tableRow}>
                    <span className={styles.studentName}>{student.name}</span>
                    <span>
                      <span className={`badge ${student.level === 'Advanced' ? 'badge-success' : student.level === 'Intermediate' ? 'badge-warning' : 'badge-error'}`}>
                        {student.level}
                      </span>
                    </span>
                    <span className={styles.progressCell}>
                      <div className="progress-bar" style={{ width: '80px' }}>
                        <div className="progress-bar-fill" style={{ width: `${student.progress}%` }} />
                      </div>
                      <span className={styles.progressNum}>{student.progress}%</span>
                    </span>
                    <span className={styles.weakTopic}>{student.weakTopic}</span>
                    <span className={styles.lastActive}>{student.lastActive}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Class Weak Topics */}
            <div className={`${styles.card}`}>
              <h2 className={styles.cardTitle}>⚠️ Class Weak Topics</h2>
              <div className={styles.weakList}>
                {d.classWeakTopics.map((topic, i) => (
                  <div key={i} className={styles.weakItem}>
                    <div className={styles.weakInfo}>
                      <span className={styles.weakName}>{topic.topic}</span>
                      <span className={styles.weakCount}>{topic.studentsStruggling} students struggling</span>
                    </div>
                    <div className="progress-bar" style={{ flex: 1, maxWidth: '120px' }}>
                      <div className="progress-bar-fill" style={{
                        width: `${(topic.studentsStruggling / d.totalStudents) * 100}%`,
                        background: 'linear-gradient(90deg, var(--error), var(--warning))'
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Suggestions */}
            <div className={`${styles.card} ${styles.aiCard}`}>
              <h2 className={styles.cardTitle}>🤖 AI Teaching Suggestions</h2>
              <div className={styles.suggestionList}>
                <div className={styles.suggestion}>
                  <span>📌</span>
                  <p><strong>Fractions Review:</strong> 12 students struggle with fractions. Consider a group review session with visual examples.</p>
                </div>
                <div className={styles.suggestion}>
                  <span>⚡</span>
                  <p><strong>Arman D. needs help:</strong> Progress is at 38% and inactive for 3 days. Reach out personally.</p>
                </div>
                <div className={styles.suggestion}>
                  <span>🌟</span>
                  <p><strong>Dana M. is ready:</strong> With 92% progress, consider giving advanced challenges or peer tutoring role.</p>
                </div>
                <div className={styles.suggestion}>
                  <span>📝</span>
                  <p><strong>Essay Writing workshop:</strong> 9 students need help. AI can generate targeted writing exercises.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
