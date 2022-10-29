import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBzItJ7YrkNYpv0vvKSdqLzrftAKCkwkxk",
  authDomain: "fir-auth-e91c0.firebaseapp.com",
  projectId: "fir-auth-e91c0",
  storageBucket: "fir-auth-e91c0.appspot.com",
  messagingSenderId: "780809967302",
  appId: "1:780809967302:web:3abea2de80ac4a72f869c7",
  measurementId: "G-1NZQHHW6RQ",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export { app, auth };
