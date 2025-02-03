import { useState, useEffect } from 'react';

const useFetchEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3001/getDataFromFireStore') 
            .then(response => response.json())
            .then(data => {
                setEvents(data);
                setLoading(false);
            })
            .catch(error => console.error('Error fetching events:', error));
    }, []);

    return { events, loading };
};

export default useFetchEvents;
