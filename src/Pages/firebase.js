// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEJ9HEu56KwvO2iwIdVIuUDR7FS06l0IE",
  authDomain: "podcast-app-ceb4c.firebaseapp.com",
  projectId: "podcast-app-ceb4c",
  storageBucket: "podcast-app-ceb4c.appspot.com",
  messagingSenderId: "1065397653539",
  appId: "1:1065397653539:web:52ed37c79a2ed309c1e196",
  measurementId: "G-BZ2M2HK3RF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getFirestore(app);
const storage=getStorage(app);
const auth=getAuth(app);

export{ db, storage,auth};