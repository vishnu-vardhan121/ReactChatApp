import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
 apiKey: "AIzaSyBHFOsrRGiEJsB5LWP2UxckTzzQcM23R64",
  authDomain: "chatapp-3c5ca.firebaseapp.com",
  projectId: "chatapp-3c5ca",
  storageBucket: "chatapp-3c5ca.appspot.com",
  messagingSenderId: "529154606855",
  appId: "1:529154606855:web:a912c6f8ffd4800f3127a2"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage(app);
export const db = getFirestore(app)