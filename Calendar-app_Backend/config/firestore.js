// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
 
const {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGE_SENDER_ID,
  FIREBASE_APP_ID,

} = process.env;

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGE_SENDER_ID,
  appId: FIREBASE_APP_ID,

};

// Initialize Firebase
let app = initializeApp(firebaseConfig);
let firestoreDB;

const getFirebaseApp = () => {
    try {
        app = initializeApp(firebaseConfig);
        firestoreDB = getFirestore();
        return app;
    }
    catch(error) {
        errorHandler(error,  "firebase-initializeFirebaseApp");
    }
};

module.exports = {
    initializeApp,
    getFirebaseApp,
};