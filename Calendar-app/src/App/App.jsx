import React,{ useState, useEffect } from 'react';
import { CalendarHeader } from '../CalendarHeader/CalendarHeader';
import { Day } from  '../Day/Day';

function App() {
  const [nav, setNav] = useState(0);
  const [days, setDays] = useState([]);
  const [dateDisplay, setDateDisplay] = useState('');
  const [clicked, setClicked] = useState();
  
  const [events, setEvents] = useState(localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : []);

  const eventForDate = date => events.find(e => e.date === date );

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  useEffect(()=> {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dt = new date();

    if (nav !== 0) {
      dt.setMonth(new Date().getMonth() + nav)
    }

    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();

    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
      weekday: 'long',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });

    setDateDisplay(`${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`);
    const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

  }, [events, nav]);

  return (
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
                if(day.value !== 'padding') {
                  setClicked(day.date);
                }
              }}
            />
          })}
        </div>
      </div>
  )
}

export default App;
