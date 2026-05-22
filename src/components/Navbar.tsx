'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useApp } from './ThemeProvider';
import { useUser } from './UserContext';
import AuthModal from './AuthModal';
import t from '@/lib/translations';
import type { Lang } from '@/lib/translations';
import styles from './Navbar.module.css';

const langLabels: Record<Lang, string> = { en: 'EN', ru: 'RU', kz: 'KZ' };

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { theme, lang, toggleTheme, setLang } = useApp();
  const { user, logout } = useUser();
  const n = t.nav;

  const links = [
    { href: '/dashboard', label: n.dashboard[lang] },
    { href: '/tutor', label: n.tutor[lang] },
    { href: '/practice', label: n.practice[lang] },
    { href: '/progress', label: n.progress[lang] },
    { href: '/course-path', label: n.coursePath[lang] },
    ...(user?.role === 'teacher' ? [{ href: '/teacher', label: n.teacher[lang] }] : []),
  ];

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.inner}>
          <Link href="/" className={styles.logo}>
            <Image src="/assets/Persona Lab.png" alt="persona lab" width={200} height={40} className={styles.logoImg} priority />
          </Link>

          <div className={`${styles.nav} ${mobileOpen ? styles.navOpen : ''}`}>
            {links.map(l => (
              <Link key={l.href} href={l.href} className={styles.navLink} onClick={() => setMobileOpen(false)}>
                {l.label}
              </Link>
            ))}
            <div className={styles.mobileActions}>
              <div className={styles.langGroup}>
                {(['en','ru','kz'] as Lang[]).map(l => (
                  <button key={l} className={`${styles.langBtn} ${lang === l ? styles.langBtnActive : ''}`} onClick={() => setLang(l)}>
                    {langLabels[l]}
                  </button>
                ))}
              </div>
              <button onClick={toggleTheme} className={styles.themeBtn}>{theme === 'light' ? '◐' : '◑'}</button>
              
              {user ? (
                <div className={styles.userSectionMobile}>
                  <div className={styles.userInfo}>
                    <span className={styles.userAvatar}>👤</span>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <span className={styles.userName} style={{ fontSize: '16px' }}>{user.name}</span>
                      <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{user.email}</span>
                    </div>
                  </div>
                  <div className={styles.dropdownGoal} style={{ width: '100%', maxWidth: '280px', textAlign: 'center', margin: '4px 0' }}>
                    <div className={styles.dropdownGoalTitle}>Career / Learning Goal</div>
                    <div>{user.careerGoal || 'General Learner'}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '16px', fontSize: '13px', margin: '4px 0' }}>
                    <div>Level: <strong>{user.level}</strong></div>
                    <div>XP: <strong>{user.xp} XP</strong></div>
                  </div>
                  <button onClick={() => { logout(); setMobileOpen(false); }} className={`${styles.authBtn} ${styles.logoutBtn}`}>Logout</button>
                </div>
              ) : (
                <button onClick={() => { setAuthOpen(true); setMobileOpen(false); }} className={styles.authBtn}>Sign In</button>
              )}
            </div>
          </div>

          <div className={styles.actions}>
            <div className={styles.langGroup}>
              {(['en','ru','kz'] as Lang[]).map(l => (
                <button key={l} className={`${styles.langBtn} ${lang === l ? styles.langBtnActive : ''}`} onClick={() => setLang(l)}>
                  {langLabels[l]}
                </button>
              ))}
            </div>
            <button onClick={toggleTheme} className={styles.themeBtn} aria-label="Toggle theme">
              {theme === 'light' ? '◐' : '◑'}
            </button>

            {user ? (
              <div className={styles.userSection}>
                <div className={styles.userBadge} onClick={() => setDropdownOpen(!dropdownOpen)}>
                  <span className={styles.userAvatar}>👤</span>
                  <span className={styles.userName}>{user.name}</span>
                  <span className={styles.xpText}>{user.xp} XP</span>
                </div>

                {dropdownOpen && (
                  <div className={styles.profileDropdown}>
                    <div className={styles.dropdownHeader}>
                      <span className={styles.dropdownTitle}>Account Details</span>
                      <span className={styles.dropdownName}>{user.name}</span>
                      <span className={styles.dropdownEmail}>{user.email}</span>
                      <span style={{ 
                        display: 'inline-block', 
                        padding: '3px 8px', 
                        borderRadius: '4px', 
                        background: 'rgba(99, 102, 241, 0.15)', 
                        color: 'var(--brand)', 
                        fontSize: '10px', 
                        textTransform: 'uppercase', 
                        marginTop: '6px', 
                        fontWeight: 'bold',
                        letterSpacing: '0.05em',
                        width: 'fit-content'
                      }}>
                        👤 {user.role || 'user'}
                      </span>
                    </div>
                    
                    <div className={styles.dropdownDivider} />

                    <div className={styles.dropdownDetails}>
                      <div className={styles.dropdownRow}>
                        <span className={styles.dropdownLabel}>Level</span>
                        <span className={styles.dropdownVal}>{user.level}</span>
                      </div>
                      <div className={styles.dropdownRow}>
                        <span className={styles.dropdownLabel}>Total XP</span>
                        <span className={styles.dropdownVal}>{user.xp} XP</span>
                      </div>
                      <div className={styles.dropdownRow}>
                        <span className={styles.dropdownLabel}>Study Streak</span>
                        <span className={styles.dropdownVal}>🔥 {user.streak} days</span>
                      </div>
                    </div>

                    <div className={styles.dropdownDivider} />

                    <div className={styles.dropdownGoal}>
                      <div className={styles.dropdownGoalTitle}>Career / Learning Goal</div>
                      <div>{user.careerGoal || 'General Learner'}</div>
                    </div>

                    <button 
                      onClick={() => { logout(); setDropdownOpen(false); }} 
                      className={styles.logoutBtnDropdown}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={() => setAuthOpen(true)} className={styles.loginBtnHeader}>Sign In</button>
            )}
          </div>

          <button className={`${styles.burger} ${mobileOpen ? styles.burgerOpen : ''}`} onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
