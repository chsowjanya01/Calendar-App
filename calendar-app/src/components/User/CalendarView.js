import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalendarView.css';

const formatDate = (date) => {
  const tzOffset = date.getTimezoneOffset() * 60000;
  return new Date(date - tzOffset).toISOString().split('T')[0];
};

const CalendarView = () => {
  const [date, setDate] = useState(new Date());
  const [communications, setCommunications] = useState({});
  const [selectedDayCommunications, setSelectedDayCommunications] = useState([]);

  useEffect(() => {
    const storedCommunications = localStorage.getItem('communications');
    if (storedCommunications) {
      setCommunications(JSON.parse(storedCommunications));
    }
  }, []);

  useEffect(() => {
    console.log('Updated Date State:', date.toDateString());
  }, [date]);

  return (
    <div className="calendar-view">
      <h2>Calendar View</h2>
      <Calendar
        onChange={(newDate) => {
          const selectedDate = formatDate(newDate);
          console.log('Calendar Clicked Date:', newDate);
          console.log('Formatted Selected Date:', selectedDate);

          const filteredCommunications = [];
          Object.entries(communications).forEach(([company, comms]) => {
            comms.forEach((comm) => {
              const commDate = comm.date.includes('T') ? comm.date.split('T')[0] : comm.date;
              if (commDate === selectedDate) {
                console.log('Match found:', comm);
                filteredCommunications.push({ ...comm, company });
              }
            });
          });

          console.log('Filtered Communications:', filteredCommunications);
          setSelectedDayCommunications(filteredCommunications);
          setDate(newDate);
        }}
        value={date}
      />

      <h3>Selected Date: {date.toDateString()}</h3>
      {selectedDayCommunications.length > 0 ? (
        <div>
          <h4>Communications:</h4>
          <ul>
            {selectedDayCommunications.map((comm, index) => (
              <li key={index}>
                <strong>{comm.company}:</strong> {comm.type} ({comm.notes})
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No communications found for this date.</p>
      )}
    </div>
  );
};

export default CalendarView;