import React, { useState } from 'react';
import QuillEditor from "react-quill";
import Quill from 'quill';
import 'react-quill/dist/quill.snow.css';
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



export const QuillNotesEditor = () => {
  const [value, setValue] = useState('');

  //const quill = new Quill('#editor', { theme: 'snow' });
  return (
  <div>
    <QuillEditor 
      theme="snow" 
      value={value}
      onChange = {(value)=> setValue(value)}
    />
  </div>
  );
}

export default QuillNotesEditor;  
