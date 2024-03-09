import React, { useState, useRef, useEffect } from 'react';
import QuillEditor from "react-quill";
import Delta from 'quill-delta';
import Quill from 'quill';
import 'react-quill/dist/quill.snow.css';
import {getSpecificNote, getValidDates} from './noteRetrieval.js'
import {noteWriteRequest} from './noteMaintenance.js'
import styles from "./TextWrapperInterface.js";

// This is the code for the Quill module (forgot official name)
// creates the QuillNotesEditor object, which defines the system structure at a high level
// including navigation buttons, titles, and the quill editor itself
// source: https://medium.com/@andrewkizito54/creating-a-rich-text-editor-using-react-and-react-quill-3ea990435ade


//get current date key
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1;
const day = currentDate.getDate();

//format 'yyyymmdd'
const currentDateStr = `${year}${month.toString().padStart(2, '0')}${day.toString().padStart(2, '0')}`;


export const QuillNotesEditor = React.forwardRef((props, ref) => {
  const [value, setValue] = useState('');
  // const quillRef = useRef(null);  // get a reference to the quill editor we create
  // this "ref" object is accessed by quillRef.current attribute

  let {currentDate, updateDate} = props;
  
  // on render, fetch the current note
  useEffect(() => {
    const firstRender = async () => {
      let [retDate, initialDelta] = await getSpecificNote(currentDate, 0);
      ref.current.getEditor().setContents(initialDelta);
    }
    firstRender();
    console.log("Initializing the Quill Editor");
  }, []);


  return (
    <div className = {styles.wrapper}>
   
      <QuillEditor 
        ref={ref}
        theme="snow" 
        value= {value}
        onChange = {(value)=> setValue(value)} 
      />
      
  </div>
  );
});

// <button onClick={ () => {
//       console.log(quillRef)
//       quillRef.current.getEditor().setContents(new Delta().insert('tested Delta'))
//     }}> quillReference</button>

      // old code to reference just in case (delete once left and right arrows are completed)
      // <button onClick={ () => noteWriteRequest(currentDateStr, quillRef.current.getEditor().getContents())}> Update Note</button>
      // <button onClick={ () => getSpecificNote(currentDateStr)}> Retrieve Note</button>

// found in the npmjs react-quill documentation under methods:
// "If you have a ref to a ReactQuill node, you will be able to invoke the following methods
// (...) getEditor(): Returns the Quill instance that backs the editor (...)"
// quillRef.current.getEditor().getContents() --> access the quill editor by referece.current
// getEditor() returns the quill instance associated to the reference, and getContents() returns a delta
// since the 'value' obtained by useState(''); is just html


export default QuillNotesEditor;  
