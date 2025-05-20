// js/firebase.js
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import dotenv from 'dotenv';
dotenv.config();
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBHG4OPhpfstY0mzc7UBw_HSuNNXyEBrLc",
    authDomain: "afrxchange.firebaseapp.com",
    projectId: "afrxchange",
    storageBucket: "afrxchange.firebasestorage.app",
    messagingSenderId: "491217477289",
    appId: "1:491217477289:web:97739cf7b7b5223de413b8",
    measurementId: "G-092PX60CZB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);