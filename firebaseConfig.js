// Importar los módulos necesarios desde el SDK de Firebase
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, query, orderBy, limit, getDocs } from "firebase/firestore";

// Tu configuración de Firebase (reemplaza con tu propia configuración)
const firebaseConfig = {
  apiKey: "AIzaSyDhgSdpsEd91_M4fa0EMBnbDeDUkwH2ojs",
  authDomain: "db-preguntas.firebaseapp.com",
  projectId: "db-preguntas",
  storageBucket: "db-preguntas.firebasestorage.app",
  messagingSenderId: "1017897171716",
  appId: "1:1017897171716:web:a02f9095d2db96d85b2e51"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore
const db = getFirestore(app);

