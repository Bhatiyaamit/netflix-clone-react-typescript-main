// src/lib/firebase.ts
// Firebase configuration and initialization for React + TypeScript (Vite)
// Uses v9 modular SDK and environment variables for security

import { initializeApp, FirebaseApp, getApps } from "firebase/app";
import { getAuth, Auth, GoogleAuthProvider } from "firebase/auth";

// Define the Firebase config type for better type safety
interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

// Get config from Vite environment variables (never hardcode sensitive info)
const firebaseConfig: FirebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string,
  appId: import.meta.env.VITE_FIREBASE_APP_ID as string,
};

// Initialize Firebase app (singleton pattern)
const app: FirebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]; 

// Initialize Firebase Auth instance
export const auth: Auth = getAuth(app);

// Export GoogleAuthProvider for Google sign-in
export const googleProvider = new GoogleAuthProvider();

// Export the app if needed elsewhere
export default app;
