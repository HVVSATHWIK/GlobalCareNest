import { db } from '../config/firebase';
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs,
  updateDoc,
  doc,
  deleteDoc
} from 'firebase/firestore';

export interface MedicalRecord {
  id?: string;
  userId: string;
  type: string;
  date: string;
  description: string;
  attachments?: string[];
  doctorName?: string;
  facility?: string;
  diagnosis?: string;
  prescriptions?: string[];
  followUpDate?: string;
}

export const addMedicalRecord = async (record: MedicalRecord) => {
  try {
    const docRef = await addDoc(collection(db, 'medicalRecords'), record);
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const getUserMedicalRecords = async (userId: string) => {
  try {
    const q = query(collection(db, 'medicalRecords'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as MedicalRecord[];
  } catch (error) {
    throw error;
  }
};

export const updateMedicalRecord = async (recordId: string, data: Partial<MedicalRecord>) => {
  try {
    const recordRef = doc(db, 'medicalRecords', recordId);
    await updateDoc(recordRef, data);
  } catch (error) {
    throw error;
  }
};

export const deleteMedicalRecord = async (recordId: string) => {
  try {
    await deleteDoc(doc(db, 'medicalRecords', recordId));
  } catch (error) {
    throw error;
  }
};