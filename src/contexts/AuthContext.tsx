import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
}

interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  is_admin: boolean;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'koyama_user';
const PROFILES_KEY = 'koyama_profiles';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    const profiles = JSON.parse(localStorage.getItem(PROFILES_KEY) || '{}');
    return profiles[userId] || null;
  };

  const refreshProfile = async () => {
    if (user) {
      const profileData = await fetchProfile(user.id);
      setProfile(profileData);
    }
  };

  useEffect(() => {
    // Check for saved user session
    const savedUser = localStorage.getItem(STORAGE_KEY);
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        (async () => {
          const profileData = await fetchProfile(parsedUser.id);
          setProfile(profileData);
          setLoading(false);
        })();
      } catch (error) {
        console.error('Error loading user:', error);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    // Simple local authentication
    const profiles = JSON.parse(localStorage.getItem(PROFILES_KEY) || '{}');
    
    for (const profileId in profiles) {
      const profile = profiles[profileId];
      if (profile.email === email) {
        // In a real app, you'd verify the password
        const newUser: User = {
          id: profileId,
          email,
        };
        setUser(newUser);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
        setProfile(profile);
        return;
      }
    }
    
    throw new Error('Invalid email or password');
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    const profiles = JSON.parse(localStorage.getItem(PROFILES_KEY) || '{}');
    
    // Check if email already exists
    for (const profileId in profiles) {
      if (profiles[profileId].email === email) {
        throw new Error('Email already exists');
      }
    }
    
    // Create new user
    const userId = `user-${Date.now()}`;
    const newProfile: Profile = {
      id: userId,
      email,
      full_name: fullName,
      phone: null,
      address: null,
      city: null,
      is_admin: false,
    };
    
    profiles[userId] = newProfile;
    localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
    
    const newUser: User = {
      id: userId,
      email,
    };
    
    setUser(newUser);
    setProfile(newProfile);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
  };

  const signOut = async () => {
    setUser(null);
    setProfile(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        signIn,
        signUp,
        signOut,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
