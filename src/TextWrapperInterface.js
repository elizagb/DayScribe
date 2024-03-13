/* CS 422 Winter 2024
 * TextWrapperInterface.js 
 * Created by Meagan Beckstrand on 2/23/2024
 * Last modified 3/12/2024
 * 
 * The Text Wrapper Interface module serves as a wrapper, or container, for the Quill Notes Editor, 
 * providing a user-friendly interface for interacting with daily notes. It manages the display of 
 * the current date and navigation arrows for switching between dates, acting as the "parent" component
 *  that encapsulates the Quill Notes Editor.
 * 
 * This module executes the following: 
 *      - Date Navigation: Allows the user to switch between dates to view notes from different days.
 *      - Quill Notes Editor Integration: Integrates the Quill Notes Editor component to enable users to write and format their daily notes.
 *      - Calendar Interface Integration: Integrates Calendar Interface component through calendar icon to enable calendar-based note navigation. 
 *      - Note Retrieval Requests: Sends requests to the Note Retrieval Handler to retrieve notes for specific dates.
 *
 * This module includes the following React Components to execute the functionality listed above: 
 *    Arrow: Creates a clickable Arrow button in a specified direction that, when triggered, fetches the note for the next date.
 *    CalendarButton: Creates a clickable Calendar button that triggers the Calendar Interface object to render or disappear.
 *    TextWrapperInterface: Initializes all shared state, sets an auto-save timer, and renders all other components in a specified order.
 */

import React, {useState, useRef, useEffect} from 'react';
import QuillNotesEditor from './QuillNotesEditor.js';
import Quill from 'quill';
import Delta from 'quill-delta';
import './QuillNotesEditor.js';
import 'quill/dist/quill.snow.css';
import "./TextWrapperInterface.css";
import {getSpecificNote, getValidDates} from './noteRetrieval.js'
import {noteWriteRequest} from './noteMaintenance.js'
import CalendarInterface from './CalendarInterface.js';
import previousArrow from './images/previousArrow.png'
import nextArrow from './images/nextArrow.png'
import calendarImage from './images/calendar-small.png'
// import logoImage from './images/logo-large.png'
import logoImage from './images/sun-logo.png'


//get current date key
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1;
const day = currentDate.getDate();

//format 'mm/dd/yyyy'
const currentDateStr = `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`;


function Arrow({shiftDirection, currentDate, updateDate, quill}) {
  /* This function initializes either the left or right arrow and sets up a handleClick() event that triggers the fetch
  of the next note in the specified direction.

  Args:
    shiftDirection (int): An enumerated value determining the direction of button, -1 ==> left arrow, 1 ==> right arrow
    currentDate (str): A string in "MM/DD/YYYY" form that represents the current date. 
    updateDate (function): A function that updates the current date to whatever date the Arrow shifts to.
    quill (reference object): A reference to the Quill Notes Editor that can be used to update the Editor with the requested note.
  */

  let directionText = null;
  let directionImage = null;
  
  if (shiftDirection === -1){
    // left arrow
    directionText = "Arrow to Prev Note";
    directionImage = previousArrow;  
  }
  else {
    // right arrow
    directionText = "Arrow to Next Note";
    directionImage = nextArrow; 
  }

  async function handleClick() {
    // Save the current note if non-empty, then fetch next note
    // from the requested day and sets the quill editor's note 
    try {
      
      // call note maintenance handler to write note
      noteWriteRequest(currentDate, quill);
      
      let [returnDate, returnDelta] =  await(getSpecificNote(currentDate, shiftDirection));
      console.log("handleClick:", returnDate, returnDelta);
      updateDate(returnDate);  // update state for date

      if (returnDelta !== undefined) {  
        // update the quill editor if there's a populated note
        quill.current.getEditor().setContents(returnDelta);
      }

      else{
        // otherwise, update quill editor with a new Delta object 
        quill.current.getEditor().setContents( new Delta());
      }
      return;
    
    }
    catch (error){
        console.log(`Handle click error: didn't pass the try block`);
    }
    
  }

  return (
  <button onClick={handleClick} className = "directionalArrow">
    <img src={directionImage} alt={directionText}/>
  </button>  
  )
}

