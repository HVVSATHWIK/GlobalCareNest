import { db } from '../config/firebase';
import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc,
  collection,
  query,
  where,
  getDocs
} from 'firebase/firestore';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  photoURL?: string;
  dateOfBirth?: string;
  bloodType?: string;
  height?: number;
  weight?: number;
  allergies?: string[];
  medications?: string[];
  medicalHistory?: string[];
}

export const createUserProfile = async (userData: UserProfile) => {
  try {
    await setDoc(doc(db, 'users', userData.id), userData);
  } catch (error) {
    throw error;
  }
};

export const getUserProfile = async (userId: string) => {
  try {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() as UserProfile : null;
  } catch (error) {
    throw error;
  }
};

export const updateUserProfile = async (userId: string, data: Partial<UserProfile>) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, data);
  } catch (error) {
    throw error;
  }
};