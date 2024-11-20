// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCL92iGB8LwE-8vQ4LyU0O-tyKb4JNz6AI",
  authDomain: "travelgenie-f4bc9.firebaseapp.com",
  projectId: "travelgenie-f4bc9",
  storageBucket: "travelgenie-f4bc9.firebasestorage.app",
  messagingSenderId: "832633338848",
  appId: "1:832633338848:web:41a0211204800fe96f8985",
  measurementId: "G-XT8B1X0CEE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);