function CalendarButton({currentDate, quill, updateDate}){
  /* This function initializes the Calendar button and sets up a handleClick() event that triggers the rendering
  of the Calendar Interface object

  Args:
    currentDate (str): A string in "MM/DD/YYYY" form that represents the current date. 
    quill (reference object): A reference to the Quill Notes Editor that can be used to update the Editor with the requested note.
    updateDate (function): A function that updates the current date to whatever date the Arrow shifts to.
  */

  // state of toggle for calendar to pop up (rendered component but hidden)
  const [calendarShow, setCalendarShow] = useState(false);
  
  let returnDates = null;
  
  async function handleClick() {    
    // on-click, render/hide calendar

    try {
      // flip the calendarShow boolean, which changes from showing to hiding the Calendar Interface 
      setCalendarShow(!calendarShow);
      console.log("Calendar Clicked");
    }

    catch (error){
      console.log("calendar button error");
    }
  }

  return (
    <div>
      <button onClick={handleClick} className = "calendarButton">
        <img src={calendarImage} alt= "calendar"/>
      </button>
      <div>
      {calendarShow && 
      <CalendarInterface currentDate = {currentDate} quill= {quill} updateDate = {updateDate} 
      handleClose ={handleClick}/>
}

      </div>
    </div>
  )
}


function TextWrapperInterface() {
  /* This function initializes all shared state, sets an auto-save timer, and renders all other components in a specified order.
  */  

  // Set state for the currentDate: currentDate is the currently focused date which starts as today's date.
  // the setCurrentDate function will handle updates to reflect the new "current date" 
  const [currentDate, setCurrentDate] = useState(currentDateStr);

  const updateCurrentDate = (newDate) => {
    setCurrentDate(newDate);
  }

  // toggle for calendar to pop up (rendered component but hidden)
  const [calendarShow, setCalendarShow] = useState(false);

  // initialize the reference object for the Quill Notes Editor
  const quillRef = useRef(null);

  // initialize the autosaveTimer object (ensures that multiple timers are not set, as this timer is destroyed upon re-render)
  let autosaveTimer = null;

  // Save on time interval functionality ------------------------------------------
  // The following section holds the functionality that allows edits to notes to be saved
  // every {interval} milliseconds, currently set to 1 second. This allows the user to close the extension and have their changes 
  // saved automatically. 

  function startSaveTimer(interval) {
    /* Given an interval, it uses setInterval() to trigger the noteWriteRequest() function every {interavl} milliseconds
     * Args: 
          interval (int): represents the time in milliseconds that the noteWriteRequest() should wait before automatically saving
    */
    if (autosaveTimer !== null){
      console.log("TIMER ALREADY EXISTS: DON'T SET ANOTHER");
      return;
    }

    autosaveTimer = setInterval(async () => {
      console.log("\n\nsave timer triggered");
      // Calls noteWriteRequest to store upedates made to the current note
      noteWriteRequest(currentDate, quillRef);
    }, interval);
  }

  // useEffect() is a React hook that allows the Text Wrapper Interface to clear old timers 
  // and start a new autosave timer whenever currentDate is changed
  useEffect(() => {

    startSaveTimer(1000);
  
    return () => {
      if (autosaveTimer !== null) {
        console.log("save timer reset");
        clearInterval(autosaveTimer);
        autosaveTimer = null;
      }
    };
    // whenever the currentDate gets updated useEffect() triggers, restarting the timer
  }, [currentDate]);

  // ------------------------------------------
  

  return (
    <div>
      <CalendarButton currentDate={currentDate} quill={quillRef} updateDate={updateCurrentDate} handleClose={() => setCalendarShow(false)}
/>
      {/* <div><h1>Welcome to  <img src={logoImage} alt = "logo"/></h1></div> */}
      <div class="title"><h1><img src={logoImage} alt = "logo"/></h1></div>
      
      {/* Naviagtion bar above Quill Notes Editor. Includes navigation arrows and the current date. */}
      <div className = "navigationBar">
        <Arrow shiftDirection={-1} currentDate = {currentDate} updateDate = {updateCurrentDate} quill={quillRef}/>
        <h2 className = "noteID"> Note For: {currentDate}</h2>
        <Arrow shiftDirection={1} currentDate = {currentDate} updateDate = {updateCurrentDate} quill= {quillRef}/>
      </div>
      
      <QuillNotesEditor ref={quillRef} currentDate = {currentDate} quill = {quillRef}/> 
    </div>
  )
}


export default TextWrapperInterface;
