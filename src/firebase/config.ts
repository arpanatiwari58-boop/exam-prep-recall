// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-F8UcQCX22tpF42ZjDnGLCQnnK_dPGNo",
  authDomain: "study-help-d41f0.firebaseapp.com",
  projectId: "study-help-d41f0",
  storageBucket: "study-help-d41f0.firebasestorage.app",
  messagingSenderId: "420936006288",
  appId: "1:420936006288:web:2e9d23bed456927099f615",
  measurementId: "G-LGR9M9HG1H"
};

// Initialize Firebase
// We use getApps() to ensure we don't initialize the app multiple times in development/SSR
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Analytics is only available in the browser (client-side)
let analytics;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export const db = getFirestore(app);
export { app, analytics };
