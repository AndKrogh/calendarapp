const express = require("express");
const eventController = require("../controllers/eventController");

const router = express.Router();

// Routes
router.get("/", eventController.getEvents);
router.post("/", eventController.createEvent);
router.delete("/:id", eventController.removeEvent);
router.put("/:id", eventController.editEvent);

export default router;