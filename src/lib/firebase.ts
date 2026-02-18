// src/lib/firebase.ts
// Firebase configuration and initialization for React + TypeScript (Vite)
// Uses v9 modular SDK and environment variables for security

import { initializeApp, FirebaseApp, getApps } from "firebase/app";
import { getAuth, Auth, GoogleAuthProvider } from "firebase/auth";

// Get config from Vite environment variables (never hardcode sensitive info)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string,
  messagingSenderId: import.meta.env
    .VITE_FIREBASE_MESSAGING_SENDER_ID as string,
  appId: import.meta.env.VITE_FIREBASE_APP_ID as string,
};

// Check if Firebase is properly configured
const firebaseEnabled = !!(
  firebaseConfig.apiKey &&
  firebaseConfig.authDomain &&
  firebaseConfig.projectId
);

// Initialize Firebase app only if configured (singleton pattern)
let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let googleProvider: GoogleAuthProvider | null = null;

if (firebaseEnabled) {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  auth = getAuth(app);
  googleProvider = new GoogleAuthProvider();
} else {
  console.warn(
    "Firebase not configured. Add VITE_FIREBASE_* env vars to enable Firebase Auth.",
  );
}

export { auth, googleProvider, firebaseEnabled };
export default app;
