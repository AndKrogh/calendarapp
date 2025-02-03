import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CalendarHeader } from '../CalendarHeader/CalendarHeader';
import { Day } from  '../Day/Day';
import { NewEventModal } from '../NewEventModal/NewEventmodal'; 
import { DeleteEventModal } from '../DeleteEventModal/DeleteEventModal';
import { useDate } from '../hooks/useDate';

const Route = () => {
    return (
        <div>
            <h1>Welcome to the Calendar App</h1>
            <Link to="/events">View Events</Link>
        </div>
    );
};

function App() {
  const [nav, setNav] = useState(0);
  const [clicked, setClicked] = useState();
  const [events, setEvents] = useState(
    localStorage.getItem('events') ? 
      JSON.parse(localStorage.getItem('events')) : 
      []
  );

  const eventForDate = date => events.find(e => e.date === date );

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const { days, dateDisplay } = useDate(events, nav);


  return (
    <>
      <div id="container">
        <CalendarHeader
          dateDisplay={dateDisplay}
          onNext ={()=> setNav(nav + 1)}
          onBack ={()=> setNav(nav - 1)}
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
        clicked && !eventForDate(clicked) &&
        <NewEventModal
          onClose={() => setClicked(null)}
          onSave={title => {
            setEvents([ ...events, { title, date: clicked }]);
            setClicked(null);
          }}
        />
      }

      {
        clicked && eventForDate(clicked) &&
        <DeleteEventModal 
          eventText={eventForDate(clicked).title}
          onClose={() => setClicked(null)}
          onDelete={() => {
            setEvents(events.filter(e => e.date !== clicked));
            setClicked(null);
          }}
        />
      }
    </>
  )
}

export default App;
