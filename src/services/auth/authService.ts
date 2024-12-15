import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  User
} from 'firebase/auth';
import { auth } from '../../config/firebase';
import { createUserProfile } from '../database/firestore';

export const signUp = async (
  email: string,
  password: string,
  name: string,
  role: 'patient' | 'doctor'
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const { user } = userCredential;

    await createUserProfile(user.uid, {
      email,
      name,
      role,
    });

    return user;
  } catch (error) {
    console.error('Error in sign up:', error);
    throw error;
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Error in sign in:', error);
    throw error;
  }
};

export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    
    // Create profile if it doesn't exist
    await createUserProfile(result.user.uid, {
      email: result.user.email!,
      name: result.user.displayName!,
      role: 'patient', // Default role for Google sign-in
    });
    
    return result.user;
  } catch (error) {
    console.error('Error in Google sign in:', error);
    throw error;
  }
};

export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error('Error in password reset:', error);
    throw error;
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error in sign out:', error);
    throw error;
  }
};