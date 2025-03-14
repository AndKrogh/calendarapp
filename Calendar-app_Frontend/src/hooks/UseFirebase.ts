import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3002'; 
interface Event {
    id?: string;
    title: string;
    date: string;
    location?: string;
    description?: string;
}

export const useFirestore = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchEvents = async (): Promise<void> => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/events/getDataFromFireStore`);
            const data: Event[] = await response.json();
            setEvents(data);
        } catch (error) {
            console.error('Error fetching events:', error);
        } finally {
            setLoading(false);
        }
    };

    const addEvent = async (event: Event): Promise<void> => {
        try {
            const response = await fetch(`${API_URL}/events/addEvent`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(event),
            });

            const data: { id: string } = await response.json();
            setEvents([...events, { id: data.id, ...event }]);
        } catch (error) {
            console.error("Error adding event:", error);
        }
    };

    const deleteEvent = async (eventId:string): Promise<void> => {
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

    const updateEvent = async (eventId: string, updatedData: Partial<Event>): Promise<void> => {
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
