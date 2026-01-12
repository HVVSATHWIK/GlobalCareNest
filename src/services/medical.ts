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
  const docRef = await addDoc(collection(db, 'medicalRecords'), record);
  return docRef.id;
};

export const getUserMedicalRecords = async (userId: string) => {
  const q = query(collection(db, 'medicalRecords'), where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as MedicalRecord[];
};

export const updateMedicalRecord = async (recordId: string, data: Partial<MedicalRecord>) => {
  const recordRef = doc(db, 'medicalRecords', recordId);
  await updateDoc(recordRef, data);
};

export const deleteMedicalRecord = async (recordId: string) => {
  await deleteDoc(doc(db, 'medicalRecords', recordId));
};