const express = require("express");
const cors = require("cors");
const eventController = require("./controllers/eventController");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routes
app.get("/getDataFromFireStore", eventController.getEvents);
app.post("/addEvent", eventController.createEvent);
app.delete("/deleteEvent/:id", eventController.removeEvent);
app.put("/updateEvent/:id", eventController.editEvent);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
