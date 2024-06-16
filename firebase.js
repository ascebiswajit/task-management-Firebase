// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";

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
const auth = getAuth(app);
const db = getFirestore(app);

// Firestore collections
const productsCollection = collection(db, 'products');

// Export Firebase Authentication and Firestore instance
export { auth, db, productsCollection };
