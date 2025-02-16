const express = require("express");
const { firestoreDB } = require("./config/firestore");
const { collection, getDocs, doc, deleteDoc, updateDoc, addDoc } = require("firebase/firestore");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/getDataFromFireStore", async (req, res) => {
    try {
        const collectionRef = collection(firestoreDB, "events");
        const docSnap = await getDocs(collectionRef);
        const finalData = docSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        res.json(finalData);
    } catch (error) {
        res.status(500).json({ error: "Error fetching data", details: error.message });
    }
});

app.post("/addEvent", async (req, res) => {
    try {
        const { name, date } = req.body;

        if (!name || !date) {
            return res.status(400).json({ error: "Missing event name or date" });
        }

        const collectionRef = collection(firestoreDB, "events");
        const docRef = await addDoc(collectionRef, { name, date });

        res.json({ message: "Event added successfully", id: docRef.id });
    } catch (error) {
        res.status(500).json({ error: "Error adding event", details: error.message });
    }
});

app.delete("/deleteEvent/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const eventDoc = doc(firestoreDB, "events", id);
        await deleteDoc(eventDoc);

        res.json({ message: `Event ${id} deleted successfully` });
    } catch (error) {
        res.status(500).json({ error: "Error deleting event", details: error.message });
    }
});

app.put("/updateEvent/:id", async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body; 

    try {
        const eventDoc = doc(firestoreDB, "events", id);
        await updateDoc(eventDoc, updatedData);

        res.json({ message: `Event ${id} updated successfully` });
    } catch (error) {
        res.status(500).json({ error: "Error updating event", details: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
