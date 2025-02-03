const express = require("express");
const { firestoreDB } = require("./config/firestore"); // Remove verifyFirebaseToken
const { collection, getDocs } = require("firebase/firestore");

const app = express();
const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
    res.send("Welcome to Firestore API!");
});

// ? Public API Route - No Authentication Required
app.get("/getDataFromFireStore", async (req, res) => {
    try {
        const collectionRef = collection(firestoreDB, "events");
        const docSnap = await getDocs(collectionRef);
        const finalData = docSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        res.json(finalData);
    } catch (error) {
        res.status(500).json({ error: "Error fetching data", details: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
