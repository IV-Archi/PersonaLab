'use client';

import Navbar from '@/components/Navbar';
import { useApp } from '@/components/ThemeProvider';
import tr from '@/lib/translations';
import Link from 'next/link';
import styles from './page.module.css';

export default function HomePage() {
  const { lang } = useApp();
  const h = tr.hero;
  const s = tr.solution;

  return (
    <>
      <Navbar />
      <main>
        <section className={styles.hero}>
          <div className={`container ${styles.heroInner}`}>
            <div className={styles.heroContent}>
              <div className="section-label">{h.label[lang]}</div>
              <h1 className={styles.heroTitle}>
                {h.title1[lang]}<br />
                <span className={styles.heroAccent}>{h.title2[lang]}</span>
              </h1>
              <p className={styles.heroDesc}>{h.desc[lang]}</p>
              <div className={styles.heroCTA}>
                <Link href="/dashboard" className="btn btn-primary btn-lg">{h.cta1[lang]}</Link>
                <Link href="/tutor" className="btn btn-secondary btn-lg">{h.cta2[lang]}</Link>
              </div>
            </div>
            <div className={styles.heroVisual}>
              <div className={`card ${styles.heroCard}`}>
                <div className={styles.heroCardHeader}><div className={styles.dot} /><span>{tr.nav.tutor[lang]}</span></div>
                <div className={styles.chatPreview}>
                  <div className={styles.chatAI}><p>Let&apos;s solve <strong>2x + 5 = 15</strong> together.</p><p>What should we do with the +5 first?</p></div>
                  <div className={styles.chatUser}><p>Move it to the other side?</p></div>
                  <div className={styles.chatAI}><p>Exactly! So 2x = 10. Now divide both sides by 2.</p></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.metrics}>
          <div className="container">
            <div className={styles.metricsGrid}>
              {[{ v: '3', l: tr.metrics.langs[lang] }, { v: '24/7', l: tr.metrics.avail[lang] }, { v: '5', l: tr.metrics.subjects[lang] }, { v: 'Free', l: tr.metrics.free[lang] }].map((m, i) => (
                <div key={i} className={styles.metric}><span className={styles.metricVal}>{m.v}</span><span className={styles.metricLabel}>{m.l}</span></div>
              ))}
            </div>
          </div>
        </section>

        <section className={`section ${styles.problemSection}`}>
          <div className="container">
            <div className={styles.split}>
              <div>
                <div className="section-label">{tr.problem.label[lang]}</div>
                <h2 className="section-title">{tr.problem.title[lang]}</h2>
              </div>
              <div className={styles.problemList}>
                {tr.problem.items.map((item, i) => (
                  <div key={i} className={styles.problemItem}>
                    <div className={styles.problemIcon}>✕</div>
                    <div><strong>{item.title[lang]}</strong><p>{item.desc[lang]}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={`section ${styles.solutionSection}`}>
          <div className="container">
            <div className={styles.center}><div className="section-label">{s.label[lang]}</div><h2 className="section-title">{s.title[lang]}</h2><p className="section-desc" style={{ margin: '0 auto', marginTop: 'var(--space-3)' }}>{s.desc[lang]}</p></div>
            <div className={styles.featureGrid}>
              {s.features.map((f, i) => (
                <div key={i} className={`card ${styles.featureCard}`}>
                  <h3 className={styles.featureTitle}>{f.title[lang]}</h3>
                  <p className={styles.featureDesc}>{f.desc[lang]}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={`section ${styles.howSection}`}>
          <div className="container">
            <div className={styles.center}><div className="section-label">{tr.howItWorks.label[lang]}</div><h2 className="section-title">{tr.howItWorks.title[lang]}</h2></div>
            <div className={styles.steps}>
              {tr.howItWorks.steps.map((step, i) => (
                <div key={i} className={styles.step}><div className={styles.stepNum}>0{i + 1}</div><div><h3 className={styles.stepTitle}>{step.title[lang]}</h3><p className={styles.stepDesc}>{step.desc[lang]}</p></div></div>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className={styles.center}><div className="section-label">{tr.roles.label[lang]}</div><h2 className="section-title">{tr.roles.title[lang]}</h2></div>
            <div className={styles.roleGrid}>
              {[
                { 
                  r: tr.roles.student, 
                  link: '/dashboard', 
                  cta: tr.nav.dashboard[lang], 
                  features: lang === 'kz' ? 
                    ['Бейімделгіш ЖИ-тьютор', 'Қадамдық нұсқаулықтар', 'Кері байланысы бар жаттығулар', 'Прогресті бақылау', 'Көптілділік қолдауы'] :
                    lang === 'ru' ?
                    ['Адаптивный ИИ-репетитор', 'Пошаговые подсказки', 'Практика с обратной связью', 'Контроль прогресса', 'Поддержка языков'] :
                    ['Adaptive AI tutor', 'Step-by-step guidance', 'Practice with feedback', 'Progress tracking', 'Multi-language'] 
                },
                { 
                  r: tr.roles.teacher, 
                  link: '/teacher', 
                  cta: tr.nav.teacher[lang], 
                  features: lang === 'kz' ? 
                    ['Сыныпқа шолу', 'Оқушылар аналитикасы', 'Әлсіз тақырыптар есебі', 'ЖИ-тапсырмалар генераторы', 'Сабақ қолдауы'] :
                    lang === 'ru' ?
                    ['Обзор класса', 'Аналитика учеников', 'Отчет о слабых темах', 'Генератор ИИ-заданий', 'Поддержка уроков'] :
                    ['Class overview', 'Student analytics', 'Weak topics report', 'AI task generator', 'Lesson support']
                },
                { 
                  r: tr.roles.parent, 
                  link: '/parent', 
                  cta: tr.nav.parent[lang], 
                  features: lang === 'kz' ? 
                    ['Апталық прогресс', 'Пәндерге шолу', 'Әрекеттерді бақылау', 'Ұсыныстар', 'Оқу сериялары'] :
                    lang === 'ru' ?
                    ['Еженедельный прогресс', 'Обзор предметов', 'Отслеживание активности', 'Рекомендации', 'Серии занятий'] :
                    ['Weekly progress', 'Subject overview', 'Activity tracking', 'Recommendations', 'Study streaks']
                },
              ].map((role, i) => (
                <div key={i} className={`card ${styles.roleCard}`}>
                  <h3 className={styles.roleTitle}>{role.r.title[lang]}</h3>
                  <p className={styles.roleDesc}>{role.r.desc[lang]}</p>
                  <ul className={styles.roleList}>{role.features.map((f, j) => <li key={j}>✓ {f}</li>)}</ul>
                  <Link href={role.link} className="btn btn-secondary" style={{ width: '100%', marginTop: 'auto' }}>{role.cta}</Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={`section ${styles.sdgSection}`}>
          <div className="container">
            <div className={styles.center}>
              <div className="section-label">{tr.sdg.label[lang]}</div>
              <h2 className="section-title">{tr.sdg.title[lang]}</h2>
            </div>
          </div>
        </section>

        <section className={`section ${styles.ctaSection}`}>
          <div className="container">
            <div className={styles.ctaCard}>
              <h2 className={styles.ctaTitle}>{tr.cta.title[lang]}</h2>
              <p className={styles.ctaDesc}>{tr.cta.desc[lang]}</p>
              <Link href="/dashboard" className="btn btn-primary btn-lg">{tr.cta.btn[lang]}</Link>
            </div>
          </div>
        </section>

        <footer className={styles.footer}>
          <div className="container">
            <div className={styles.footerInner}>
              <div><span className={styles.footerLogo}>persona lab</span><p>{tr.footer.tagline[lang]}</p></div>
              <div className={styles.footerLinks}>
                <div className={styles.footerCol}>
                  <span className={styles.footerColTitle}>{tr.footer.platform[lang]}</span>
                  <Link href="/dashboard">{tr.nav.dashboard[lang]}</Link>
                  <Link href="/tutor">{tr.nav.tutor[lang]}</Link>
                  <Link href="/practice">{tr.nav.practice[lang]}</Link>
                </div>
                <div className={styles.footerCol}>
                  <span className={styles.footerColTitle}>{tr.footer.users[lang]}</span>
                  <Link href="/dashboard">{tr.roles.student.title[lang]}</Link>
                  <Link href="/teacher">{tr.roles.teacher.title[lang]}</Link>
                  <Link href="/parent">{tr.roles.parent.title[lang]}</Link>
                </div>
              </div>
            </div>
            <div className={styles.footerBottom}><p>© 2026 persona lab</p></div>
          </div>
        </footer>
      </main>
    </>
  );
}
