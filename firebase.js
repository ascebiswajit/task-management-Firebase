// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuWxFLUI0XTDdYGhEt41HHuLL52Ekdp3Y",
  authDomain: "raect-native-demo.firebaseapp.com",
  projectId: "raect-native-demo",
  storageBucket: "raect-native-demo.appspot.com",
  messagingSenderId: "976435615437",
  appId: "1:976435615437:web:1ede12591656a147d47b84",
  measurementId: "G-YMESE0ETKD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
