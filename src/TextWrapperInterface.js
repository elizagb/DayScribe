
import React, {useState} from 'react';
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

// The TextWrapperInterface.js file exists to render the QuillNotesEditor object, as defined in QuillNotesEditor.js
 
//get current date key
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1;
const day = currentDate.getDate();

//format 'mm/dd/yyyy'
const currentDateStr = `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`;



const Arrow = ({shiftDirection}) => {
  // shiftDirection an enumerated value determining direction of button
  // 0 ==> left arrow, 1 ==> right arrow

  let directionText = null;
  let directionImage = null;
  
  if (shiftDirection === 0){
    // left arrow
    directionText = "Arrow to Prev Note";
    directionImage = previousArrow;  
  }
  else {
    // right arrow
    directionText = "Arrow to Next Note";
    directionImage = nextArrow; 
  }

  function handleClick() {
    // needs to find the requested day, 
    // and set the quill editor's note 

    let returnDelta =  getSpecificNote();
  }

  return (
  <button onClick={handleClick} className = "directionalArrow">
    <img src={directionImage} alt={directionText}/>
  </button>  
  )
}


function TextWrapperInterface() {
  
  // currentDate is the currently focused date ==> starts as today's date, 
  // but will be changed to reflect the note of the "current date" 
  const [currentDate, setCurrentDate] = useState(currentDateStr);

  const updateCurrentDate = (newDate) => {
    setCurrentDate(newDate);
  }

  return (
    <div>
      <div><center><h1>Hello! Welcome to DayScribe </h1></center></div>
      
      <div className = "navigationBar">
        <Arrow shiftDirection={0} 
          currentDate = {currentDate} updateDate = {updateCurrentDate}/>
        <h2 className = "noteID"> Note for: {currentDate}</h2>
        <Arrow shiftDirection={1} 
          currentDate = {currentDate} updateDate = {updateCurrentDate}/>
      </div>
      
      <QuillNotesEditor/>

      <button onClick={ () => noteWriteRequest('03022024', null)}> Update Note</button>
      <CalendarInterface showCalendar={true} />
    </div>
  )
}

export default TextWrapperInterface;