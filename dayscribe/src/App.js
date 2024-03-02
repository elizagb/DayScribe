
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

//format jan 19 2024. change this
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

  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>Editor Content</label>
      <h1><center>Welcome to Dayscribe</center></h1>

      <h1><center>Note for: {dateKey}</center></h1>

        <Arrow onClick={Arrow(dateKey, currentDate, quill, 1)}/>
        <Arrow onClick={Arrow(dateKey, currentDate, quill, -1)}/>
        <DeleteButton onClick={DeleteButton(dateKey, currentDate, quill)}/>
        <button onClick={Sample}>Calendar Icon</button>
        <QuillNotesEditor/>
    </div>
  );
};

//Figure out how to relate currentDate and dateKey

function Arrow(dateKey = todaysDate, currentDate, quill, dateShift){

  function handleClick() {
    //put current note in delta object
    var delta = quill.GetContents();
    if (delta.ops.length > 0)
    {    //write to storage
      writeNote(dateKey, delta);
    }
    //get next day (or previous day)
    const nextDay = new Date(currentDate);
    nextDay.setDate(currentDate.getDate() + dateShift);

    const nextDayStr = `${year}${month.toString().padStart(2, '0')}${day.toString().padStart(2, '0')}`;
    var nextDateKey = nextDayStr;
    var nextDelta = fetchNoteLocal(nextDateKey);

    //replace contents with newDelta
    quill.updateContents(nextDelta);
    handleChange(value, nextDelta);
    dateKey = nextDateKey;
    }
  return (
    <button onClick={handleClick}>button</button>
  )

}

function DeleteButton(dateKey = todaysDate, currentDate, quill){
  //Delete button. upon click, removes note.

  function handleClick(){
   // var delta = quill.GetContents();
    //get delta object for previous day
    const prevDay = new Date(currentDate);
    prevDay.setDate(currentDate.getDate() - 1);
    const prevDayStr = `${year}${month.toString().padStart(2, '0')}${day.toString().padStart(2, '0')}`;
    var prevDateKey = prevDayStr;
    newDelta = fetchNoteLocal(prevDateKey);

    removeNote(dateKey);
    quill.updateContents(newDelta);
    handleChange(value, newDelta);
    dateKey = prevDateKey;
  }
  return (
    <button onClick={handleClick}>Delete</button>
  )
}


export default Editor;
