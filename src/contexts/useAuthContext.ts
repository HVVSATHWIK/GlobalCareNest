import { useContext } from 'react';
import type { User as FirebaseUser } from 'firebase/auth';
import { AuthContext } from './AuthContext';

export interface AuthContextType {
  user: FirebaseUser | null;
  loading: boolean;
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
