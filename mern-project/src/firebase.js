// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-project-20e62.firebaseapp.com",
  projectId: "mern-project-20e62",
  storageBucket: "mern-project-20e62.firebasestorage.app",
  messagingSenderId: "712653905339",
  appId: "1:712653905339:web:5d6a51ea0d380cdfc5f89e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);





