'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useApp } from './ThemeProvider';
import t from '@/lib/translations';
import type { Lang } from '@/lib/translations';
import styles from './Navbar.module.css';

const langLabels: Record<Lang, string> = { en: 'EN', ru: 'RU', kz: 'KZ' };

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, lang, toggleTheme, setLang } = useApp();
  const n = t.nav;

  const links = [
    { href: '/', label: n.home[lang] },
    { href: '/dashboard', label: n.dashboard[lang] },
    { href: '/tutor', label: n.tutor[lang] },
    { href: '/practice', label: n.practice[lang] },
    { href: '/progress', label: n.progress[lang] },
    { href: '/course-path', label: n.coursePath[lang] },
    { href: '/teacher', label: n.teacher[lang] },
    { href: '/parent', label: n.parent[lang] },
  ];

  return (
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
        </div>

        <button className={`${styles.burger} ${mobileOpen ? styles.burgerOpen : ''}`} onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}
