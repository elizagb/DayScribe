
import React, { useState } from 'react';
import QuillNotesEditor from './QuillNotesEditor.js';
import Quill from 'quill';
import Delta from 'quill-delta';
import './QuillNotesEditor.js';
import 'quill/dist/quill.snow.css';
import "./TextWrapperInterface.css";
import { writeNote,fetchNote, removeNote } from './communicators.js';
import {getSpecificNote, getValidDates} from './noteRetrieval.js'
import {noteWriteRequest} from './noteMaintenance.js'
import Sample from './CalendarInterface.js';
import CalendarInterface from './CalendarInterface.js';

// The TextWrapperInterface.js file exists to render the QuillNotesEditor object, as defined in QuillNotesEditor.js
// 

const Arrow = ({shiftDirection}) => {
  // shiftDirection an enumerated value determining direction of button
  // 0 ==> left arrow, 1 ==> right arrow
        // <Arrow date={null} quill={null} shiftDirection={0} />

  let directionText = null;
  function handleClick() {
    getSpecificNote("03032024");
  }

  if (shiftDirection === 0){
    directionText = "Previous Day"
    // left arrow
  }
  else {
    // right arrow
    directionText = "Next Day"
  }

  return <button onClick={handleClick}> {directionText}</button>
}

var datekey = null;

function TextWrapperInterface() {

  return (
    <div>
      <div><center>Hello! Welcome to DayScribe </center></div>
      
      <div className = "navigation">
        <Arrow shiftDirection={0} />
        <h1> Note for: {datekey}</h1>
        <Arrow shiftDirection={1} />
      </div>
      
      <QuillNotesEditor/>
      <button onClick={ () => noteWriteRequest('03022024', null)}> Update Note</button>
      <CalendarInterface showCalendar={true} />
    </div>
  )
}

export default TextWrapperInterface;