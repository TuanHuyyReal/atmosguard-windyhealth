import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyD4XVv-RDbr8UEkQZsRUiP9-gdIKWPvczg",
  authDomain: "windi-s-care.firebaseapp.com",
  projectId: "windi-s-care",
  storageBucket: "windi-s-care.firebasestorage.app",
  messagingSenderId: "789529603405",
  appId: "1:789529603405:web:f4fdcb31d42655bae9db04",
  measurementId: "G-0GM35XRZ8L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
