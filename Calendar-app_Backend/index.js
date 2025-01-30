const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const { initializeFirebaseApp, getTheData } = require("./config/firestore");

initializeFirebaseApp();

app.get('/', (req, res) => {
    res.send("hejeff");
});

app.get('/getDataFromFireStore', async (req, res) => {
    try {
        const data = await getTheData();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Error fetching data" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
