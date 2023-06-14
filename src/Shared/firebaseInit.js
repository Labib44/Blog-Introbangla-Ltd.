// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDpf-2W3_T9oII5XFWxSU7r5hFYMn0mpgE",
//   authDomain: "lobdho-blog.firebaseapp.com",
//   projectId: "lobdho-blog",
//   storageBucket: "lobdho-blog.appspot.com",
//   messagingSenderId: "1014422902234",
//   appId: "1:1014422902234:web:5cd5b45540451884c9dce3"
// };
const firebaseConfig = {
  apiKey: "AIzaSyApQ92U-e-IB34QkmrdGJzHaFA4tPhyZuA",
  authDomain: "click-the-point.firebaseapp.com",
  projectId: "click-the-point",
  storageBucket: "click-the-point.appspot.com",
  messagingSenderId: "1201021570",
  appId: "1:1201021570:web:2270420deb5eb3a633ca9b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
 
export default auth;