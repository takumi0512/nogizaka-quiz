// firebase

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDqlHM2bmEgYQpf0fDP2TrMGTbpCCBtv8U",
  authDomain: "quiznogizaka.firebaseapp.com",
  projectId: "quiznogizaka",
  storageBucket: "quiznogizaka.appspot.com",
  messagingSenderId: "704560779055",
  appId: "1:704560779055:web:665738b6ccbc04a5bf5bda",
  measurementId: "G-Q3RY2Z39J3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export {db}