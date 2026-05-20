import Navbar from '@/components/Navbar';
import styles from './page.module.css';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* ======= HERO ======= */}
        <section className={styles.hero} id="hero">
          <div className={`container ${styles.heroInner}`}>
            <div className={styles.heroContent}>
              <div className="section-label">AI-powered learning platform</div>
              <h1 className={styles.heroTitle}>
                Learn at your pace.<br />
                <span className={styles.heroTitleAccent}>Understand everything.</span>
              </h1>
              <p className={styles.heroDesc}>
                persona lab adapts to your level, explains topics step by step,
                creates practice tasks, and tracks your progress — in English, Russian, or Kazakh.
              </p>
              <div className={styles.heroCTA}>
                <Link href="/dashboard" className="btn btn-primary btn-lg">
                  Start Learning
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
                <Link href="/tutor" className="btn btn-secondary btn-lg">
                  Try AI Tutor
                </Link>
              </div>
            </div>

            <div className={styles.heroVisual}>
              <div className={`card ${styles.heroCard}`}>
                <div className={styles.heroCardHeader}>
                  <div className={styles.heroCardDot} />
                  <span>AI Tutor</span>
                </div>
                <div className={styles.chatPreview}>
                  <div className={styles.chatMsg}>
                    <div className={styles.chatAI}>
                      <p>Let&apos;s solve <strong>2x + 5 = 15</strong> together.</p>
                      <p>What should we do with the +5 first?</p>
                    </div>
                  </div>
                  <div className={styles.chatMsg}>
                    <div className={styles.chatUser}>
                      <p>Move it to the other side?</p>
                    </div>
                  </div>
                  <div className={styles.chatMsg}>
                    <div className={styles.chatAI}>
                      <p>Exactly! So 2x = 10. Now divide both sides by 2. What do you get?</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======= METRICS ======= */}
        <section className={styles.metrics}>
          <div className="container">
            <div className={styles.metricsGrid}>
              {[
                { value: '3', label: 'Languages supported' },
                { value: '24/7', label: 'AI availability' },
                { value: '4', label: 'Subject areas' },
                { value: 'Free', label: 'For all students' },
              ].map((m, i) => (
                <div key={i} className={styles.metric}>
                  <span className={styles.metricValue}>{m.value}</span>
                  <span className={styles.metricLabel}>{m.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ======= PROBLEM / SOLUTION ======= */}
        <section className={`section ${styles.problem}`} id="why">
          <div className="container">
            <div className={styles.splitSection}>
              <div className={styles.splitLeft}>
                <div className="section-label">The Problem</div>
                <h2 className="section-title">Students struggle without personalized support</h2>
                <p className="section-desc">
                  Many students receive the same lessons regardless of their level.
                  Private tutors are expensive. AI chatbots give answers but don&apos;t teach understanding.
                </p>
              </div>
              <div className={styles.splitRight}>
                <div className={styles.problemList}>
                  {[
                    { title: 'One-size-fits-all', desc: 'Same lessons for different learning speeds' },
                    { title: 'Expensive tutoring', desc: 'Private tutors cost too much for many families' },
                    { title: 'Copy-paste AI', desc: 'Students copy answers without understanding' },
                    { title: 'Limited access', desc: 'Rural areas lack educational support' },
                  ].map((item, i) => (
                    <div key={i} className={styles.problemItem}>
                      <div className={styles.problemIcon}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                      </div>
                      <div>
                        <strong>{item.title}</strong>
                        <p>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======= SOLUTION ======= */}
        <section className={`section ${styles.solution}`} id="solution">
          <div className="container">
            <div className={styles.sectionCenter}>
              <div className="section-label">The Solution</div>
              <h2 className="section-title">AI that teaches, not just answers</h2>
              <p className="section-desc" style={{ margin: '0 auto' }}>
                persona lab turns AI into a structured learning assistant that guides students step by step.
              </p>
            </div>
            <div className={styles.featureGrid}>
              {[
                {
                  icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>,
                  title: 'Step-by-step explanations',
                  desc: 'AI breaks down complex topics into simple, digestible steps. No walls of text.'
                },
                {
                  icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
                  title: 'Instant answer checking',
                  desc: 'Submit answers and get detailed feedback — what went wrong and how to fix it.'
                },
                {
                  icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
                  title: 'Guided learning mode',
                  desc: 'Instead of giving direct answers, AI asks guiding questions so you actually learn.'
                },
                {
                  icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg>,
                  title: 'Progress tracking',
                  desc: 'See your strengths and weaknesses. Track quiz scores, streaks, and improvement.'
                },
                {
                  icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
                  title: 'Multilingual support',
                  desc: 'Learn in English, Russian, or Kazakh. Switch language anytime mid-lesson.'
                },
                {
                  icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
                  title: 'Adaptive practice',
                  desc: 'AI generates questions at your level and adjusts difficulty based on performance.'
                },
              ].map((f, i) => (
                <div key={i} className={`card ${styles.featureCard}`}>
                  <div className={styles.featureIcon}>{f.icon}</div>
                  <h3 className={styles.featureTitle}>{f.title}</h3>
                  <p className={styles.featureDesc}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ======= HOW IT WORKS ======= */}
        <section className={`section ${styles.howSection}`} id="how-it-works">
          <div className="container">
            <div className={styles.sectionCenter}>
              <div className="section-label">How it works</div>
              <h2 className="section-title">Start learning in minutes</h2>
            </div>
            <div className={styles.steps}>
              {[
                { step: '01', title: 'Take a level check', desc: 'Answer a few quick questions so AI understands your current knowledge.' },
                { step: '02', title: 'Get your learning path', desc: 'AI creates a personalized study plan based on your goals and level.' },
                { step: '03', title: 'Learn with AI tutor', desc: 'Ask questions, get guided explanations, and practice with feedback.' },
                { step: '04', title: 'Track & improve', desc: 'See your progress, fix weak areas, and advance to harder topics.' },
              ].map((s, i) => (
                <div key={i} className={styles.step}>
                  <div className={styles.stepNum}>{s.step}</div>
                  <div className={styles.stepContent}>
                    <h3 className={styles.stepTitle}>{s.title}</h3>
                    <p className={styles.stepDesc}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ======= FOR WHO ======= */}
        <section className={`section`} id="for-who">
          <div className="container">
            <div className={styles.sectionCenter}>
              <div className="section-label">Built for everyone</div>
              <h2 className="section-title">Students, teachers, and parents</h2>
            </div>
            <div className={styles.roleGrid}>
              {[
                {
                  title: 'Students',
                  desc: 'Get a personal AI tutor that adapts to your level and helps you truly understand.',
                  features: ['Adaptive AI tutor', 'Step-by-step guidance', 'Practice with feedback', 'Progress tracking', 'Multi-language support'],
                  cta: 'Start Learning', link: '/dashboard',
                },
                {
                  title: 'Teachers',
                  desc: 'See which students need help, track class progress, and generate practice tasks.',
                  features: ['Class overview', 'Student analytics', 'Weak topics report', 'AI task generator', 'Lesson support'],
                  cta: 'View Dashboard', link: '/teacher',
                },
                {
                  title: 'Parents',
                  desc: 'Simple progress updates — see how your child is doing without complex statistics.',
                  features: ['Weekly progress', 'Subject overview', 'Activity tracking', 'Simple recommendations', 'Study streaks'],
                  cta: 'See Progress', link: '/parent',
                },
              ].map((role, i) => (
                <div key={i} className={`card ${styles.roleCard}`}>
                  <h3 className={styles.roleTitle}>{role.title}</h3>
                  <p className={styles.roleDesc}>{role.desc}</p>
                  <ul className={styles.roleList}>
                    {role.features.map((f, j) => (
                      <li key={j}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href={role.link} className="btn btn-secondary" style={{ width: '100%', marginTop: 'auto' }}>
                    {role.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ======= SDG 4 ======= */}
        <section className={`section ${styles.sdg}`} id="sdg4">
          <div className="container">
            <div className={styles.sdgInner}>
              <div className={styles.sdgContent}>
                <div className="section-label" style={{ background: 'var(--success-bg)', color: 'var(--text-success)', borderColor: 'var(--success-border)' }}>
                  SDG 4 · Quality Education
                </div>
                <h2 className="section-title">Making education accessible for all</h2>
                <p className="section-desc">
                  persona lab aligns with the United Nations Sustainable Development Goal 4 — ensuring
                  inclusive and equitable quality education for students regardless of location or income.
                </p>
                <div className={styles.sdgPoints}>
                  {[
                    { title: 'Rural access', desc: 'Students in remote areas learn with AI support anytime, anywhere.' },
                    { title: 'No expensive tutors', desc: 'Free AI-powered tutoring available to every student.' },
                    { title: 'Language equality', desc: 'Learn in your native language — Kazakh, Russian, or English.' },
                  ].map((p, i) => (
                    <div key={i} className={styles.sdgPoint}>
                      <div className={styles.sdgDot} />
                      <div>
                        <strong>{p.title}</strong>
                        <p>{p.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======= CTA ======= */}
        <section className={`section ${styles.cta}`} id="cta">
          <div className="container">
            <div className={styles.ctaCard}>
              <h2 className={styles.ctaTitle}>Ready to learn smarter?</h2>
              <p className={styles.ctaDesc}>
                Join persona lab and experience personalized AI-powered education today.
              </p>
              <div className={styles.ctaActions}>
                <Link href="/dashboard" className="btn btn-primary btn-lg">
                  Get Started — Free
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
                <Link href="/tutor" className="btn btn-secondary btn-lg">
                  Try AI Tutor
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ======= FOOTER ======= */}
        <footer className={styles.footer}>
          <div className="container">
            <div className={styles.footerInner}>
              <div className={styles.footerBrand}>
                <span className={styles.footerLogo}>persona lab</span>
                <p>Your personal AI learning path.</p>
              </div>
              <div className={styles.footerLinks}>
                <div className={styles.footerCol}>
                  <span className={styles.footerColTitle}>Platform</span>
                  <Link href="/dashboard">Dashboard</Link>
                  <Link href="/tutor">AI Tutor</Link>
                  <Link href="/practice">Practice</Link>
                  <Link href="/progress">Progress</Link>
                </div>
                <div className={styles.footerCol}>
                  <span className={styles.footerColTitle}>Users</span>
                  <Link href="/dashboard">Students</Link>
                  <Link href="/teacher">Teachers</Link>
                  <Link href="/parent">Parents</Link>
                </div>
                <div className={styles.footerCol}>
                  <span className={styles.footerColTitle}>Languages</span>
                  <span>English</span>
                  <span>Русский</span>
                  <span>Қазақша</span>
                </div>
              </div>
            </div>
            <div className={styles.footerBottom}>
              <p>© 2026 persona lab</p>
              <p>Supporting SDG 4: Quality Education</p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
