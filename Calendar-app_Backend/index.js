const express = require('express');
const app = express();
const PORT = app.listen(process.env.PORT || 3001);
const { initializeFirebaseApp, getTheData } = require("./config/firestore");


initializeFirebaseApp();

app.get('/', (req, res) => {
  res.send("hejeff");
  
});

app.get('/getDataFromFireStore', async (req, res) => {
    const data = await getTheData();
    return JSON.stringify(data);
})

app.listen(PORT, () => {
    console.log("Server running on port 3001");
});