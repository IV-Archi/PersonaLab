'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Lang } from '@/lib/translations';

type Theme = 'light' | 'dark';

interface AppContextType {
  theme: Theme;
  lang: Lang;
  toggleTheme: () => void;
  setLang: (l: Lang) => void;
}

const AppContext = createContext<AppContextType>({
  theme: 'light',
  lang: 'en',
  toggleTheme: () => {},
  setLang: () => {},
});

export function useApp() {
  return useContext(AppContext);
}

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [lang, setLangState] = useState<Lang>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('pl-theme') as Theme | null;
    const savedLang = localStorage.getItem('pl-lang') as Lang | null;
    const preferDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const t = savedTheme || (preferDark ? 'dark' : 'light');
    const l = savedLang || 'en';
    setTheme(t);
    setLangState(l);
    document.documentElement.setAttribute('data-theme', t);
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('pl-theme', next);
  };

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem('pl-lang', l);
  };

  if (!mounted) return <div style={{ visibility: 'hidden' }}>{children}</div>;

  return (
    <AppContext.Provider value={{ theme, lang, toggleTheme, setLang }}>
      {children}
    </AppContext.Provider>
  );
}
