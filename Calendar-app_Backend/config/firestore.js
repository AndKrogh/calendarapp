const { initializeApp } = require("firebase/app");
const { getFirestore, collection, getDocs } = require("firebase/firestore");
require("dotenv").config(); 

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

const HARDCODED_TOKEN = process.env.HARDCODED_AUTH_TOKEN || "your-hardcoded-token-here";

// Middleware to validate hardcoded token
const verifyFirebaseToken = async (req, res, next) => {
    const token = req.headers.authorization?.split("Bearer ")[1];

    if (!token) {
        return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    if (token !== HARDCODED_TOKEN) {
        return res.status(403).json({ error: "Unauthorized: Invalid token" });
    }

    // Mock user data
    req.user = { uid: "test-user-123", email: "test@example.com" };
    next();
};

module.exports = { firestoreDB, verifyFirebaseToken };
