import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { initializeApp } from "firebase/app";
// Import the functions you need from the SDKs you need


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQiAJxkVTzVmPlil2-jTzhy5AhkSTqbMU",
  authDomain: "blog-app-26811.firebaseapp.com",
  projectId: "blog-app-26811",
  storageBucket: "blog-app-26811.appspot.com",
  messagingSenderId: "874924980731",
  appId: "1:874924980731:web:cad85f68fbf17812aab35e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
  /* <React.StrictMode>}
{ </React.StrictMode> */
);

