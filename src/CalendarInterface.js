/* CS 422 Winter 2024
CalendarInterface.js
Created by Eliza Black 2/25/2024
Last modified: 3/10/2024

CREDIT:
Base react-calendar styling: https://github.com/wojtekmaj/react-calendar/tree/main/sample

Implements the Calendar that a user can navigate to view dates populated with stored notes 
and view populated notes by clicking on date tiles. The calendar implementation builds off of 
the imported Calendar component from the react-calendar library. 


Found in this file: 

Function getInitialDates(startDate): 
      - Fetches initial dates to be highlighted on the calendar 
useEffect hook firstRenderDates():
      - Fetches initial dates, using getInitialDates(), when currentDate changes. Sets highlightDates as this fetched array. 
Function handleNavigationArrows(actionContext)
      - Handles arrow click navigation events (swtichign months) and updates highlighted dates accordingly.
Function handleDateClick(selectedDate):
      - Functionality for when a date tile is clicked. Fetches stored note for the clicked date and updates current date accordingly. 
Function tileClassName({ date }):
      - Assigns styling class to calendar tiles based found in highlightDates array (highlighting dates with stored notes). 


*/
import './CalendarInterface.css';
import { useState, useEffect, useMemo} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {getSpecificNote, getValidDates} from './noteRetrieval.js'
import {noteWriteRequest} from './noteMaintenance.js'


// Fetch the dates for a specific month based on the input startDate; 
// fetches dates with stored notes for the month currently being rendered
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
  
  // Figure out which dates of the month are populated on render, whenever the currentDate value changes
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


  // Function that handles navigation arrows
  async function handleNavigationArrows(actionContext){
    // actionContext returns an Object (dict), including label to which navigation event triggered this handler
    // and a Date object of first date of that month (and year)
    console.log("onClick action: ", actionContext);
    
    try {
      let returnedDates = await getValidDates(actionContext["activeStartDate"]);
      console.log("setting highlight dates for: ", returnedDates);
      setHighlightDates(returnedDates);
    }
    // Log error msg if there's an error in getValidDates
    catch (error){
      console.log("handleNavigation error");
    }
  }

  // Function that runs when a date tile is clicked on the calendar. 
  // Fetches stored note for the clicked date and updates current date accordingly. 
  async function handleDateClick(selectedDate){

    // Close the calendar when a tile is clicked
    handleClose();
    
    // call note maintenance handler to wy1rite note
    noteWriteRequest(currentDate, quill);

    let currentText = await quill.current.getEditor().getText();
    
    // Set selectedDate to new date object for date associated with clicked Calendar tile: 
    setSelectedDate(selectedDate);
    console.log(selectedDate);
    // Fetch note for selectedDate:
    let [returnDate, returnDelta] = await(getSpecificNote(selectedDate, 0));
    // Make the stored note for selectedDate appear in the Quill text editor: 
    quill.current.getEditor().setContents(returnDelta); 
    // Set the new current date as the date associated with the selectedDate:
    updateDate(returnDate);
    
  };

  // Applies the 'highlight' style class to calendar tiles assigned to the date objects in highlightDates array.
  // Dates with stored notes are highlighted on the Calendar to indictate to the user that a note is stored.
  const tileClassName = ({ date }) => {
    return highlightDates.some((highlightDate) => {
      // If match found/if returns true for a date, applies highlight class to the corresponding calendar tile.
      return date.getDate() === highlightDate.getDate() &&
             date.getMonth() === highlightDate.getMonth() &&
             date.getFullYear() === highlightDate.getFullYear();
    }) ? 'highlight' : null;
  };


  return (
      <div className="popup">
        <div className="popup-content">
    
          <button className="btn-close" onClick={handleClose}> x </button> 
          <main className="cal__container__content">
            <Calendar
            // Props being passed to the calendar: 
              onClickDay={handleDateClick}
              onActiveStartDateChange={handleNavigationArrows}
              value={selectedDate}
              tileClassName={tileClassName} // react-calendar prop that allows for custom styling of individual dates
            />
          </main>
        </div>
      </div>
  );
}

export default CalendarInterface;
