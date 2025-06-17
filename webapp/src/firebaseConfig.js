// firebaseConfig.js (or similar name)
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAUhnUmbSZCvmZVrz1ZqAbI6O-S95w-QOI",
  authDomain: "careconnect-34acb.firebaseapp.com",
  projectId: "careconnect-34acb",
  storageBucket: "careconnect-34acb.firebasestorage.app",
  messagingSenderId: "736447514005",
  appId: "1:736447514005:web:5a0155830a0f9722c5e29c",
  measurementId: "G-F93HPC4HV9"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, analytics };