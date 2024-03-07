/* CS 422 Winter 2024
CalendarInterface.js
Created by Eliza Black 2/25/2024
Last modified: 3/4/2024
*/
import './CalendarInterface.css';
import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

// EXAMPLE: import necessary functions to be run when a date is selected 
// updateTextEditor: func that causes new note to appear
// sendStoredNotes: function that returns list of dates to highlight green (days w stored notes)
// import { updateTextEditor, sendStoredDates } from './update.js'; 

const CalendarInterface = ({ showCalendar, populatedDates }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  // TODO: uncomment this when date array is imported, not hardcoded
  const [highlightDates, setHighlightDates] = useState([]);
  
  // Hard-coded date values

  // TODO: uncomment this when date array is imported, not hardcoded
  // useEffect(() => {
  //   setHighlightDates(populatedDates);
  // }, []);

  const handleDateClick = (selectedDate) => {
    setSelectedDate(selectedDate);
    // console.log(selectedDate);

    // EXAMPLE: call function that updates text editor given new selected date 
    // updateTextEditor(selectedDate);
  };

  const tileClassName = ({ date }) => {
    return highlightDates.some((highlightDate) => {
      return date.getDate() === highlightDate.getDate() &&
             date.getMonth() === highlightDate.getMonth() &&
             date.getFullYear() === highlightDate.getFullYear();
    }) ? 'highlight' : null;
  };

  return (
    showCalendar && (
      <div className="Sample">
        <div className="Sample__container">
          <main className="Sample__container__content">
            <Calendar
              onClickDay={handleDateClick}
              value={selectedDate}
              tileClassName={tileClassName}
            />
          </main>
        </div>
      </div>
    )
  );
}

export default CalendarInterface;
