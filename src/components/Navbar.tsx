'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from './ThemeProvider';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/tutor', label: 'AI Tutor' },
    { href: '/practice', label: 'Practice' },
    { href: '/progress', label: 'Progress' },
    { href: '/teacher', label: 'Teacher' },
    { href: '/parent', label: 'Parent' },
  ];

  return (
    <nav className={styles.navbar} id="navbar">
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/assets/Persona Lab.png"
            alt="persona lab"
            width={140}
            height={28}
            className={styles.logoImg}
            priority
          />
        </Link>

        <div className={`${styles.nav} ${mobileOpen ? styles.navOpen : ''}`}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.navLink}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className={styles.mobileActions}>
            <button onClick={toggleTheme} className={styles.themeBtn}>
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <Link href="/dashboard" className="btn btn-primary" onClick={() => setMobileOpen(false)}>
              Get Started
            </Link>
          </div>
        </div>

        <div className={styles.actions}>
          <button
            onClick={toggleTheme}
            className={`${styles.themeToggle} btn-icon`}
            aria-label="Toggle theme"
            id="theme-toggle"
          >
            <svg
              className={`${styles.themeIcon} ${theme === 'light' ? styles.themeIconVisible : ''}`}
              width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
            <svg
              className={`${styles.themeIcon} ${theme === 'dark' ? styles.themeIconVisible : ''}`}
              width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          </button>
          <Link href="/dashboard" className="btn btn-primary btn-sm">
            Get Started
          </Link>
        </div>

        <button
          className={`${styles.burger} ${mobileOpen ? styles.burgerOpen : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          id="mobile-menu-toggle"
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}
