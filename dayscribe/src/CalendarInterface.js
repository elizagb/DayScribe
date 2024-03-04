/* CS 422 Winter 2024
CalendarInterface.js
Created by Eliza Black 2/25/2024
Last modified: 2/26/2024
*/

import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalendarInterface.css';

function App() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [highlightedDates, setHighlightedDates] = useState([1707984000000]); // Example timestamp

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const tileClassName = ({ date }) => {
    // Check if the date is in the list of highlighted dates
    if (highlightedDates.some(timestamp => timestamp === date.getTime())) {
      return 'highlighted'; // Apply the 'highlighted' class
    }
    return null; // Default class
  };

  return (
    <div className="Sample">
      <header>
        <h1>react-calendar sample page</h1>
      </header>
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
  );
}

export default App;
