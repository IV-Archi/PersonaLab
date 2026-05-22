'use client';

import { useState } from 'react';
import { useUser } from './UserContext';
import styles from './AuthModal.module.css';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { login, signUp, dbType } = useUser();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Multi-role selection states
  const [role, setRole] = useState<'user' | 'student' | 'teacher'>('user');
  const [studentType, setStudentType] = useState<'school' | 'uni'>('school');
  const [schoolGrade, setSchoolGrade] = useState('8th Grade');
  const [schoolInterest, setSchoolInterest] = useState('Mathematics');
  const [uniMajor, setUniMajor] = useState('Computer Science');
  const [uniYear, setUniYear] = useState('2nd Year (Sophomore)');
  const [teacherSubject, setTeacherSubject] = useState('Mathematics');
  const [teacherLevel, setTeacherLevel] = useState('High School');
  const [userGoal, setUserGoal] = useState('Software Engineer');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignUp) {
        if (!name.trim()) throw new Error('Please enter your name.');
        
        let finalCareerGoal = '';
        if (role === 'student') {
          if (studentType === 'school') {
            finalCareerGoal = `School Student (${schoolGrade}, Focus: ${schoolInterest})`;
          } else {
            finalCareerGoal = `University Student (${uniYear}, Major: ${uniMajor})`;
          }
        } else if (role === 'teacher') {
          finalCareerGoal = `Teacher (${teacherLevel}, Subject: ${teacherSubject})`;
        } else {
          finalCareerGoal = `General Learner (Goal: ${userGoal})`;
        }
        
        await signUp(email, name, finalCareerGoal, role);
      } else {
        await login(email);
      }
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>&times;</button>
        
        {success ? (
          <div className={styles.successScreen}>
            <div className={styles.successIcon}>🎉</div>
            <h2>{isSignUp ? 'Welcome to Persona Lab!' : 'Welcome Back!'}</h2>
            <p>Your session is synced and ready.</p>
            <div className={styles.syncBadge}>
              ☁️ Progress saved in {dbType === 'real' ? 'Supabase Database' : 'Simulated Database'}
            </div>
          </div>
        ) : (
          <>
            <div className={styles.tabs}>
              <button 
                className={`${styles.tab} ${!isSignUp ? styles.tabActive : ''}`} 
                onClick={() => { setIsSignUp(false); setError(''); }}
              >
                Sign In
              </button>
              <button 
                className={`${styles.tab} ${isSignUp ? styles.tabActive : ''}`} 
                onClick={() => { setIsSignUp(true); setError(''); }}
              >
                Create Account
              </button>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
              {error && <div className={styles.error}>{error}</div>}

              {isSignUp && (
                <div className={styles.formGroup}>
                  <label className={styles.label}>Full Name</label>
                  <input 
                    type="text" 
                    className={styles.input} 
                    placeholder="Arman Ivanov" 
                    value={name} 
                    onChange={e => setName(e.target.value)}
                    required
                  />
                </div>
              )}

              <div className={styles.formGroup}>
                <label className={styles.label}>Email Address</label>
                <input 
                  type="email" 
                  className={styles.input} 
                  placeholder="arman@example.com" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>

              {isSignUp && (
                <>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>I am registering as a...</label>
                    <select 
                      className={styles.input} 
                      value={role} 
                      onChange={e => setRole(e.target.value as any)}
                    >
                      <option value="user">👤 General User / Learner</option>
                      <option value="student">🎓 School or Uni Student</option>
                      <option value="teacher">🏫 Teacher / Instructor</option>
                    </select>
                  </div>

                  {role === 'student' && (
                    <>
                      <div className={styles.formGroup}>
                        <label className={styles.label}>Student Level</label>
                        <select 
                          className={styles.input} 
                          value={studentType} 
                          onChange={e => setStudentType(e.target.value as any)}
                        >
                          <option value="school">🎒 School Student</option>
                          <option value="uni">🎓 University / College</option>
                        </select>
                      </div>

                      {studentType === 'school' ? (
                        <>
                          <div className={styles.formGroup}>
                            <label className={styles.label}>Grade Level</label>
                            <select 
                              className={styles.input} 
                              value={schoolGrade} 
                              onChange={e => setSchoolGrade(e.target.value)}
                            >
                              <option value="Middle School (Grade 5-7)">Middle School (Grade 5-7)</option>
                              <option value="8th Grade">8th Grade</option>
                              <option value="9th Grade">9th Grade</option>
                              <option value="10th Grade">10th Grade</option>
                              <option value="11th Grade">11th Grade</option>
                              <option value="12th Grade">12th Grade</option>
                            </select>
                          </div>
                          <div className={styles.formGroup}>
                            <label className={styles.label}>Subject of Interest</label>
                            <select 
                              className={styles.input} 
                              value={schoolInterest} 
                              onChange={e => setSchoolInterest(e.target.value)}
                            >
                              <option value="Mathematics">🔢 Mathematics</option>
                              <option value="Natural Sciences">🔬 Natural Sciences</option>
                              <option value="Humanities & Languages">📖 Humanities & Languages</option>
                              <option value="IT / Computer Science">💻 IT & Coding</option>
                            </select>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className={styles.formGroup}>
                            <label className={styles.label}>Major / Area of Study</label>
                            <select 
                              className={styles.input} 
                              value={uniMajor} 
                              onChange={e => setUniMajor(e.target.value)}
                            >
                              <option value="Computer Science">💻 Computer Science</option>
                              <option value="Engineering">⚙️ Engineering</option>
                              <option value="Business & Economics">📈 Business & Economics</option>
                              <option value="Medicine & Biology">🧬 Medicine & Biology</option>
                              <option value="Physics & Mathematics">📐 Physics & Mathematics</option>
                              <option value="Arts & Humanities">🎨 Arts & Humanities</option>
                            </select>
                          </div>
                          <div className={styles.formGroup}>
                            <label className={styles.label}>Year of Study</label>
                            <select 
                              className={styles.input} 
                              value={uniYear} 
                              onChange={e => setUniYear(e.target.value)}
                            >
                              <option value="1st Year (Freshman)">1st Year (Freshman)</option>
                              <option value="2nd Year (Sophomore)">2nd Year (Sophomore)</option>
                              <option value="3rd Year (Junior)">3rd Year (Junior)</option>
                              <option value="4th Year+ (Senior)">4th Year+ (Senior)</option>
                              <option value="Graduate / Master's">Graduate / Master's</option>
                            </select>
                          </div>
                        </>
                      )}
                    </>
                  )}

                  {role === 'teacher' && (
                    <>
                      <div className={styles.formGroup}>
                        <label className={styles.label}>Subject Taught</label>
                        <select 
                          className={styles.input} 
                          value={teacherSubject} 
                          onChange={e => setTeacherSubject(e.target.value)}
                        >
                          <option value="Mathematics">🔢 Mathematics</option>
                          <option value="Sciences">🔬 Sciences & Engineering</option>
                          <option value="Humanities">📖 Humanities & Languages</option>
                          <option value="IT / Coding">💻 Computer Science & Coding</option>
                          <option value="Economics">📈 Economics & Finance</option>
                        </select>
                      </div>
                      <div className={styles.formGroup}>
                        <label className={styles.label}>Teaching Level</label>
                        <select 
                          className={styles.input} 
                          value={teacherLevel} 
                          onChange={e => setTeacherLevel(e.target.value)}
                        >
                          <option value="Middle School">Middle School</option>
                          <option value="High School">High School</option>
                          <option value="University / Higher Ed">University / Higher Ed</option>
                          <option value="Professional Tutor">Professional Tutor</option>
                        </select>
                      </div>
                    </>
                  )}

                  {role === 'user' && (
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Profession / Learning Goal</label>
                      <select 
                        className={styles.input} 
                        value={userGoal} 
                        onChange={e => setUserGoal(e.target.value)}
                      >
                        <option value="Software Engineer">💻 Software Engineer</option>
                        <option value="Data Scientist">📊 Data Scientist</option>
                        <option value="UI/UX Designer">🎨 UI/UX Designer</option>
                        <option value="Business Manager / Entrepreneur">📈 Business Manager / Entrepreneur</option>
                        <option value="Marketing Specialist">📢 Marketing Specialist</option>
                        <option value="General Continuing Education">📚 General Continuing Education</option>
                      </select>
                    </div>
                  )}
                </>
              )}

              <button type="submit" className={styles.submitBtn} disabled={loading}>
                {loading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Sign In'}
              </button>
            </form>

            <div className={styles.databaseInfo}>
              <div className={styles.dbHeader}>
                <span className={styles.dbPulse}></span>
                <strong>Cloud DB Connection Strategy</strong>
              </div>
              <p className={styles.dbDesc}>
                All learning stats, XP, streaks, weak/strong topics, and custom AI course paths are synchronized to the database.
              </p>
              <div className={styles.schemaBox}>
                <code>
                  {`CREATE TABLE profiles (
  id UUID REFERENCES auth.users,
  name TEXT,
  xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  career_goal TEXT,
  subject_progress JSONB,
  badges TEXT[]
);`}
                </code>
              </div>
              <div className={styles.dbStatus}>
                Status: {dbType === 'real' ? (
                  <span className={styles.statusOnline}>● Supabase Connected</span>
                ) : (
                  <span className={styles.statusSimulated}>● Simulated Local DB</span>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
