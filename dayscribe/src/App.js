
import React, { useState } from 'react';
import QuillNotesEditor from './QuillNotesEditor';
import Quill from 'quill';
import './QuillNotesEditor';
import 'react-quill/dist/quill.snow.css';
import styles from "./App.css";
import { writeNote,fetchNote, removeNote } from './communicators.js';

//get current date key
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.getMonth()+1;
const day = currentDate.getDate();

//format jan 19 2024
const currentDateStr = `${year}${month.toString().padStart(2, '0')}${day.toString().padStart(2, '0')}`;

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
    
  };//fix */


  const dateKey = ""; //idk about formatting yet
  //load initial delta object. Create new note for today, or load today's
  if (fetchNote(dateKey) === null){
    writeNote(dateKey, null);
    var deltaNote = fetchNote(dateKey);
  }
  else
    var deltaNote = fetchNote(dateKey);
        
  function Sample(){}

  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>Editor Content</label>
      <h1><center>Welcome to Dayscribe</center></h1>

      <h1><center>Note for: {dateKey}</center></h1>


        <Arrow onClick={Arrow(dateKey, currentDate, quill, 1)}/>
        <Arrow onClick={Arrow(dateKey, currentDate, quill, -1)}/>
        <DeleteButton onClick={DeleteButton(dateKey, quill)}/>
        <button onClick={Sample}>Calendar Icon</button>
        <QuillNotesEditor/>
    </div>
  );
};

//Figure out how to relate currentDate and dateKey
// function Arrow(dateKey = todaysDate, currentDate, quill, dateShift){
function Arrow(dateKey, currentDate, quill, dateShift){

  function handleClick() {
    var delta = quill.GetContents();
    writeNote(dateKey, delta);
    const nextDay = new Date(currentDate);
    nextDay.setDate(currentDate.getDate() + dateShift);


    // var newDelta = fetchNoteLocal(newDateKey);
    var newDelta = fetchNote(nextDay);
    quill.updateContents(newDelta);
    }
  return (
    <button onClick={handleClick}>button</button>
  )

}

// function DeleteButton(dateKey = todaysDate, quill){
function DeleteButton(dateKey, quill){
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


export default Editor;
