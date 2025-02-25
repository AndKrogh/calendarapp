import React, { useState } from 'react';
import { CalendarHeader } from '../CalendarHeader/CalendarHeader';
import { Day } from '../Day/Day';
import { NewEventModal } from '../NewEventModal/NewEventModal';
import { DeleteEventModal } from '../DeleteEventModal/DeleteEventModal';
import { useDate } from '../hooks/useDate';
import { useFirestore } from '../hooks/UseFirebase'; 

interface Event {
    id: string;
    date: string;
    name: string;
}

interface DayType {
    date: string;
    value: string;
}

function App() {
    const [nav, setNav] = useState<number>(0);
    const [clicked, setClicked] = useState<string | null>(null);

  
    const { events, loading, addEvent, deleteEvent } = useFirestore();

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
                    {days.map((d:DayType, index:number) => (
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
                clicked && !events.find((e:Event) => e.date === clicked) &&
                <NewEventModal
                    selectedDate={clicked}
                    onClose={() => setClicked(null)}
                    onSave={(event:Event) => {
                        addEvent(event);
                        setClicked(null);
                    }}
                />
            }

            {
                clicked && events.find((e) => e.date === clicked) &&
                <DeleteEventModal
                    eventId={events.find(e => e.date === clicked)?.id}
                    eventText={events.find(e => e.date === clicked)?.name}
                    onClose={() => setClicked(null)}
                    onDelete={(eventId: string) => {
                        deleteEvent(eventId);
                        setClicked(null);
                    }}
                />
            }
        </>
    );
}

export default App;
