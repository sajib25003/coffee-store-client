// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1C7_j43k9R1CrYcwYUhDkweeRvFQR_NI",
  authDomain: "coffee-store-6428c.firebaseapp.com",
  projectId: "coffee-store-6428c",
  storageBucket: "coffee-store-6428c.appspot.com",
  messagingSenderId: "691028680833",
  appId: "1:691028680833:web:c6eca5fbb76dddb9f72d80"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
