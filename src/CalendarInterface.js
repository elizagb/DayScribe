/* CS 422 Winter 2024
CalendarInterface.js
Created by Eliza Black 2/25/2024
Last modified: 3/4/2024
*/
import './CalendarInterface.css';
import { useState, useEffect, useMemo} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {getSpecificNote, getValidDates} from './noteRetrieval.js'
import {noteWriteRequest} from './noteMaintenance.js'


async function getInitialDates(startDate){
  
  try{
    // take "MM/DD/YYYY" to date
    let startDateObject= new Date(startDate.slice(6,), startDate.slice(0,2)-1, startDate.slice(3,5));
    let initialDates = await getValidDates(startDateObject);
    return initialDates;
  }
  catch (error){
    console.log("getInitialDates error");
  }
}


const CalendarInterface = ({currentDate, quill, updateDate, handleClose}) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [highlightDates, setHighlightDates] = useState([]);
  
  // figure out which dates of the month are populated on first render
  useEffect(() => {
    const firstRenderDates = async () => {
      try {
        let initialDates = await getInitialDates(currentDate);
        setHighlightDates(initialDates); 
      }
      catch (error) {
        console.log("getting Initial dates failed");
      }
    } 
    firstRenderDates();
  }, [currentDate]); 


  async function handleNavigationArrows(actionContext){
    // actionContext returns an Object (dict), including label to which navigation event triggered this handler
    // and a Date object of first date of that month (and year)
    console.log("onClick action: ", actionContext);
    
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
    
    // call note maintenance handler to wy1rite note
    noteWriteRequest(currentDate, quill);

    let currentText = await quill.current.getEditor().getText();
    
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
      <div className="popup">
        <div className="popup-content">
          <button className="btn-close" onClick={handleClose}> x </button>
          <main className="Sample__container__content">
            <Calendar
              onClickDay={handleDateClick}
              onActiveStartDateChange={handleNavigationArrows}
              value={selectedDate}
              tileClassName={tileClassName}
            />
          </main>
        </div>
      </div>
  );
}

export default CalendarInterface;
