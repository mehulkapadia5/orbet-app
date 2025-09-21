// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpSM7G1EymdEznPi6poK2AEVgV_lVR-Qc",
  authDomain: "orbet-ai.firebaseapp.com",
  projectId: "orbet-ai",
  storageBucket: "orbet-ai.firebasestorage.app",
  messagingSenderId: "766042631656",
  appId: "1:766042631656:web:3c03b19bb4d93a1a94c85d",
  measurementId: "G-0CZD1FDMFW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Initialize Analytics only on client side
let analytics: ReturnType<typeof getAnalytics> | null = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, analytics, auth, googleProvider };
