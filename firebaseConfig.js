import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA3oslVWKJQTqpDRkHxTRm14NCtd4oMDn8",
  authDomain: "dbdigitar-8eafa.firebaseapp.com",
  databaseURL: "https://dbdigitar-8eafa-default-rtdb.firebaseio.com/", 
  projectId: "dbdigitar-8eafa",
  storageBucket: "dbdigitar-8eafa.appspot.com",
  messagingSenderId: "600216230142",
  appId: "1:600216230142:web:5ded152bf7f72c8633edaf",
  measurementId: "G-396G472VL7"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
