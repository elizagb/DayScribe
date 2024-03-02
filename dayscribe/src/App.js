
import React, { useState } from 'react';
import QuillNotesEditor from './QuillNotesEditor';
import Quill from 'quill';
import './QuillNotesEditor';
import 'react-quill/dist/quill.snow.css';
import styles from "./App.css";
import { writeNote,fetchNoteLocal, removeNote } from './communicators.js';

//get current date key
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.getMonth()+1;
const day = currentDate.getDate();

//format 'yyyymmdd'
const currentDateStr = `${year}${month.toString().padStart(2, '0')}${day.toString().padStart(2, '0')}`;

const Editor = () => {
  // Editor state for react
  const [value, setValue] = useState("");
  //state to store delta object (quill)
  const [delta, setDelta] = useState(null);

  //const quill = new Quill('#editor', { theme: 'snow' });
  const handleChange = (value, delta, source, editor) => {
    // 'delta' contains the changes made in the editor
    console.log('Delta:', delta)
    setDelta(delta); //update delta state
    //Update the editor state
    setValue(value);
    
  };

  dateKey = currentDateStr; //idk about formatting yet

  //load initial delta object. Create new note for today, or load today's
  if (fetchNoteLocal(dateKey) === null){
    var deltaNote = new delta();
    handleChange(value, deltaNote); //update
    writeNote(dateKey, deltaNote);
    
  }
  else{
    var deltaNote = fetchNoteLocal(dateKey);
    handleChange(value, deltaNote);
  }
  Quill.updateContents(nextDelta);

  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>Editor Content</label>
      <h1><center>Welcome to Dayscribe</center></h1>

      <h1><center>Note for: {dateKey}</center></h1>

        <Arrow onClick={Arrow(dateKey, currentDate, 1)}/>
        <Arrow onClick={Arrow(dateKey, currentDate, -1)}/>
        <DeleteButton onClick={DeleteButton(dateKey, currentDate)}/>
        <button onClick={Sample}>Calendar Icon</button>
        <QuillNotesEditor/>
    </div>
  );
};

//Figure out how to relate currentDate and dateKey

function Arrow(dateKey = todaysDate, currentDate, dateShift){

  function handleClick() {
    //put current note in delta object
    var delta = Quill.GetContents();
    if (delta.ops.length > 0)
    {    //write to storage
      writeNote(dateKey, delta);
    }
    //get previous or next day
    var newDateKey = getDateKey(currentDate, dateShift)
    var newDelta = fetchNoteLocal(newDateKey);
    //if null, create a new delta object
    if (newDelta === null){
      newDelta = new delta();
    }

    //replace contents with newDelta
    Quill.updateContents(newDelta);
    handleChange(value, newDelta);
    dateKey = newDateKey;
    }
  return (
    <button onClick={handleClick}>button</button>
  )

}

function DeleteButton(dateKey = todaysDate, currentDate){
  //Delete button. upon click, removes note.

  function handleClick(){
    //get delta for previous day
    var newDateKey = getDateKey(currentDate, -1);
    newDelta = fetchNoteLocal(prevDateKey);

    removeNote(dateKey);
    Quill.updateContents(newDelta);
    handleChange(value, newDelta);
    dateKey = prevDateKey;
  }
  return (
    <button onClick={handleClick}>Delete</button>
  )
}

function getDateKey(currentDate, dateShift){
  //dateShift = 1 or -1
  const newDate = new Date(currentDate);
  newDate.setDate(currentDate.getDate() + dateShift);
  const newDateStr = `${year}${month.toString().padStart(2, '0')}${day.toString().padStart(2, '0')}`;
  var dateKey = newDateStr;
  return dateKey
}

export default Editor;
