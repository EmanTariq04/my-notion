// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAD6jzfj8O6oMAaEXkx-QxB63ptr5nL_Do",
    authDomain: "my-notion-f132d.firebaseapp.com",
    projectId: "my-notion-f132d",
    storageBucket: "my-notion-f132d.firebasestorage.app",
    messagingSenderId: "91696548605",
    appId: "1:91696548605:web:a0386c5cf7378bea904c94"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };