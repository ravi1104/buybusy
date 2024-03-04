// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDigA8_kzfWLTQTXqVgdRRtSn7jTL3ymqk",
  authDomain: "web-app-b465a.firebaseapp.com",
  projectId: "web-app-b465a",
  storageBucket: "web-app-b465a.appspot.com",
  messagingSenderId: "916702546305",
  appId: "1:916702546305:web:f1e542c3ae9827e0a5c080"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;
