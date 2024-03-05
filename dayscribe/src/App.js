
import React, { useState } from 'react';
import QuillNotesEditor from './QuillNotesEditor';
import Quill from 'quill';
import Delta from 'quill-delta';
import './QuillNotesEditor';
import 'quill/dist/quill.snow.css';
import styles from "./App.css";
import { writeNote,fetchNote, removeNote } from './communicators.js';
import Sample from './CalendarInterface.js';

//get current date key
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1;
const day = currentDate.getDate();

//format 'yyyymmdd'
const currentDateStr = `${year}${month.toString().padStart(2, '0')}${day.toString().padStart(2, '0')}`;

function App() {

  return (
    <div>
      <QuillNotesEditor/>
    </div>
  )
}

export default App;