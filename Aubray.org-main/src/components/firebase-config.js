// src/firebase-config.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBGH3NT5yvmF4MAKnv7rLJzkWBhzylnk_4",
    authDomain: "aubray-c2a05.firebaseapp.com",
    projectId: "aubray-c2a05",
    storageBucket: "aubray-c2a05.appspot.com", // ✅ corrected `.firebasestorage.app` to `.appspot.com`
    messagingSenderId: "364574786759",
    appId: "1:364574786759:web:1af78b2520e162c5fceae2",
    measurementId: "G-QQFWWM3B42"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Optional: only enable analytics in browser
let analytics;
if (typeof window !== "undefined") {
    analytics = getAnalytics(app);
}

export { app, analytics };



