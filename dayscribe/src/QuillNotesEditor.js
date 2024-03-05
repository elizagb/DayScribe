import React, { useState } from 'react';
import QuillEditor from "react-quill";
import Delta from 'quill-delta';
import Quill from 'quill';
import 'react-quill/dist/quill.snow.css';
import {getSpecificNote, getValidDates} from './noteRetrieval.js'
import {noteWriteRequest} from './noteMaintenance.js'
import styles from "./App.css";


//get current date key
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1;
const day = currentDate.getDate();

//format 'yyyymmdd'
const currentDateStr = `${year}${month.toString().padStart(2, '0')}${day.toString().padStart(2, '0')}`;

function Arrow(dateKey, quill, dateShift){

}

 // value = {value}

export const QuillNotesEditor = () => {
  const [value, setValue] = useState('');

  //const quill = new Quill('#editor', { theme: 'snow' });
  return (
    <div className = {styles.wrapper}>
      <div id='navigation'><center>Hello! Welcome to DayScribe </center></div>
      <button> Previous Day</button>
      <button> Next Day</button>
      
      <QuillEditor 
        theme="snow" 
        value= {value}
        onChange = {(value)=> setValue(value)} 
      />
      
      <button onClick={ () => noteWriteRequest(currentDateStr, value)}> Update Note</button>
      <button onClick={ () => getSpecificNote(currentDateStr)}> Retrieve Note</button>

  </div>
  );
}

export default QuillNotesEditor;  
