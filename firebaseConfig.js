import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA3oslVWKJQTqpDRkHxTRm14NCtd4oMDn8",
  authDomain: "dbdigitar-8eafa.firebaseapp.com",
  databaseURL: "https://dbdigitar-8eafa-default-rtdb.firebaseio.com/", // Asegúrate de que esta URL sea la correcta
  projectId: "dbdigitar-8eafa",
  storageBucket: "dbdigitar-8eafa.appspot.com",
  messagingSenderId: "600216230142",
  appId: "1:600216230142:web:5ded152bf7f72c8633edaf",
  measurementId: "G-396G472VL7"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Realtime Database
const database = getDatabase(app);

export { database }; // Exporta la instancia de Realtime Database
