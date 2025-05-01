// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvhqPpqjmiHdeCtJyqyrXvHRvBxSDFLl0",
  authDomain: "ecommerce-8dfc7.firebaseapp.com",
  projectId: "ecommerce-8dfc7",
  storageBucket: "ecommerce-8dfc7.firebasestorage.app",
  messagingSenderId: "402902073918",
  appId: "1:402902073918:web:3ae68c3820e39ba6ad476f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
