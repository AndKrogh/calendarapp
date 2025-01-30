const { initializeApp } = require("firebase/app");
const {
    getFirestore,
    doc,
    setDoc,
    getDocs,
    collection,
    query
} = require("firebase/firestore");

const {
    FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGE_SENDER_ID,
    FIREBASE_APP_ID
} = process.env;

const firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    messagingSenderId: FIREBASE_MESSAGE_SENDER_ID,
    appId: FIREBASE_APP_ID
};

let app;
let firestoreDB;

const initializeFirebaseApp = () => {
    try {
        app = initializeApp(firebaseConfig);
        firestoreDB = getFirestore(app);
        console.log("Firebase initialized!");
    } catch (error) {
        console.error("Firebase init error:", error);
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
        await setDoc(document, dataToUpload);
        console.log("Data uploaded successfully!");
    } catch (error) {
        console.error("Error uploading data:", error);
    }
};

const getTheData = async () => {
    try {
        const collectionRef = collection(firestoreDB, "events");
        const finalData = [];
        const q = query(collectionRef);
        const docSnap = await getDocs(q);

        docSnap.docs.forEach((doc) => {
            finalData.push({ id: doc.id, ...doc.data() });
        });

        console.log(`Retrieved ${finalData.length} documents`);
        return finalData;
    } catch (error) {
        console.error("Error retrieving data:", error);
        return [];
    }
};

module.exports = {
    initializeFirebaseApp,
    uploadProcessedData,
    getTheData,
};
