
import React, { useState } from 'react';
import QuillNotesEditor from './QuillNotesEditor.js';
import Quill from 'quill';
import Delta from 'quill-delta';
import './QuillNotesEditor.js';
import 'quill/dist/quill.snow.css';
import "./TextWrapperInterface.css";
import { writeNote,fetchNote, removeNote } from './communicators.js';
import {getSpecificNote, getValidDates} from './noteRetrieval.js'
import Sample from './CalendarInterface.js';
import CalendarInterface from './CalendarInterface.js';

// The TextWrapperInterface.js file exists to render the QuillNotesEditor object, as defined in QuillNotesEditor.js

function TextWrapperInterface() {

  return (
    <div>
      <QuillNotesEditor/>
      <CalendarInterface showCalendar={true} />
    </div>
  )
}

export default TextWrapperInterface;