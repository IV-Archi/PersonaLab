import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = 
  supabaseUrl.trim() !== '' && 
  supabaseAnonKey.trim() !== '' &&
  !supabaseUrl.includes('placeholder') &&
  !supabaseAnonKey.includes('placeholder');

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Simulated latency helper
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock authentication and progress store
export interface UserProfile {
  id: string;
  email: string;
  name: string;
  xp: number;
  level: number;
  streak: number;
  completedLessons: number;
  totalLessons: number;
  weeklyGoal: number;
  weeklyCompleted: number;
  subjectProgress: Record<string, number>;
  badges: string[];
  recentQuizzes: any[];
  careerGoal: string;
  role?: 'user' | 'student' | 'teacher';
}

// In-memory mock database for local simulation
let mockDbUsers: Record<string, { profile: UserProfile; passwordHash: string }> = {};

// Load mock DB from localStorage if available
if (typeof window !== 'undefined') {
  try {
    const saved = localStorage.getItem('pl-mock-db-users');
    if (saved) {
      mockDbUsers = JSON.parse(saved);
    }
  } catch (e) {
    console.error("Failed to load mock users database:", e);
  }
}

function saveMockDb() {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('pl-mock-db-users', JSON.stringify(mockDbUsers));
    } catch (e) {
      console.error("Failed to save mock users database:", e);
    }
  }
}

export const authService = {
  async signUp(email: string, name: string, careerGoal: string, role: 'user' | 'student' | 'teacher' = 'user'): Promise<{ user: UserProfile; type: 'real' | 'simulation' }> {
    await delay(800); // Simulate network latency

    const serializedGoal = `[${role}] ${careerGoal}`;

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password: 'DummyPassword123!', // Simple dummy password for demonstration
          options: {
            data: { name, career_goal: serializedGoal }
          }
        });
        if (error) throw error;
        
        // Save initial profile
        if (data.user) {
          const profile: UserProfile = {
            id: data.user.id,
            email,
            name,
            xp: 0,
            level: 1,
            streak: 1,
            completedLessons: 0,
            totalLessons: 30,
            weeklyGoal: 5,
            weeklyCompleted: 0,
            subjectProgress: { Math: 0, English: 0, Science: 0, History: 0 },
            badges: [],
            recentQuizzes: [],
            careerGoal,
            role
          };
          
          await supabase.from('profiles').insert([
            {
              id: data.user.id,
              name,
              xp: 0,
              level: 1,
              streak: 1,
              completed_lessons: 0,
              total_lessons: 30,
              weekly_goal: 5,
              weekly_completed: 0,
              subject_progress: profile.subjectProgress,
              badges: [],
              recent_quizzes: [],
              career_goal: serializedGoal
            }
          ]);
          return { user: profile, type: 'real' };
        }
      } catch (err: any) {
        console.warn("Supabase SignUp error, falling back to simulation:", err.message);
      }
    }

    // Simulation Fallback
    const cleanEmail = email.toLowerCase().trim();
    if (mockDbUsers[cleanEmail]) {
      throw new Error("User already exists with this email address.");
    }

    const userId = 'usr_' + Math.random().toString(36).substring(2, 11);
    const profile: UserProfile = {
      id: userId,
      email: cleanEmail,
      name,
      xp: 0,
      level: 1,
      streak: 1,
      completedLessons: 0,
      totalLessons: 30,
      weeklyGoal: 5,
      weeklyCompleted: 0,
      subjectProgress: { Math: 0, English: 0, Science: 0, History: 0 },
      badges: [],
      recentQuizzes: [],
      careerGoal,
      role
    };

    mockDbUsers[cleanEmail] = {
      profile,
      passwordHash: 'simulated_hash'
    };
    saveMockDb();

    return { user: profile, type: 'simulation' };
  },

  async login(email: string): Promise<{ user: UserProfile; type: 'real' | 'simulation' }> {
    await delay(600); // Simulate network latency

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password: 'DummyPassword123!'
        });
        if (error) throw error;

        if (data.user) {
          const { data: profileData, error: profileErr } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .single();

          if (profileErr) throw profileErr;

          const rawGoal = profileData.career_goal || '';
          let parsedRole: 'user' | 'student' | 'teacher' = 'user';
          let parsedGoal = rawGoal;
          if (rawGoal.startsWith('[teacher]')) {
            parsedRole = 'teacher';
            parsedGoal = rawGoal.replace('[teacher] ', '');
          } else if (rawGoal.startsWith('[student]')) {
            parsedRole = 'student';
            parsedGoal = rawGoal.replace('[student] ', '');
          } else if (rawGoal.startsWith('[user]')) {
            parsedRole = 'user';
            parsedGoal = rawGoal.replace('[user] ', '');
          }

          const profile: UserProfile = {
            id: data.user.id,
            email,
            name: profileData.name,
            xp: profileData.xp,
            level: profileData.level,
            streak: profileData.streak,
            completedLessons: profileData.completed_lessons,
            totalLessons: profileData.total_lessons,
            weeklyGoal: profileData.weekly_goal,
            weeklyCompleted: profileData.weekly_completed,
            subjectProgress: profileData.subject_progress,
            badges: profileData.badges,
            recentQuizzes: profileData.recent_quizzes,
            careerGoal: parsedGoal,
            role: parsedRole
          };
          return { user: profile, type: 'real' };
        }
      } catch (err: any) {
        console.warn("Supabase Login error, falling back to simulation:", err.message);
      }
    }

    // Simulation Fallback
    const cleanEmail = email.toLowerCase().trim();
    const mockUser = mockDbUsers[cleanEmail];
    if (!mockUser) {
      throw new Error("No user found with this email. Please sign up first!");
    }

    return { user: mockUser.profile, type: 'simulation' };
  },

  async syncProfile(profile: UserProfile): Promise<{ success: boolean; type: 'real' | 'simulation' }> {
    const serializedGoal = `[${profile.role || 'user'}] ${profile.careerGoal}`;

    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase
          .from('profiles')
          .update({
            name: profile.name,
            xp: profile.xp,
            level: profile.level,
            streak: profile.streak,
            completed_lessons: profile.completedLessons,
            total_lessons: profile.totalLessons,
            weekly_goal: profile.weeklyGoal,
            weekly_completed: profile.weeklyCompleted,
            subject_progress: profile.subjectProgress,
            badges: profile.badges,
            recent_quizzes: profile.recentQuizzes,
            career_goal: serializedGoal
          })
          .eq('id', profile.id);
        if (error) throw error;
        return { success: true, type: 'real' };
      } catch (err: any) {
        console.warn("Supabase Sync error:", err.message);
      }
    }

    // Simulation Fallback
    const cleanEmail = profile.email.toLowerCase().trim();
    if (mockDbUsers[cleanEmail]) {
      mockDbUsers[cleanEmail].profile = { ...profile };
      saveMockDb();
    }
    return { success: true, type: 'simulation' };
  }
};
