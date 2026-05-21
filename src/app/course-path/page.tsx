'use client';

import Navbar from '@/components/Navbar';
import { useApp } from '@/components/ThemeProvider';
import tr from '@/lib/translations';
import Link from 'next/link';
import styles from './course-path.module.css';

// Mock data for Course Path
const COURSE_PATH_DATA = {
  careerGoal: {
    en: 'Software Engineer',
    ru: 'Инженер-программист',
    kz: 'Бағдарламалық жасақтама инженері'
  },
  coreSubjects: [
    {
      id: 'cs101',
      name: { en: 'Data Structures & Algorithms', ru: 'Структуры данных и алгоритмы', kz: 'Деректер құрылымы және алгоритмдер' },
      difficulty: { en: 'High', ru: 'Высокая', kz: 'Жоғары' },
      whyUseful: { 
        en: 'Essential for coding interviews and building efficient software systems.',
        ru: 'Необходимо для собеседований и создания эффективных систем.',
        kz: 'Сұхбаттасуларға және тиімді жүйелер құруға қажет.'
      },
      hasWeakTopics: true,
      weakTopics: { en: 'Recursion, Trees', ru: 'Рекурсия, Деревья', kz: 'Рекурсия, Ағаштар' }
    },
    {
      id: 'math201',
      name: { en: 'Discrete Mathematics', ru: 'Дискретная математика', kz: 'Дискретті математика' },
      difficulty: { en: 'Medium', ru: 'Средняя', kz: 'Орташа' },
      whyUseful: { 
        en: 'Provides the mathematical foundation for computer science.',
        ru: 'Дает математическую основу для информатики.',
        kz: 'Информатика үшін математикалық негіз береді.'
      },
      hasWeakTopics: false
    }
  ],
  electives: [
    {
      id: 'ai301',
      name: { en: 'Introduction to AI', ru: 'Введение в ИИ', kz: 'ЖИ-ге кіріспе' },
      difficulty: { en: 'Medium', ru: 'Средняя', kz: 'Орташа' },
      whyUseful: { 
        en: 'High demand in the current tech market. Aligns with your interest in intelligent systems.',
        ru: 'Высокий спрос на рынке. Соответствует вашему интересу к умным системам.',
        kz: 'Нарықтағы жоғары сұраныс. Зияткерлік жүйелерге деген қызығушылығыңызға сәйкес келеді.'
      },
      aiAdvice: { 
        en: 'Highly recommended! Matches your goal of becoming a software engineer and builds on your Python skills.',
        ru: 'Настоятельно рекомендуется! Соответствует вашей цели и опирается на навыки Python.',
        kz: 'Қатаң ұсынылады! Мақсатыңызға сәйкес келеді және Python дағдыларыңызға негізделеді.'
      }
    },
    {
      id: 'ux101',
      name: { en: 'UI/UX Design Basics', ru: 'Основы UI/UX дизайна', kz: 'UI/UX дизайн негіздері' },
      difficulty: { en: 'Low', ru: 'Низкая', kz: 'Төмен' },
      whyUseful: { 
        en: 'Helps engineers understand user-centered design principles.',
        ru: 'Помогает инженерам понять принципы дизайна, ориентированного на пользователя.',
        kz: 'Инженерлерге пайдаланушыға бағытталған дизайн принциптерін түсінуге көмектеседі.'
      },
      aiAdvice: { 
        en: 'Good elective for frontend focus, but optional for pure backend roles.',
        ru: 'Хороший выбор для фронтенда, но не обязателен для бэкенда.',
        kz: 'Фронтенд үшін жақсы таңдау, бірақ бэкенд үшін міндетті емес.'
      }
    }
  ]
};

export default function CoursePathPage() {
  const { lang } = useApp();
  const c = tr.coursePath;
  const data = COURSE_PATH_DATA;

  return (
    <>
      <Navbar />
      <main className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>{c.title[lang]}</h1>
          <p className={styles.subtitle}>{c.subtitle[lang]}</p>
          <div className={styles.careerGoal}>
            <span>{c.careerGoal[lang]}</span> {data.careerGoal[lang]}
          </div>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>📚 {c.coreSubjects[lang]}</h2>
          <div className={styles.grid}>
            {data.coreSubjects.map(subject => (
              <div key={subject.id} className={styles.card}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.courseName}>{subject.name[lang]}</h3>
                  <span className={styles.difficulty}>{c.difficulty[lang]} {subject.difficulty[lang]}</span>
                </div>
                
                <p className={styles.whyUseful}>
                  <strong>{c.whyUseful[lang]}</strong> {subject.whyUseful[lang]}
                </p>

                {subject.hasWeakTopics && subject.weakTopics && (
                  <div className={styles.weakWarning}>
                    ⚠️ {c.weakTopicWarning[lang]}: {subject.weakTopics[lang]}
                  </div>
                )}

                <div className={styles.cardFooter}>
                  <Link href={`/tutor?subject=${subject.id}`} className="btn btn-secondary" style={{ width: '100%' }}>
                    {c.studySupport[lang]}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>🎯 {c.electives[lang]}</h2>
          <div className={styles.grid}>
            {data.electives.map(subject => (
              <div key={subject.id} className={styles.card}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.courseName}>{subject.name[lang]}</h3>
                  <span className={styles.difficulty}>{c.difficulty[lang]} {subject.difficulty[lang]}</span>
                </div>
                
                <p className={styles.whyUseful}>
                  <strong>{c.whyUseful[lang]}</strong> {subject.whyUseful[lang]}
                </p>

                {subject.aiAdvice && (
                  <div className={styles.aiAdvice}>
                    <div className={styles.aiAdviceLabel}>✨ {c.aiAdvice[lang]}</div>
                    {subject.aiAdvice[lang]}
                  </div>
                )}

                <div className={styles.cardFooter}>
                  <Link href={`/tutor?subject=${subject.id}`} className="btn btn-primary" style={{ width: '100%' }}>
                    {c.studySupport[lang]}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
