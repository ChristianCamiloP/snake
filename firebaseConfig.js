// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3oslVWKJQTqpDRkHxTRm14NCtd4oMDn8",
  authDomain: "dbdigitar-8eafa.firebaseapp.com",
  projectId: "dbdigitar-8eafa",
  storageBucket: "dbdigitar-8eafa.firebasestorage.app",
  messagingSenderId: "600216230142",
  appId: "1:600216230142:web:5ded152bf7f72c8633edaf",
  measurementId: "G-396G472VL7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



export { database };
