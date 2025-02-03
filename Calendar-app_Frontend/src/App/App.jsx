import React, { useState } from 'react';
import { CalendarHeader } from '../CalendarHeader/CalendarHeader';
import { Day } from '../Day/Day';
import { NewEventModal } from '../NewEventModal/NewEventmodal';
import { DeleteEventModal } from '../DeleteEventModal/DeleteEventModal';
import { useDate } from '../hooks/useDate';
import useFetchEvents from '../hooks/useFirebase'; 

function App() {
    const [nav, setNav] = useState(0);
    const [clicked, setClicked] = useState(null);

    const { events, loading } = useFetchEvents();

    const { days, dateDisplay } = useDate(events, nav);

    if (loading) return <div>Loading events...</div>;

    return (
        <>
            <div id="container">
                <CalendarHeader
                    dateDisplay={dateDisplay}
                    onNext={() => setNav(nav + 1)}
                    onBack={() => setNav(nav - 1)}
                />
                <div id="weekdays">
                    <div>Sunday</div>
                    <div>Monday</div>
                    <div>Tuesday</div>
                    <div>Wednesday</div>
                    <div>Thursday</div>
                    <div>Friday</div>
                    <div>Saturday</div>
                </div>

                <div id="calendar">
                    {days.map((d, index) => (
                        <Day
                            key={index}
                            day={d}
                            onClick={() => {
                                if (d.value !== 'padding') {
                                    setClicked(d.date);
                                }
                            }}
                        />
                    ))}
                </div>
            </div>

            {
                clicked && !events.find(e => e.date === clicked) &&
                <NewEventModal
                    onClose={() => setClicked(null)}
                    onSave={title => {
                        console.log("New Event:", { title, date: clicked });
                        setClicked(null);
                    }}
                />
            }

            {
                clicked && events.find(e => e.date === clicked) &&
                <DeleteEventModal
                    eventText={events.find(e => e.date === clicked).title}
                    onClose={() => setClicked(null)}
                    onDelete={() => {
                        console.log("Deleting event:", clicked);
                        setClicked(null);
                    }}
                />
            }
        </>
    );
}

export default App;
