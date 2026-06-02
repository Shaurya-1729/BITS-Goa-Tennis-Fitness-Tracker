// Firebase SDK Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";

import {
  getFirestore
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

import {
  getAuth
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyB__3h5xpFLhqt4pM-YNqbwTYYJrVcFgKQ",
  authDomain: "tennis-fitness-tracker.firebaseapp.com",
  projectId: "tennis-fitness-tracker",
  storageBucket: "tennis-fitness-tracker.firebasestorage.app",
  messagingSenderId: "1039870706298",
  appId: "1:1039870706298:web:65e16ffabbf1ba9db271c3"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
