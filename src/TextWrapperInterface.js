
import React, {useState, useRef} from 'react';
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

function dateTokensToString(dateTokens){
  // takes a list of ints [MM, DD, YYYY], converting it to "MM/DD/YYYY"
  
  return `${dateTokens[0].toString().padStart(2, '0')}/${dateTokens[1].toString().padStart(2, '0')}/${dateTokens[2]}`;
}

function tokenizeDate(date){
  // takes a string "MM/DD/YYYY", converting it to list of ints: [MM, DD, YYYY]
  const [month, day, year] = date.split('/');
  const retList = [parseInt(month, 10), parseInt(day, 10), parseInt(year, 10)]; 
  return retList;
}


// function Arrow({shiftDirection, currentDate, updateDate, quill}) {
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
        let [returnDate, returnDelta] =  await(getSpecificNote(currentDate, shiftDirection));
        console.log("handleClick:", returnDate, returnDelta);
        updateDate(returnDate);  // update state for date

        // TODO: update Quill Editor
        if (returnDelta !== undefined) {
          // quill.current.getEditor().setContents(returnDelta);
          //quill.current.setContents(returnDelta);
          const testDelta = new Delta().insert('testDelta in Arrow');
          quill.current.getEditor().setContents(testDelta);
        

        }
        else{
          console.log("No existing Delta for this day.");
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


function TextWrapperInterface() {
  
  // currentDate is the currently focused date ==> starts as today's date, 
  // but will be changed to reflect the note of the "current date" 
  const [currentDate, setCurrentDate] = useState(currentDateStr);

  const updateCurrentDate = (newDate) => {
    setCurrentDate(newDate);
  }

  // const quillEditor =<QuillNotesEditor/>;
  const quillRef = useRef(null);

  return (
    <div>
      <div><center><h1>Hello! Welcome to DayScribe </h1></center></div>
      
      <div className = "navigationBar">
        <Arrow shiftDirection={-1} currentDate = {currentDate} 
          updateDate = {updateCurrentDate} quill={quillRef}/>
        <h2 className = "noteID"> Note for: {currentDate}</h2>
        <Arrow shiftDirection={1} currentDate = {currentDate} 
          updateDate = {updateCurrentDate} quill= {quillRef}/>
      </div>
      
      <QuillNotesEditor ref={quillRef} /> 

      <button onClick={ () => noteWriteRequest('03022024', null)}> Update Note</button>
      <CalendarInterface showCalendar={true} />
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