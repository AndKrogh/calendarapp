import React from 'react';
import useFetchEvents from '../hooks/UseFirebase';

const EventsPage = () => {
    const { events, loading } = useFetchEvents();

    if (loading) { return <p>Loading events...</p>; }

    return (
        <div>
            <h1>Events List</h1>
            <ul>
                {events.map(event => (
                    <li key={event.id}>
                        <strong>{event.name}</strong> - {new Date(event.date.seconds * 1000).toLocaleDateString()}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventsPage;
