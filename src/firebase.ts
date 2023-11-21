// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth}  from "firebase/auth";
 // TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgrUuHDLbZh1DsZm2SCRgA9wi_pMEd6vI",
  authDomain: "twiter-clone-coding.firebaseapp.com",
  databaseURL: "https://twiter-clone-coding.firebaseio.com",
  projectId: "twiter-clone-coding",
  storageBucket: "twiter-clone-coding.appspot.com",
  messagingSenderId: "938017876665",
  appId: "1:938017876665:web:be83b6333618aa9b3ec968",
  measurementId: "G-G8WBKNDFC5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
