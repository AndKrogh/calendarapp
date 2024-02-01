import { useState, useEffect } from 'react';
import { CalendarHeader } from '../CalendarHeader/CalendarHeader';
import { Day } from  '../CalendarHeader/CalendarHeader';

function App() {
  const [nav, setNav] = useState(0);
  const [clicked, setClicked] = useState();
  const [days, setDays] = useState([]);
  const [dateDisplay, setDateDisplay] = useState('');
  
  const [events, setEvents] = useState(localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : []);

  const eventForDate = date => events.find(e => e.date === date );

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  return (
    <>
      <div id="container">
        <CalendarHeader/>
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
          {days.map((d,index) => {
            <Day
              key = {index}
              day = {d}
              onClick = {() => {
                if(d.value !== 'padding') {
                  setClicked(d.date);
                }
              }}
            />
          })}
        </div>
      </div>
    </>
  )
}

export default App
