// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getFirestore, doc, setDoc } = require('firebase/firestore');
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

let app;
let firestoreDB;

// Initialize Firebase
const initializeFirebaseApp = () => {
    try {
        app = initializeApp(firebaseConfig);
        firestoreDB = getFirestore();
        return app;
    } catch(error) {
        errorHandler(error,  "firebase-initializeFirebaseApp");
    }
};

const uploadProcessedData = async () => {
    const dataToUpload = {
        key1: "test",
        key2: new Date(),
        key3: 123,
    };
    try {
        const document = doc(firestoreDB, "Tasks", "BpxLQZEl0bAJxpDnlgha");
        let dataUpdated = await setDoc(document, dataToUpload);
        return dataUpdated;
    } catch(error) {
        errorHandler(error, "firebase-uploadProcessedData");
    }
};

const getFirebaseApp = () => app;

module.exports = {
    initializeFirebaseApp,
    getFirebaseApp,
    uploadProcessedData,
};