import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC4U_cAHpQ76ne3QKGyUWdGu3ripu98TlE",
  authDomain: "footy-poty.firebaseapp.com",
  projectId: "footy-poty",
  storageBucket: "footy-poty.appspot.com",
  messagingSenderId: "853533034146",
  appId: "1:853533034146:web:b29f2b56584e22289539fb",
  measurementId: "G-EQ7GL15QS3",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;
