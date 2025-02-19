import express, { Router } from "express";
import eventController from "../controllers/eventController";

const router: Router = express.Router();

// Routes
router.get("/getDataFromFireStore", eventController.getEvents);
router.post("/addEvent", eventController.createEvent);
router.delete("/deleteEvent/:id", eventController.removeEvent);
router.put("/updateEvent/:id", eventController.editEvent);

export default router;