// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyASRqoaefor2hT88tNRTgmCL3u8D8ZUEl4",
  authDomain: "introbangla-ltd.firebaseapp.com",
  projectId: "introbangla-ltd",
  storageBucket: "introbangla-ltd.appspot.com",
  messagingSenderId: "85238762833",
  appId: "1:85238762833:web:5a8e8b3e05748af2975770"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
 
export default auth;