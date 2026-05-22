'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { UserProfile, authService, isSupabaseConfigured } from '@/lib/supabase-client';
import { getLocalStats, saveLocalStats, UserStats } from '@/lib/user-store';

interface UserContextType {
  user: UserProfile | null;
  loading: boolean;
  dbType: 'real' | 'simulation' | null;
  login: (email: string) => Promise<void>;
  signUp: (email: string, name: string, careerGoal: string, role: 'user' | 'student' | 'teacher') => Promise<void>;
  logout: () => void;
  updateStats: (updater: (prev: UserStats) => UserStats) => Promise<void>;
}

const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
  dbType: null,
  login: async () => {},
  signUp: async () => {},
  logout: () => {},
  updateStats: async () => {},
});

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [dbType, setDbType] = useState<'real' | 'simulation' | null>(null);

  // Initial load
  useEffect(() => {
    const savedUser = localStorage.getItem('pl-logged-in-user');
    const savedDbType = localStorage.getItem('pl-db-type') as 'real' | 'simulation' | null;
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setDbType(savedDbType);
    }
    setLoading(false);
  }, []);

  const login = async (email: string) => {
    setLoading(true);
    try {
      const res = await authService.login(email);
      setUser(res.user);
      setDbType(res.type);
      localStorage.setItem('pl-logged-in-user', JSON.stringify(res.user));
      localStorage.setItem('pl-db-type', res.type);

      // Sync user-store stats to match
      const legacyStats: UserStats = {
        name: res.user.name,
        xp: res.user.xp,
        streak: res.user.streak,
        level: res.user.level,
        completedLessons: res.user.completedLessons,
        totalLessons: res.user.totalLessons,
        weeklyGoal: res.user.weeklyGoal,
        weeklyCompleted: res.user.weeklyCompleted,
        subjectProgress: res.user.subjectProgress,
        badges: res.user.badges,
        recentQuizzes: res.user.recentQuizzes,
        todayPlan: [
          { id: 1, title: 'Solve 5 Quadratic Equations', subject: 'Math', duration: '15 mins', done: false },
          { id: 2, title: 'Read Photosynthesis outline', subject: 'Science', duration: '10 mins', done: true },
          { id: 3, title: 'Review Essay outlines with AI', subject: 'English', duration: '20 mins', done: false },
        ],
        weeklyProgress: [40, 60, 50, 70, 0, 0, 0],
        weakTopics: [],
        strongTopics: []
      };
      saveLocalStats(legacyStats);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, name: string, careerGoal: string, role: 'user' | 'student' | 'teacher') => {
    setLoading(true);
    try {
      const res = await authService.signUp(email, name, careerGoal, role);
      setUser(res.user);
      setDbType(res.type);
      localStorage.setItem('pl-logged-in-user', JSON.stringify(res.user));
      localStorage.setItem('pl-db-type', res.type);

      const legacyStats: UserStats = {
        name: res.user.name,
        xp: res.user.xp,
        streak: res.user.streak,
        level: res.user.level,
        completedLessons: res.user.completedLessons,
        totalLessons: res.user.totalLessons,
        weeklyGoal: res.user.weeklyGoal,
        weeklyCompleted: res.user.weeklyCompleted,
        subjectProgress: res.user.subjectProgress,
        badges: res.user.badges,
        recentQuizzes: res.user.recentQuizzes,
        todayPlan: [
          { id: 1, title: 'Solve 5 Quadratic Equations', subject: 'Math', duration: '15 mins', done: false },
          { id: 2, title: 'Read Photosynthesis outline', subject: 'Science', duration: '10 mins', done: true },
          { id: 3, title: 'Review Essay outlines with AI', subject: 'English', duration: '20 mins', done: false },
        ],
        weeklyProgress: [40, 60, 50, 70, 0, 0, 0],
        weakTopics: [],
        strongTopics: []
      };
      saveLocalStats(legacyStats);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setDbType(null);
    localStorage.removeItem('pl-logged-in-user');
    localStorage.removeItem('pl-db-type');
  };

  const updateStats = async (updater: (prev: UserStats) => UserStats) => {
    const prevStats = getLocalStats();
    const nextStats = updater(prevStats);
    saveLocalStats(nextStats);

    if (user) {
      const updatedProfile: UserProfile = {
        ...user,
        name: nextStats.name,
        xp: nextStats.xp,
        level: nextStats.level,
        streak: nextStats.streak,
        completedLessons: nextStats.completedLessons,
        totalLessons: nextStats.totalLessons,
        weeklyGoal: nextStats.weeklyGoal,
        weeklyCompleted: nextStats.weeklyCompleted,
        subjectProgress: nextStats.subjectProgress,
        badges: nextStats.badges,
        recentQuizzes: nextStats.recentQuizzes,
      };
      setUser(updatedProfile);
      localStorage.setItem('pl-logged-in-user', JSON.stringify(updatedProfile));
      
      // Async sync back to Supabase/Mock db
      try {
        await authService.syncProfile(updatedProfile);
      } catch (e) {
        console.error("Failed to sync progress:", e);
      }
    }
  };

  return (
    <UserContext.Provider value={{ user, loading, dbType, login, signUp, logout, updateStats }}>
      {children}
    </UserContext.Provider>
  );
}
