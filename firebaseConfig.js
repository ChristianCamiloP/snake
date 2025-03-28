// firebaseConfig.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

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
const analytics = getAnalytics(app);

// Inicializa Firestore
const db = getFirestore(app);

export { db };  // Exporta la instancia de Firestore
export default firebaseConfig;
