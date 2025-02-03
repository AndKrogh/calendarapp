import React from 'react';
import useFetchEvents from '../hooks/useFetchEvents';

const EventsPage = () => {
    const { events, loading } = useFetchEvents();

    if (loading) return <p>Loading events...</p>;

    return (
        <div>
            <h1>Events List</h1>
            <ul>
                {events.map(event => (
                    <li key={event.id}>
                        <strong>{event.title}</strong> - {event.date}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventsPage;
