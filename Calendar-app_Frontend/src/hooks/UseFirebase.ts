import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3002'; 

export const useFirestore = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/events/getDataFromFireStore`);
            const data = await response.json();
            setEvents(data);
        } catch (error) {
            console.error('Error fetching events:', error);
        } finally {
            setLoading(false);
        }
    };

    const addEvent = async (event) => {
        try {
            const response = await fetch(`${API_URL}/events/addEvent`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(event), 
            });

            const data = await response.json();
            setEvents([...events, { id: data.id, ...event }]);
        } catch (error) {
            console.error("Error adding event:", error);
        }
    };

    const deleteEvent = async (eventId) => {
        try {
            const response = await fetch(`${API_URL}/events/deleteEvent/${eventId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchEvents(); 
            } else {
                console.error('Failed to delete event');
            }
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    const updateEvent = async (eventId, updatedData) => {
        try {
            const response = await fetch(`${API_URL}/events/updateEvent/${eventId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData),
            });

            if (response.ok) {
                fetchEvents(); 
            } else {
                console.error('Failed to update event');
            }
        } catch (error) {
            console.error('Error updating event:', error);
        }
    };

    useEffect(() => {
        fetchEvents(); 
    }, []);

    return { events, loading, fetchEvents, addEvent, deleteEvent, updateEvent };
};
