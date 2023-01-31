// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


import {getAuth, GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlqyd8HlV5Z_OgUANZnFCm3J4RBi_Ryzc",
  authDomain: "animenew-82be3.firebaseapp.com",
  projectId: "animenew-82be3",
  storageBucket: "animenew-82be3.appspot.com",
  messagingSenderId: "489149725636",
  appId: "1:489149725636:web:87ea2aa06b845ae5654291",
  measurementId: "G-FBTYEWVJJS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider()
export const database = getFirestore(app)
