import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// Configure Firebase.
const config = {
  apiKey: "AIzaSyBY8UlL0PP1s-8VB135pQdc9L0dZQJXQLA",
  authDomain: "wonders-calculator.firebaseapp.com",
  projectId: "wonders-calculator",
  appId: "1:708663772434:web:5ce24fa5b11f1517879fcb",
  measurementId: "G-G9Y286MRPB",
};

firebase.initializeApp(config);
