import { FirebaseApp, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "skilled-hands.firebaseapp.com",
  projectId: "skilled-hands",
  storageBucket: "skilled-hands.appspot.com",
  messagingSenderId: "205319091757",
  appId: "1:205319091757:web:0145338e835e755861eaa4",
  measurementId: "G-71368X17PR",
};

const app: FirebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(app);