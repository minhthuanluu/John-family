// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjQiwBeG4nCTlks6tZ8GUIDxh75do9Lvw",
  authDomain: "john-s-family.firebaseapp.com",
  databaseURL: "https://john-s-family-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "john-s-family",
  storageBucket: "john-s-family.appspot.com",
  messagingSenderId: "433209438935",
  appId: "1:433209438935:web:0abdadaabdb78b39c6b692"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const db = getDatabase();

export default app;
