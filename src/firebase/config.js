// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxjM9vanp1ObD_ytC4OHtm65k2ff8cJWs",
  authDomain: "react-curso-b7955.firebaseapp.com",
  projectId: "react-curso-b7955",
  storageBucket: "react-curso-b7955.firebasestorage.app",
  messagingSenderId: "717085746031",
  appId: "1:717085746031:web:50ac88e3db232beb747e9a"
};

// Initialize Firebase
export const FirebaseApp  = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB   = getFirestore( FirebaseApp);