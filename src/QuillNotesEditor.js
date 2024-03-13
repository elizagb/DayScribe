/* CS 422 Winter 2024
 * QuillNotesEditor.js
 * Created by Meagan Beckstrand on 2/28/2024
 * Last modified 3/12/2024
 * 
 * Implements the Quill Notes Editor that the user can use to create and edit notes.
 * 
 * firstRender: Fetches the note associated to the current date and sets the Quill Editor to the 
 * returned data, or creates a new Delta object if empty.
 * This function is only called upon the initial rendering of the QuillNotesEditor component.
 * 
 * sources: https://medium.com/@andrewkizito54/creating-a-rich-text-editor-using-react-and-react-quill-3ea990435ade
 *          https://www.npmjs.com/package/react-quill
 */


import React, { useState, useRef, useEffect } from 'react';
import QuillEditor from "react-quill";
import Delta from 'quill-delta';
import Quill from 'quill';
import 'react-quill/dist/quill.snow.css';
import {getSpecificNote, getValidDates} from './noteRetrieval.js'
import styles from "./TextWrapperInterface.js";

// creates the QuillNotesEditor component
export const QuillNotesEditor = React.forwardRef((props, ref) => {
  // This object uses React.forwardRef to create a React component that renders the Quill Notes Editor
  // Args:
  //   props: captures any values passed into the QuillNotesEditor object as props when called, including the current date, and quill reference
  //   ref: Contains the quill reference that was created when the QuillNotesEditor object was made.
  
  // create the state object that detects changes to the Quill Notes Editor
  const [value, setValue] = useState('');

  // Pull the currentDate and quill reference objects out of props, which was passed down from the Text Wrapper Interface
  let {currentDate, quill} = props;
  // 
  /*
  found in the npmjs react-quill documentation under methods:
    "If you have a ref to a ReactQuill node, you will be able to invoke the following methods
    (...) getEditor(): Returns the Quill instance that backs the editor (...)"
    quillRef.current.getEditor().getContents() --> access the quill editor by referece.current
    getEditor() returns the quill instance associated to the reference, and getContents() returns a delta
    since the 'value' obtained by useState(''); is just html
  */

  // on first render (as specified by the empty dependency in line 63), fetch the current note
  useEffect(() => {

    // define the firstRender function which handles the asynchronous note fetch using the Note Retrieval Handler
    const firstRender = async () => {

      // get the contents of the specified note
      let [retDate, initialDelta] = await getSpecificNote(currentDate, 0);
      
      // access the quill editor connected to ref.current.getEditor(), then set the note for the Editor
      ref.current.getEditor().setContents(initialDelta);
      
    };

    firstRender();
    console.log("Initializing the Quill Editor");
  }, []);

  const quillStyle = {
    height: '150px',
    paddingBottom: '50px'
  }

  return (
    <div className = "editor">
   
      <QuillEditor 
        ref={ref}
        theme="snow" 
        value= {value}
        style={quillStyle}
        onChange = {(value)=> setValue(value)} 
      />
      
  </div>
  );
});


export default QuillNotesEditor;  
