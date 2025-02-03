const express = require("express");
const { firestoreDB } = require("./config/firestore"); 
const { collection, getDocs } = require("firebase/firestore");
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to Firestore API!");
});

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
