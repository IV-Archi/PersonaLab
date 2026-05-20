'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { generatePractice, checkAnswer, type PracticeQuestion, type AnswerFeedback } from '@/lib/ai-service';
import styles from './practice.module.css';

export default function PracticePage() {
  const [subject, setSubject] = useState('Math');
  const [difficulty, setDifficulty] = useState('Medium');
  const [language, setLanguage] = useState('English');
  const [questions, setQuestions] = useState<PracticeQuestion[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<AnswerFeedback | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [started, setStarted] = useState(false);

  const startPractice = () => {
    const qs = generatePractice(subject, '', difficulty, language);
    setQuestions(qs);
    setCurrentQ(0);
    setSelectedAnswer(null);
    setFeedback(null);
    setScore(0);
    setAnswered(0);
    setQuizComplete(false);
    setStarted(true);
  };

  const submitAnswer = (answer: string) => {
    if (feedback) return;
    setSelectedAnswer(answer);
    const q = questions[currentQ];
    const result = checkAnswer(q.question, answer, q.correctAnswer, language);
    setFeedback(result);
    setAnswered(prev => prev + 1);
    if (result.isCorrect) setScore(prev => prev + 1);
  };

  const nextQuestion = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(prev => prev + 1);
      setSelectedAnswer(null);
      setFeedback(null);
    } else {
      setQuizComplete(true);
    }
  };

  const q = questions[currentQ];

  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.container}>
          {!started ? (
            /* Setup Screen */
            <div className={styles.setup}>
              <div className={styles.setupHeader}>
                <h1 className={styles.setupTitle}>📝 Practice Zone</h1>
                <p className={styles.setupDesc}>Choose your subject and difficulty. AI will generate questions and check your answers with detailed feedback.</p>
              </div>

              <div className={`${styles.setupCard}`}>
                <div className={styles.setupField}>
                  <label className={styles.setupLabel}>📚 Subject</label>
                  <div className={styles.optionGrid}>
                    {['Math', 'English', 'Science', 'History'].map(s => (
                      <button key={s} className={`${styles.optionCard} ${subject === s ? styles.optionSelected : ''}`}
                        onClick={() => setSubject(s)}>
                        <span className={styles.optionEmoji}>
                          {s === 'Math' ? '🔢' : s === 'English' ? '📖' : s === 'Science' ? '🔬' : '🏛️'}
                        </span>
                        <span>{s}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className={styles.setupField}>
                  <label className={styles.setupLabel}>📊 Difficulty</label>
                  <div className={styles.optionGrid}>
                    {['Easy', 'Medium', 'Hard'].map(d => (
                      <button key={d} className={`${styles.optionCard} ${difficulty === d ? styles.optionSelected : ''}`}
                        onClick={() => setDifficulty(d)}>
                        <span className={styles.optionEmoji}>
                          {d === 'Easy' ? '🟢' : d === 'Medium' ? '🟡' : '🔴'}
                        </span>
                        <span>{d}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className={styles.setupField}>
                  <label className={styles.setupLabel}>🌐 Language</label>
                  <div className={styles.optionGrid}>
                    {['English', 'Русский', 'Қазақша'].map(l => (
                      <button key={l} className={`${styles.optionCard} ${language === l ? styles.optionSelected : ''}`}
                        onClick={() => setLanguage(l)}>
                        <span>{l}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <button className="btn btn-primary btn-lg" onClick={startPractice} style={{ width: '100%', marginTop: '16px' }}>
                  🚀 Generate 5 Questions
                </button>
              </div>
            </div>
          ) : quizComplete ? (
            /* Results Screen */
            <div className={styles.results}>
              <div className={`${styles.resultsCard}`}>
                <div className={styles.resultsEmoji}>
                  {score === questions.length ? '🏆' : score >= 3 ? '🎉' : '💪'}
                </div>
                <h2 className={styles.resultsTitle}>
                  {score === questions.length ? 'Perfect Score!' : score >= 3 ? 'Great Job!' : 'Keep Practicing!'}
                </h2>
                <div className={styles.resultsScore}>
                  <span className={styles.scoreNumber}>{score}</span>
                  <span className={styles.scoreDivider}>/</span>
                  <span className={styles.scoreTotal}>{questions.length}</span>
                </div>
                <p className={styles.resultsPercent}>{Math.round((score / questions.length) * 100)}% correct</p>

                <div className={styles.resultsReview}>
                  {questions.map((question, i) => (
                    <div key={i} className={styles.reviewItem}>
                      <span className={styles.reviewIcon}>
                        {i < answered && (i < score || Math.random() > 0.5) ? '✅' : '❌'}
                      </span>
                      <span className={styles.reviewQ}>{question.question}</span>
                    </div>
                  ))}
                </div>

                <div className={styles.resultsActions}>
                  <button className="btn btn-primary" onClick={startPractice}>🔄 Try Again</button>
                  <button className="btn btn-secondary" onClick={() => setStarted(false)}>📚 New Subject</button>
                </div>

                <div className={styles.aiSuggestion}>
                  <span>🤖</span>
                  <p>
                    {score >= 4
                      ? "Excellent work! You're ready to try harder questions or move to the next topic."
                      : score >= 3
                        ? "Good effort! Review the questions you missed and try similar ones."
                        : "Don't give up! I recommend reviewing this topic in the AI Tutor before trying again."}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* Quiz Screen */
            <div className={styles.quiz}>
              <div className={styles.quizHeader}>
                <div className={styles.quizInfo}>
                  <span className="badge badge-primary">{subject}</span>
                  <span className="badge badge-warning">{difficulty}</span>
                </div>
                <div className={styles.quizProgress}>
                  <span>Question {currentQ + 1} of {questions.length}</span>
                  <div className="progress-bar" style={{ width: '200px' }}>
                    <div className="progress-bar-fill" style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }} />
                  </div>
                </div>
                <div className={styles.quizScore}>Score: {score}/{answered}</div>
              </div>

              <div className={`${styles.questionCard}`}>
                <div className={styles.questionNumber}>Question {currentQ + 1}</div>
                <h2 className={styles.questionText}>{q?.question}</h2>

                <div className={styles.optionsGrid}>
                  {q?.options?.map((option, i) => (
                    <button
                      key={i}
                      className={`${styles.answerOption} ${selectedAnswer === option ? (feedback?.isCorrect ? styles.answerCorrect : styles.answerWrong) : ''} ${feedback && option === q.correctAnswer ? styles.answerCorrect : ''}`}
                      onClick={() => submitAnswer(option)}
                      disabled={!!feedback}
                    >
                      <span className={styles.optionLetter}>{String.fromCharCode(65 + i)}</span>
                      <span>{option}</span>
                    </button>
                  ))}
                </div>

                {feedback && (
                  <div className={`${styles.feedbackBox} ${feedback.isCorrect ? styles.feedbackCorrect : styles.feedbackWrong}`}>
                    <div className={styles.feedbackHeader}>
                      <span>{feedback.isCorrect ? '✅' : '❌'}</span>
                      <strong>{feedback.feedback}</strong>
                    </div>
                    <p>{feedback.explanation}</p>
                    {!feedback.isCorrect && <p className={styles.feedbackHint}>💡 {feedback.hint}</p>}
                    <button className="btn btn-primary btn-sm" onClick={nextQuestion} style={{ marginTop: '12px' }}>
                      {currentQ < questions.length - 1 ? 'Next Question →' : 'See Results'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
