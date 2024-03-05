
import React, { useState } from 'react';
import QuillNotesEditor from './QuillNotesEditor';
import Quill from 'quill';
import Delta from 'quill-delta';
import './QuillNotesEditor';
import 'quill/dist/quill.snow.css';
import styles from "./App.css";
import { writeNote,fetchNote, removeNote } from './communicators.js';
import {getSpecificNote, getValidDates} from './noteRetrieval.js'
import Sample from './CalendarInterface.js';

// The App.js file exists to render the QuillNotesEditor object, as defined in QuillNotesEditor.js

function App() {

  return (
    <div>
      <QuillNotesEditor/>
    </div>
  )
}

export default App;