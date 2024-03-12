const express = require('express');
const app = express();
const { initializeFirebaseApp } = require("./config/firestore");
const { uploadProcessedData } = require("./config/firestore");
initializeFirebaseApp();

app.get('/', (req, res) => {
  res.send('Testing Hello World!')
});

app.post('/postToFireStore', async (req, res) => {
    await uploadProcessedData();
    return "succes";
})

app.listen('3001', () => {
    console.log("Server running on port 3001");
});