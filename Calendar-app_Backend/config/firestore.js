const admin = require("firebase-admin");
const { initializeApp } = require("firebase/app");
const { getFirestore, collection, getDocs } = require("firebase/firestore");
require("dotenv").config();

const serviceAccount = require("./serviceAccountKey.json");  

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const firestoreDB = getFirestore(app);

// Middleware to verify firebase auth token
const verifyFirebaseToken = async (req, res, next) => {
    const token = req.headers.authorization?.split("Bearer ")[1]; 

    if (!token) {
        return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken; 
        next();
    } catch (error) {
        return res.status(403).json({ error: "Unauthorized: Invalid token" });
    }
};

module.exports = {
    firestoreDB,
    verifyFirebaseToken,
};
