
import React, {useState, useRef, useEffect} from 'react';
import QuillNotesEditor from './QuillNotesEditor.js';
import Quill from 'quill';
import Delta from 'quill-delta';
import './QuillNotesEditor.js';
import 'quill/dist/quill.snow.css';
import "./TextWrapperInterface.css";
import { writeNote,fetchNote, removeNote } from './communicators.js';
import {getSpecificNote, getValidDates} from './noteRetrieval.js'
import {noteWriteRequest} from './noteMaintenance.js'
import CalendarInterface from './CalendarInterface.js';
import previousArrow from './images/previousArrow.png'
import nextArrow from './images/nextArrow.png'
import calendarImage from './images/calendar-small.png'

// The TextWrapperInterface.js file exists to render the QuillNotesEditor object, as defined in QuillNotesEditor.js
 
//get current date key
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1;
const day = currentDate.getDate();

//format 'mm/dd/yyyy'
const currentDateStr = `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`;


function Arrow({shiftDirection, currentDate, updateDate, quill}) {
  // shiftDirection an enumerated value determining direction of button
  // -1 ==> left arrow, 1 ==> right arrow
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
    // needs to find the requested day, 
    // and set the quill editor's note 

    try {
      
      // call note maintenance handler to write note (unnecessary with per-keystroke save)
      // noteWriteRequest(currentDate, quill);
      // update date BEFORE setting the editor 
      
      
      let [returnDate, returnDelta] =  await(getSpecificNote(currentDate, shiftDirection));
      // console.log("handleClick:", returnDate, returnDelta);

      updateDate(returnDate);  // update state for date
      if (returnDelta !== undefined) {  
        // update the quill editor if there's a populated note
        quill.current.getEditor().setContents(returnDelta);
      }

      else{
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

function CalendarButton({currentDate}){
  // on-click, request for populated dates of month, then render calendar
  // with populated date highlights
  // getValidDates --> getPopulatedDates()?

  // toggle for calendar to pop up (rendered component but hidden)
  const [calendarShow, setCalendarShow] = useState(false);
  let returnDates = null
  async function handleClick() {
    try {
      setCalendarShow(!calendarShow);

      console.log("Calendar Clicked");
      // returnDates = await getValidDates(currentDate);

      // set highlight dates here?
      // console.log(`returned Date objects: ${returnDates}`);

      // now update calendar --> toggle view and repopulate selected dates
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
      <CalendarInterface showCalendar = {true} />
      }

      </div>
    </div>
  )
}


function TextWrapperInterface() {
  
  // currentDate is the currently focused date ==> starts as today's date, 
  // but will be changed to reflect the note of the "current date" 
  const [currentDate, setCurrentDate] = useState(currentDateStr);

  const quillRef = useRef(null);
  
  const updateCurrentDate = (newDate) => {
    console.log("updatingCurrentDate");
    setCurrentDate(newDate);
  }

  // the 'unload' effect doesn't seem to exist for web extensions
  // useEffect(() => {
  //   const handleBeforeUnload = (event) => {
  //     event.preventDefault();
  //     saveBeforeClosing();
  //   };

  //   window.addEventListener('unload', saveBeforeClosing);
    
  //   return () => {
  //     window.removeEventListener('unload', handleBeforeUnload);
  //   }
  // },[]); 
 

  return (
    <div>
      <CalendarButton currentDate = {currentDate}/>
      <div><center><h1>Hello! Welcome to DayScribe </h1></center></div>
      
      <div className = "navigationBar">
        <Arrow shiftDirection={-1} currentDate = {currentDate} updateDate = {updateCurrentDate} quill={quillRef}/>
        <h2 className = "noteID"> Note for: {currentDate}</h2>
        <Arrow shiftDirection={1} currentDate = {currentDate} updateDate = {updateCurrentDate} quill= {quillRef}/>
      </div>
      
      <QuillNotesEditor ref={quillRef} currentDate = {currentDate} updateDate = {updateCurrentDate}/> 

      <button onClick={ () => noteWriteRequest(currentDate, quillRef.current.getEditor().getContents())}> Update Note</button>

    </div>
  )
}


{/* <div className = "navigationBar">
        <Arrow shiftDirection={-1} currentDate = {currentDate} 
          updateDate = {updateCurrentDate} quillRef={quillEditor}/>
        <h2 className = "noteID"> Note for: {currentDate}</h2>
        <Arrow shiftDirection={1} currentDate = {currentDate} 
          updateDate = {updateCurrentDate} quillRef= {quillEditor}/>
      </div>
      
      {quillEditor} */}

export default TextWrapperInterface;