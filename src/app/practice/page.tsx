'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { useApp } from '@/components/ThemeProvider';
import tr from '@/lib/translations';
import { generatePractice, checkAnswer as aiCheckAnswer, type PracticeQuestion, type AnswerFeedback } from '@/lib/ai-service';
import { getLocalStats, addQuizResult, addXP } from '@/lib/user-store';
import styles from './practice.module.css';

export default function PracticePage() {
  const { lang } = useApp();
  const pt = tr.practice;

  const [subject, setSubject] = useState('Math');
  const [difficulty, setDifficulty] = useState('Medium');
  const [questions, setQuestions] = useState<PracticeQuestion[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [typedAnswer, setTypedAnswer] = useState('');
  const [feedback, setFeedback] = useState<AnswerFeedback | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [started, setStarted] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Sync translation language parameter with practice generation
  const activeLangLabel = lang === 'kz' ? 'Қазақша' : lang === 'ru' ? 'Русский' : 'English';

  const startPractice = () => {
    const qs = generatePractice(subject, '', difficulty, activeLangLabel);
    setQuestions(qs);
    setCurrentQ(0);
    setSelectedAnswer(null);
    setTypedAnswer('');
    setFeedback(null);
    setScore(0);
    setAnswered(0);
    setQuizComplete(false);
    setStarted(true);
    setShowHint(false);
  };

  const submitAnswer = (answer: string) => {
    if (feedback) return;
    const q = questions[currentQ];
    const result = aiCheckAnswer(q.question, answer, q.correctAnswer, lang);
    setFeedback(result);
    setAnswered(prev => prev + 1);
    
    if (result.isCorrect) {
      setScore(prev => prev + 1);
      addXP(20); // Practice base XP
    } else {
      addXP(5); // Consolation XP
    }
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedAnswer.trim()) return;
    submitAnswer(typedAnswer.trim());
  };

  const nextQuestion = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(prev => prev + 1);
      setSelectedAnswer(null);
      setTypedAnswer('');
      setFeedback(null);
      setShowHint(false);
    } else {
      // Save quiz results to user progress store
      addQuizResult(subject + ' Practice', subject, Math.round((score / questions.length) * 100));
      setQuizComplete(true);
    }
  };

  const q = questions[currentQ];

  const subjectEmojis: Record<string, string> = {
    Math: '🔢',
    English: '📖',
    Science: '🔬',
    History: '🏛️',
    Geography: '🌍',
    Economics: '📈'
  };

  const subjectLabels: Record<string, Record<string, string>> = {
    Math: { en: 'Math', ru: 'Математика', kz: 'Математика' },
    English: { en: 'English', ru: 'Английский', kz: 'Ағылшын тілі' },
    Science: { en: 'Science', ru: 'Наука', kz: 'Жаратылыстану' },
    History: { en: 'History', ru: 'История', kz: 'Тарих' },
    Geography: { en: 'Geography', ru: 'География', kz: 'География' },
    Economics: { en: 'Economics', ru: 'Экономика', kz: 'Экономика' }
  };

  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.container}>
          
          {/* Trust Disclaimer */}
          <div className={styles.trustBanner}>
            <span className={styles.trustIcon}>🛡️</span>
            <p className={styles.trustText}>
              <strong>{tr.trust.guided[lang]}</strong> — {tr.trust.academicHonesty[lang]}
            </p>
          </div>

          {!started ? (
            /* Setup Screen */
            <div className={styles.setup}>
              <div className={styles.setupHeader}>
                <h1 className={styles.setupTitle}>📝 {pt.title[lang]}</h1>
                <p className={styles.setupDesc}>{pt.subtitle[lang]}</p>
              </div>

              <div className={styles.setupCard}>
                <div className={styles.setupField}>
                  <label className={styles.setupLabel}>{pt.subject[lang]}</label>
                  <div className={styles.optionGrid}>
                    {['Math', 'English', 'Science', 'History', 'Geography', 'Economics'].map(s => (
                      <button
                        key={s}
                        className={`${styles.optionCard} ${subject === s ? styles.optionSelected : ''}`}
                        onClick={() => setSubject(s)}
                      >
                        <span className={styles.optionEmoji}>{subjectEmojis[s] || '📚'}</span>
                        <span>{subjectLabels[s]?.[lang] || s}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className={styles.setupField}>
                  <label className={styles.setupLabel}>{pt.difficulty[lang]}</label>
                  <div className={styles.optionGrid}>
                    {[
                      { key: 'Easy', label: pt.easy[lang], emoji: '🟢' },
                      { key: 'Medium', label: pt.medium[lang], emoji: '🟡' },
                      { key: 'Hard', label: pt.hard[lang], emoji: '🔴' }
                    ].map(d => (
                      <button
                        key={d.key}
                        className={`${styles.optionCard} ${difficulty === d.key ? styles.optionSelected : ''}`}
                        onClick={() => setDifficulty(d.key)}
                      >
                        <span className={styles.optionEmoji}>{d.emoji}</span>
                        <span>{d.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <button className="btn btn-primary btn-lg" onClick={startPractice} style={{ width: '100%', marginTop: '16px' }}>
                  ⚡ {pt.generate[lang]}
                </button>
              </div>
            </div>
          ) : quizComplete ? (
            /* Results Screen */
            <div className={styles.results}>
              <div className={styles.resultsCard}>
                <div className={styles.resultsEmoji}>
                  {score === questions.length ? '🏆' : score >= 2 ? '🎉' : '💪'}
                </div>
                <h2 className={styles.resultsTitle}>
                  {score === questions.length 
                    ? (lang === 'kz' ? 'Керемет нәтиже!' : lang === 'ru' ? 'Идеальный результат!' : 'Perfect Score!') 
                    : score >= 2 
                      ? (lang === 'kz' ? 'Жақсы жұмыс!' : lang === 'ru' ? 'Отличная работа!' : 'Great Job!') 
                      : (lang === 'kz' ? 'Жаттығуды жалғастырыңыз!' : lang === 'ru' ? 'Продолжайте практиковаться!' : 'Keep Practicing!')
                  }
                </h2>
                <div className={styles.resultsScore}>
                  <span className={styles.scoreNumber}>{score}</span>
                  <span className={styles.scoreDivider}>/</span>
                  <span className={styles.scoreTotal}>{questions.length}</span>
                </div>
                <p className={styles.resultsPercent}>{Math.round((score / questions.length) * 100)}% {lang === 'kz' ? 'дұрыс' : lang === 'ru' ? 'верно' : 'correct'}</p>

                <div className={styles.resultsReview}>
                  {questions.map((question, i) => (
                    <div key={i} className={styles.reviewItem}>
                      <span className={styles.reviewIcon}>
                        {i === 0 && score > 0 ? '✅' : i === 1 && score > 1 ? '✅' : '❌'}
                      </span>
                      <span className={styles.reviewQ}>{question.question}</span>
                    </div>
                  ))}
                </div>

                <div className={styles.resultsActions}>
                  <button className="btn btn-primary" onClick={startPractice}>🔄 {pt.tryAgain[lang]}</button>
                  <button className="btn btn-secondary" onClick={() => setStarted(false)}>📚 {lang === 'kz' ? 'Басқа пән' : lang === 'ru' ? 'Другой предмет' : 'New Subject'}</button>
                </div>

                <div className={styles.aiSuggestion}>
                  <span>🤖</span>
                  <p>
                    {score >= 2
                      ? (lang === 'kz' ? "Жарайсың! Сіз келесі тақырыптарға өтуге дайынсыз." : lang === 'ru' ? "Отлично! Вы готовы переходить к следующей теме." : "Excellent! You are ready to advance to the next topic.")
                      : (lang === 'kz' ? "Берілмеңіз! AI Тьютормен тақырыпты тағы бір рет қарап шығуды ұсынамын." : lang === 'ru' ? "Не сдавайтесь! Рекомендую повторить эту тему с AI Репетитором." : "Don't give up! We recommend reviewing this topic with the AI Tutor.")}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* Quiz Screen */
            <div className={styles.quiz}>
              <div className={styles.quizHeader}>
                <div className={styles.quizInfo}>
                  <span className="badge badge-primary">{subjectLabels[subject]?.[lang] || subject}</span>
                  <span className="badge badge-warning">
                    {difficulty === 'Easy' ? pt.easy[lang] : difficulty === 'Medium' ? pt.medium[lang] : pt.hard[lang]}
                  </span>
                </div>
                <div className={styles.quizProgress}>
                  <span>{lang === 'kz' ? `Сұрақ ${currentQ + 1} / ${questions.length}` : lang === 'ru' ? `Вопрос ${currentQ + 1} из ${questions.length}` : `Question ${currentQ + 1} of ${questions.length}`}</span>
                  <div className="progress-bar" style={{ width: '200px' }}>
                    <div className="progress-bar-fill" style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }} />
                  </div>
                </div>
                <div className={styles.quizScore}>{pt.score[lang]}: {score}/{answered}</div>
              </div>

              <div className={styles.questionCard}>
                <div className={styles.questionNumber}>{pt.question[lang]} {currentQ + 1}</div>
                <h2 className={styles.questionText}>{q?.question}</h2>

                {/* Input types handling */}
                {q?.options && q.options.length > 0 ? (
                  <div className={styles.optionsGrid}>
                    {q.options.map((option, i) => (
                      <button
                        key={i}
                        className={`${styles.answerOption} ${selectedAnswer === option ? (feedback?.isCorrect ? styles.answerCorrect : styles.answerWrong) : ''} ${feedback && option === q.correctAnswer ? styles.answerCorrect : ''}`}
                        onClick={() => {
                          setSelectedAnswer(option);
                          submitAnswer(option);
                        }}
                        disabled={!!feedback}
                      >
                        <span className={styles.optionLetter}>{String.fromCharCode(65 + i)}</span>
                        <span>{option}</span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <form onSubmit={handleTextSubmit} className={styles.textInputForm}>
                    <input
                      type="text"
                      className="input-field"
                      placeholder={lang === 'kz' ? 'Жауабыңызды осында жазыңыз...' : lang === 'ru' ? 'Введите ваш ответ здесь...' : 'Type your answer here...'}
                      value={typedAnswer}
                      onChange={e => setTypedAnswer(e.target.value)}
                      disabled={!!feedback}
                      style={{ marginBottom: '12px', width: '100%' }}
                    />
                    {!feedback && (
                      <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                        🔍 {pt.check[lang]}
                      </button>
                    )}
                  </form>
                )}

                {/* Hint Button */}
                {!feedback && (
                  <div style={{ marginTop: '12px' }}>
                    <button className="btn btn-ghost btn-sm" onClick={() => setShowHint(!showHint)}>
                      💡 {showHint ? (lang === 'kz' ? 'Жасыру' : lang === 'ru' ? 'Скрыть подсказку' : 'Hide Hint') : pt.hint[lang]}
                    </button>
                    {showHint && (
                      <p className={styles.hintText} style={{ marginTop: '8px', fontStyle: 'italic', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                        {lang === 'kz' ? 'Анықтама немесе бірінші қадамды орындап көріңіз.' : lang === 'ru' ? 'Вспомните формулу или сделайте первый шаг.' : 'Think about the core concept or try the first step.'}
                      </p>
                    )}
                  </div>
                )}

                {feedback && (
                  <div className={`${styles.feedbackBox} ${feedback.isCorrect ? styles.feedbackCorrect : styles.feedbackWrong}`}>
                    <div className={styles.feedbackHeader}>
                      <span>{feedback.isCorrect ? '✅' : '❌'}</span>
                      <strong>{feedback.feedback}</strong>
                    </div>
                    <p style={{ marginTop: '8px' }}>{feedback.explanation}</p>
                    {!feedback.isCorrect && <p className={styles.feedbackHint}>💡 {feedback.hint}</p>}
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px' }}>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        🛡️ {pt.disclosure[lang]}
                      </p>
                      <button className="btn btn-primary btn-sm" onClick={nextQuestion} style={{ width: 'fit-content' }}>
                        {currentQ < questions.length - 1 
                          ? (lang === 'kz' ? 'Келесі сұрақ →' : lang === 'ru' ? 'Следующий вопрос →' : 'Next Question →') 
                          : (lang === 'kz' ? 'Нәтижелерді көру' : lang === 'ru' ? 'Посмотреть результаты' : 'See Results')
                        }
                      </button>
                    </div>
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
