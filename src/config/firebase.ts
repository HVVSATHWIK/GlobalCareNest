import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC-ualGLZVv2O-B34JG4S7_tZBsN_8Q8W0",
  authDomain: "global-carenest.firebaseapp.com",
  projectId: "global-carenest",
  storageBucket: "global-carenest.firebasestorage.app",
  messagingSenderId: "843009572087",
  appId: "1:843009572087:web:51b6570a5b8253bde5e7f2",
  measurementId: "G-SED50ZVK4P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);