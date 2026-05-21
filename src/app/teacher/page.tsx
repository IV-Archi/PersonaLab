'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { useApp } from '@/components/ThemeProvider';
import tr from '@/lib/translations';
import { mockTeacherData } from '@/lib/ai-service';
import styles from './teacher.module.css';

export default function TeacherPage() {
  const { lang } = useApp();
  const t = tr.teacher;
  const d = mockTeacherData;

  // AI Task Generator State
  const [genSubject, setGenSubject] = useState('Math');
  const [genDifficulty, setGenDifficulty] = useState('Medium');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGeneratePrompt = () => {
    const promptText = lang === 'kz' ? 
      `Сыныпқа арналған тапсырма (${genSubject}, Деңгейі: ${genDifficulty}):\n\n` +
      `Мақсаты: оқушыларға көшіріп алу мүмкіндігін бермей, олардың аналитикалық ойлау қабілетін дамыту.\n` +
      `Сұрақ: "Төмендегі формуланың неге дұрыс екенін қадаммен түсіндіріп, өзіңіздің мысалыңызды келтіріңіз. Persona Lab арқылы алған мәлімдемені тіркеңіз."` :
      lang === 'ru' ?
      `Задание для класса (${genSubject}, Сложность: ${genDifficulty}):\n\n` +
      `Цель: развить аналитическое мышление учеников, исключая списывание.\n` +
      `Вопрос: "Объясните пошагово, почему данная формула верна, и приведите свой практический пример. Приложите отчет об использовании Persona Lab."` :
      `Classroom Assignment (${genSubject}, Difficulty: ${genDifficulty}):\n\n` +
      `Objective: encourage deep conceptual thinking instead of copy-pasting.\n` +
      `Prompt: "Explain step-by-step why the formula holds true, and design a custom scenario where this applies. Submit your Persona Lab AI-use disclosure log with your draft."`;

    setGeneratedPrompt(promptText);
  };

  const copyPrompt = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Localized helper translations
  const localizedSubjects: Record<string, Record<string, string>> = {
    Math: { en: 'Math', ru: 'Математика', kz: 'Математика' },
    English: { en: 'English', ru: 'Английский', kz: 'Ағылшын тілі' },
    Science: { en: 'Science', ru: 'Наука', kz: 'Жаратылыстану' },
    History: { en: 'History', ru: 'История', kz: 'Тарих' },
    Geography: { en: 'Geography', ru: 'География', kz: 'География' },
    Economics: { en: 'Economics', ru: 'Экономика', kz: 'Экономика' }
  };

  const localizedDifficulties: Record<string, Record<string, string>> = {
    Easy: { en: 'Easy', ru: 'Легкий', kz: 'Оңай' },
    Medium: { en: 'Medium', ru: 'Средний', kz: 'Орташа' },
    Hard: { en: 'Hard', ru: 'Сложный', kz: 'Қиын' }
  };

  const localizedTopics: Record<string, Record<string, string>> = {
    'Fractions & Ratios': { en: 'Fractions & Ratios', ru: 'Дроби и отношения', kz: 'Бөлшектер мен қатынастар' },
    'Demand & Supply curves': { en: 'Demand & Supply curves', ru: 'Кривые спроса и предложения', kz: 'Сұраныс пен ұсыныс қисықтары' },
    'Climate Zones': { en: 'Climate Zones', ru: 'Климатические зоны', kz: 'Климаттық зоналар' },
    'World War II': { en: 'World War II', ru: 'Вторая мировая война', kz: 'Екінші дүниежүзілік соғыс' },
    'Verb Tenses': { en: 'Verb Tenses', ru: 'Времена глаголов', kz: 'Етістік шақтары' },
    'Basic Fractions': { en: 'Basic Fractions', ru: 'Простые дроби', kz: 'Жай бөлшектер' },
    'Global Warming': { en: 'Global Warming', ru: 'Глобальное потепление', kz: 'Жаһандық жылыну' },
    'Verb Conjugation': { en: 'Verb Conjugation', ru: 'Спряжение глаголов', kz: 'Етістіктің жіктелуі' },
    'Fractions': { en: 'Fractions', ru: 'Дроби', kz: 'Бөлшектер' },
    'Equations': { en: 'Equations', ru: 'Уравнения', kz: 'Теңдеулер' },
    'Grammar': { en: 'Grammar', ru: 'Грамматика', kz: 'Грамматика' },
    'Essay Writing': { en: 'Essay Writing', ru: 'Эссе жазу', kz: 'Эссе жазу' },
    'Science': { en: 'Science', ru: 'Наука', kz: 'Ғылым' },
    'Basic Math': { en: 'Basic Math', ru: 'Базовая математика', kz: 'Қарапайым математика' },
    'None': { en: 'None', ru: 'Нет', kz: 'Жоқ' }
  };

  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <div className={styles.container}>
          
          <div className={styles.header}>
            <div>
              <h1 className={styles.title}>👩‍🏫 {t.title[lang]}</h1>
              <p className={styles.subtitle}>
                {lang === 'kz' ? `Қош келдіңіз, ${d.name}. Сыныбыңыздың көрсеткіштері:` :
                 lang === 'ru' ? `Добро пожаловать, ${d.name}. Обзор вашего класса:` :
                 `Welcome, ${d.name}. Here's your class overview.`}
              </p>
            </div>
            <button className="btn btn-primary" onClick={handleGeneratePrompt}>
              📝 {t.createAssignment[lang]}
            </button>
          </div>

          {/* Overview */}
          <div className={styles.statsRow}>
            <div className={styles.statCard}>
              <span className={styles.statIcon}>👥</span>
              <div>
                <span className={styles.statVal}>{d.totalStudents}</span>
                <span className={styles.statLabel}>{t.totalStudents[lang]}</span>
              </div>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statIcon}>📊</span>
              <div>
                <span className={styles.statVal}>{d.classAverage}%</span>
                <span className={styles.statLabel}>{t.classAverage[lang]}</span>
              </div>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statIcon}>⚠️</span>
              <div>
                <span className={styles.statVal}>{d.students.filter(s => s.progress < 50).length}</span>
                <span className={styles.statLabel}>{t.needAttention[lang]}</span>
              </div>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statIcon}>🌟</span>
              <div>
                <span className={styles.statVal}>{d.students.filter(s => s.progress >= 80).length}</span>
                <span className={styles.statLabel}>{t.topPerformers[lang]}</span>
              </div>
            </div>
          </div>

          <div className={styles.grid}>
            
            {/* Student list table with Honesty column */}
            <div className={`${styles.card} ${styles.studentsCard}`}>
              <h2 className={styles.cardTitle}>👥 {t.students[lang]}</h2>
              <div className={styles.studentTable}>
                <div className={styles.tableHeader}>
                  <span>{t.studentName[lang]}</span>
                  <span>{t.level[lang]}</span>
                  <span>{t.progress[lang]}</span>
                  <span>{t.weakTopic[lang]}</span>
                  <span>{t.lastActive[lang]}</span>
                  <span>🛡️ {t.honestUseRate[lang]}</span>
                </div>
                {d.students.map(student => (
                  <div key={student.id} className={styles.tableRow}>
                    <span className={styles.studentName}>{student.name}</span>
                    <span>
                      <span className={`badge ${student.level === 'Advanced' ? 'badge-success' : student.level === 'Intermediate' ? 'badge-warning' : 'badge-error'}`}>
                        {student.level === 'Advanced' ? (lang === 'kz' ? 'Жоғары' : lang === 'ru' ? 'Продвинутый' : 'Advanced') :
                         student.level === 'Intermediate' ? (lang === 'kz' ? 'Орташа' : lang === 'ru' ? 'Средний' : 'Intermediate') :
                         (lang === 'kz' ? 'Бастауыш' : lang === 'ru' ? 'Начальный' : 'Beginner')}
                      </span>
                    </span>
                    <span className={styles.progressCell}>
                      <div className="progress-bar" style={{ width: '80px' }}>
                        <div className="progress-bar-fill" style={{ width: `${student.progress}%` }} />
                      </div>
                      <span className={styles.progressNum}>{student.progress}%</span>
                    </span>
                    <span className={styles.weakTopic}>{localizedTopics[student.weakTopic]?.[lang] || student.weakTopic}</span>
                    <span className={styles.lastActive}>
                      {student.lastActive === 'Today' ? (lang === 'kz' ? 'Бүгін' : lang === 'ru' ? 'Сегодня' : 'Today') :
                       student.lastActive === 'Yesterday' ? (lang === 'kz' ? 'Кеше' : lang === 'ru' ? 'Вчера' : 'Yesterday') :
                       (lang === 'kz' ? '2 күн бұрын' : lang === 'ru' ? '2 дня назад' : '2 days ago')}
                    </span>
                    <span>
                      <span className={`badge ${student.honestUseRate >= 95 ? 'badge-success' : student.honestUseRate >= 88 ? 'badge-warning' : 'badge-error'}`}>
                        {student.honestUseRate}%
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Class Weak Topics */}
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>⚠️ {t.weakTopics[lang]}</h2>
              <div className={styles.weakList}>
                {d.classWeakTopics.map((topic, i) => (
                  <div key={i} className={styles.weakItem}>
                    <div className={styles.weakInfo}>
                      <span className={styles.weakName}>{localizedTopics[topic.topic]?.[lang] || topic.topic}</span>
                      <span className={styles.weakCount}>
                        {lang === 'kz' ? `${topic.studentsStruggling} оқушы қиналды` :
                         lang === 'ru' ? `${topic.studentsStruggling} учеников испытывают трудности` :
                         `${topic.studentsStruggling} students struggling`}
                      </span>
                    </div>
                    <div className="progress-bar" style={{ flex: 1, maxWidth: '120px' }}>
                      <div className="progress-bar-fill" style={{
                        width: `${(topic.studentsStruggling / d.totalStudents) * 100}%`,
                        background: 'linear-gradient(90deg, var(--text-primary), var(--text-secondary))'
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Assignment Generator */}
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>⚡ AI Assignment Builder</h2>
              <p className={styles.cardDesc} style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginBottom: 'var(--space-3)' }}>
                {lang === 'kz' ? 'Сабақ жоспары немесе аналитикалық сұрақ құрастырыңыз:' :
                 lang === 'ru' ? 'Создайте план урока или аналитический вопрос:' :
                 'Generate lesson resource or an analytical discussion question:'}
              </p>
              
              <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                <select className="input-field" style={{ flex: 1 }} value={genSubject} onChange={e => setGenSubject(e.target.value)}>
                  {['Math', 'English', 'Science', 'History', 'Geography', 'Economics'].map(s => (
                    <option key={s} value={s}>{localizedSubjects[s]?.[lang] || s}</option>
                  ))}
                </select>

                <select className="input-field" style={{ flex: 1 }} value={genDifficulty} onChange={e => setGenDifficulty(e.target.value)}>
                  {['Easy', 'Medium', 'Hard'].map(d => (
                    <option key={d} value={d}>{localizedDifficulties[d]?.[lang] || d}</option>
                  ))}
                </select>
              </div>

              <button className="btn btn-secondary btn-sm" style={{ width: '100%' }} onClick={handleGeneratePrompt}>
                ⚡ Generate Classroom Prompt
              </button>

              {generatedPrompt && (
                <div style={{ marginTop: '16px', background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
                  <pre style={{ whiteSpace: 'pre-wrap', fontSize: '11px', fontFamily: 'inherit', margin: 0 }}>{generatedPrompt}</pre>
                  <button className="btn btn-primary btn-sm" style={{ marginTop: '8px' }} onClick={copyPrompt}>
                    {copied ? tr.tutor.copied[lang] : tr.tutor.copyBtn[lang]}
                  </button>
                </div>
              )}
            </div>

            {/* AI Suggestions */}
            <div className={`${styles.card} ${styles.aiCard}`}>
              <h2 className={styles.cardTitle}>🤖 {t.aiSuggestions[lang]}</h2>
              <div className={styles.suggestionList}>
                <div className={styles.suggestion}>
                  <span>📌</span>
                  <p>
                    {lang === 'kz' ? 'Бөлшектер: 12 оқушы қиналады. Көрнекі мысалдарды қолдануды ұсынамыз.' :
                     lang === 'ru' ? 'Дроби: 12 учеников имеют трудности. Рекомендуем разбор с визуальными примерами.' :
                     'Fractions Review: 12 students struggle with fractions. Consider a group review session with visual examples.'}
                  </p>
                </div>
                <div className={styles.suggestion}>
                  <span>⚡</span>
                  <p>
                    {lang === 'kz' ? 'Арманда қиындықтар: Прогресі 38% және 3 күн белсенді емес.' :
                     lang === 'ru' ? 'Трудности у Армана Д.: Прогресс 38% и не активен 3 дня. Свяжитесь лично.' :
                     'Arman D. needs help: Progress is at 38% and inactive for 3 days. Reach out personally.'}
                  </p>
                </div>
                <div className={styles.suggestion}>
                  <span>🌟</span>
                  <p>
                    {lang === 'kz' ? 'Дана дайын: 92% прогреспен оған қосымша қиын тапсырмалар беріңіз.' :
                     lang === 'ru' ? 'Дана М. готова: Прогресс 92%, дайте ей дополнительные усложненные задания.' :
                     'Dana M. is ready: With 92% progress, consider giving advanced challenges or peer tutoring role.'}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </>
  );
}
