/* CS 422 Winter 2024
CalendarInterface.js
Created by Eliza Black 2/25/2024
Last modified: 3/4/2024
*/
import './CalendarInterface.css';
import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {getSpecificNote, getValidDates} from './noteRetrieval.js'

// EXAMPLE: import necessary functions to be run when a date is selected 
// updateTextEditor: func that causes new note to appear
// sendStoredNotes: function that returns list of dates to highlight green (days w stored notes)
// import { updateTextEditor, sendStoredDates } from './update.js'; 

const CalendarInterface = ({quill, updateDate}) => {
  const [selectedDate, setSelectedDate] = useState(null);
  // TODO: uncomment this when date array is imported, not hardcoded
  const [highlightDates, setHighlightDates] = useState([]);
  
  // Hard-coded date values

  // TODO: uncomment this when date array is imported, not hardcoded
  // useEffect(() => {
  //   if (populatedDates !== null){
  //     setHighlightDates(populatedDates);
  //   }
  //   else {
  //     console.log('populatedDates is empty');
  //   }
  // }, []);

  async function handleNavigation(actionContext){
    // actionContext returns an Object (dict), including label to which navigation event triggered this handler
    // and a Date object of first date of that month (and year)


    console.log("onClick action: ", actionContext);
    // console.log("newcurrent date" , actionContext["activeStartDate"]);
    // if (action === "prev" || action ==="next"){
      
    //}
    try {
      let returnedDates = await getValidDates(actionContext["activeStartDate"]);
      console.log("setting highlight dates for: ", returnedDates);
      setHighlightDates(returnedDates);
    }
    catch (error){
      console.log("handleNavigation error");
    }
  }

  async function handleDateClick(selectedDate){
    setSelectedDate(selectedDate);
    console.log(selectedDate);
    let [returnDate, returnDelta] = await(getSpecificNote(selectedDate, 0));
    quill.current.getEditor().setContents(returnDelta);
    updateDate(returnDate);
    
  };


  const tileClassName = ({ date }) => {
    return highlightDates.some((highlightDate) => {
      return date.getDate() === highlightDate.getDate() &&
             date.getMonth() === highlightDate.getMonth() &&
             date.getFullYear() === highlightDate.getFullYear();
    }) ? 'highlight' : null;
  };


  return (
      <div className="Sample">
        <div className="Sample__container">
          <main className="Sample__container__content">
            <Calendar
              onClickDay={handleDateClick}
              onActiveStartDateChange={handleNavigation}
              value={selectedDate}
              tileClassName={tileClassName}
            />
          </main>
        </div>
      </div>
  );
}

export default CalendarInterface;
