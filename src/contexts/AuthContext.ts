import { createContext } from 'react';
import { User } from '../app-types/auth';

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
