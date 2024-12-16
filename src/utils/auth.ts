import { User } from 'firebase/auth';

export const formatUserProfile = (user: User) => {
  return {
    id: user.uid,
    email: user.email || '',
    name: user.displayName || '',
    photoURL: user.photoURL || '',
  };
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};