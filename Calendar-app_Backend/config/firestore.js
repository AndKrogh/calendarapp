// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const {
  getFirestore,
  doc,
  setDoc,
  getDocs,
  collection,
  query,
} = require("firebase/firestore");
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
  } catch (error) {
    console.log(error);
  }
};

const uploadProcessedData = async () => {
  const dataToUpload = {
    key1: "test",
    key2: new Date(),
    key3: 123,
  };
  try {
    const document = doc(firestoreDB, "Tasks", "testing-unique-id");
    let dataUpdated = await setDoc(document, dataToUpload);
    return dataUpdated;
  } catch (error) {
    console.log(error);
  }
};

const getTheData = async (from, to) => {
  try {
    const collectionRef = collection(firestoreDB, "tasks");
    const finalData = [];
    const q = query(collectionRef);

    const docSnap = await getDocs(q);

    /* console.log(docSnap); */

    docSnap.forEach((doc) => {
      finalData.push(doc.data());
    });

    console.log(finalData.length);
    return finalData;
  } catch (error) {
    console.log(error);
  }
};

const getFirebaseApp = () => app;

module.exports = {
  initializeFirebaseApp,
  getFirebaseApp,
  uploadProcessedData,
  getTheData,
};
