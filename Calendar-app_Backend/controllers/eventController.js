const eventService = require("../services/eventService");

const getEvents = async (req, res) => {
    try {
        const events = await eventService.getAllEvents();
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: "Error fetching events", details: error.message });
    }
};

const createEvent = async (req, res) => {
    try {
        const { name, date } = req.body;
        if (!name || !date) {
            return res.status(400).json({ error: "Missing event name or date" });
        }
        const event = await eventService.addEvent(name, date);
        res.json({ message: "Event added successfully", event });
    } catch (error) {
        res.status(500).json({ error: "Error adding event", details: error.message });
    }
};

const removeEvent = async (req, res) => {
    try {
        await eventService.deleteEvent(req.params.id);
        res.json({ message: `Event ${req.params.id} deleted successfully` });
    } catch (error) {
        res.status(500).json({ error: "Error deleting event", details: error.message });
    }
};

const editEvent = async (req, res) => {
    try {
        await eventService.updateEvent(req.params.id, req.body);
        res.json({ message: `Event ${req.params.id} updated successfully` });
    } catch (error) {
        res.status(500).json({ error: "Error updating event", details: error.message });
    }
};

module.exports = {
    getEvents,
    createEvent,
    removeEvent,
    editEvent
};
