
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
import previousArrow from './images/previousArrow.png'
import nextArrow from './images/nextArrow.png'

// The TextWrapperInterface.js file exists to render the QuillNotesEditor object, as defined in QuillNotesEditor.js
// 

const Arrow = ({shiftDirection}) => {
  // shiftDirection an enumerated value determining direction of button
  // 0 ==> left arrow, 1 ==> right arrow

  let directionText = null;
  let directionImage = null;
  
  if (shiftDirection === 0){
    // left arrow
    directionText = "previousArrow";
    directionImage = previousArrow;
  }
  else {
    // right arrow
    directionText = "nextArrow";
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

var datekey = null;

function TextWrapperInterface() {

  return (
    <div>
      <div><center><h1>Hello! Welcome to DayScribe </h1></center></div>
      
      <div className = "navigationBar">
        <Arrow shiftDirection={0} />
        <h2 className = "noteID"> Note for: {datekey}</h2>
        <Arrow shiftDirection={1} />
      </div>
      
      <QuillNotesEditor/>
      <button onClick={ () => noteWriteRequest('03022024', null)}> Update Note</button>
      <CalendarInterface showCalendar={true} />
    </div>
  )
}

export default TextWrapperInterface;