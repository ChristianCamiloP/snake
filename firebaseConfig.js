import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA3oslVWKJQTqpDRkHxTRm14NCtd4oMDn8",
  authDomain: "dbdigitar-8eafa.firebaseapp.com",
  projectId: "dbdigitar-8eafa",
  storageBucket: "dbdigitar-8eafa.firebasestorage.app",
  messagingSenderId: "600216230142",
  appId: "1:600216230142:web:5ded152bf7f72c8633edaf",
  measurementId: "G-396G472VL7"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Inicializa Firestore
const db = getFirestore(app);

export { db };  // Exporta la instancia de Firestore
export default firebaseConfig;
