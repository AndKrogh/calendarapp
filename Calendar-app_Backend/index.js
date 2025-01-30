const express = require("express");
const { firestoreDB, verifyFirebaseToken } = require("./config/firestore");
const { collection, getDocs } = require("firebase/firestore");

const app = express();
const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
    res.send("Welcome to Firestore API!");
});

//Secured api route 
app.get("/getDataFromFireStore", verifyFirebaseToken, async (req, res) => {
    try {
        const collectionRef = collection(firestoreDB, "events");
        const docSnap = await getDocs(collectionRef);
        const finalData = docSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        res.json(finalData);
    } catch (error) {
        res.status(500).json({ error: "Error fetching data" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
