
import React, { useState } from 'react';
import QuillNotesEditor from './QuillNotesEditor';
import Quill from 'quill';
import './QuillNotesEditor';
import 'react-quill/dist/quill.snow.css';
import styles from "./App.css";
import { writeNote,fetchNoteLocal, removeNote } from './communicators.js';

  //get current date key
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() +1;
const day = today.getDate();

const todaysDate = `${year}${month.toString().padStart(2, '0')}${day.toString().padStart(2, '0')}`;

const Editor = () => {
  // Editor state
  const [value, setValue] = useState("");
  //state to store delta object
  const [delta, setDelta] = useState(null);

  const quill = new Quill('#editor', { theme: 'snow' });
/*  const handleChange = (content, delta, source, editor) => {
    // 'delta' contains the changes made in the editor
    console.log('Delta:', delta)
    setDelta(delta); //update delta state
    //Update the editor state
    setEditorState(content);
    
  }; //fix her*/
 
  //Initialize note
  var dateKey = todaysDate;

  //load initial delta object. Create new note for today, or load today's
  if (fetchNoteLocal(todaysDate) === null){
    writeNote(dateKey, null);
    var deltaNote = fetchNoteLocal(dateKey);
  }
  else
    var deltaNote = fetchNoteLocal(dateKey);

  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>Editor Content</label>
      <h1><center>Welcome to Dayscribe</center></h1>

      <h1><center>Note for: {dateKey}</center></h1>
        {/* <Arrow onClick={LeftArrow(dateKey, quill)}/> */}
        {/* <Arrow onClick={RightArrow(dateKey, quill)}/> */}
        <DeleteButton onClick={DeleteButton(dateKey, quill)}/>
        <Calendar/>
        <QuillNotesEditor/>
    </div>
  );
};


function LeftArrow(dateKey = todaysDate, quill){
  //Left arrow. Upon click, decrements data, stores delta obj, loads new.
  const [count, setCount] = useState(0);


  function handleClick() {
    var delta = quill.GetContents();
    writeNote(dateKey, delta);
    var newDateKey = dateKey - 1; //TODO: figure this out
    var newDelta = fetchNoteLocal(newDateKey);
    quill.updateContents(newDelta);
    }
  return (
    <button onClick={handleClick}>Left</button>
  )

}

function RightArrow(dateKey = todaysDate,quill){
  //Right arrow. Upon click, increments date, stores delta obj, loads new.
  const [count, setCount] = useState(0);

  function handleClick() {
    var delta = quill.GetContents();
    writeNote(dateKey, delta);
    var newDateKey = dateKey + 1;
    var newDelta = fetchNoteLocal(newDateKey);
    quill.updateContents(newDelta);
    }
  return (
    <button onClick={handleClick}>Right</button>
  )
}


function DeleteButton(dateKey = todaysDate, quill){
  //Delete button. upon click, removes note.
  const [count, setCount] = useState(0);

  function handleClick(){
    removeNote(dateKey);
    //quill.updateContents(newDelta);
  }
  return (
    <button onClick={handleClick}>Delete</button>
  )
}

function Calendar(){
//interact with the calendar component

}

export default Editor;
