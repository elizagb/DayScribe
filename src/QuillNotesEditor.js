import React, { useState, useRef, useEffect} from 'react';
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


// export const QuillNotesEditor = React.forwardRef((props, ref) => {
//   const [value, setValue] = useState('');
//   // const quillRef = useRef(null);  // get a reference to the quill editor we create
//   // this "ref" object is accessed by quillRef.current attribute
  
//   let {currentDate} = props;
  
//   // on render, fetch the current note, and update note to storage
//   useEffect(() => {

//     const firstRender = async () => {
//       let [retDate, initialDelta] = await getSpecificNote(currentDate, 0);
//       ref.current.getEditor().setContents(initialDelta);
//     }
//     firstRender();
//     console.log(props);
//     noteWriteRequest(currentDate, ref);
//   })

//   return (
//     <div className = {styles.wrapper}>
   
//       <QuillEditor 
//         ref={ref}
//         theme="snow" 
//         value= {value}
//         onChange = {(value)=> setValue(value)} 
//       />
      
//   </div>
//   );
// });

export const QuillNotesEditor = React.forwardRef((props, ref) => {
  const [value, setValue] = useState('');
  // const quillRef = useRef(null);  // get a reference to the quill editor we create
  // this "ref" object is accessed by quillRef.current attribute
  

  // TODO: on navigation prompts, it saves the data from the target note into the "current" note
  // before navigating away

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
  // useEffect with an empty dependency array as above ensures this effect only happens 
  // on initial render (preventing an infinite loop) 

  const handleEditorChange = async (newVal) => {
    // this function is a race-condition nightmare:
    // if the currentDate is in a previous state but quill contents are updated to target date,
    // the "updated contents" store to the previous date before navigating to target date.
    // therefore duplicating the target note into the old "current" note. 
    console.log(`handleEditorChange called: val: ${newVal}`);
    if (ref && ref.current){
      // weird issue with ref having a different value only on first time
      // console.log("handleEditor change:", ref);
      // let savedDate = currentDate;
      // await updateDate(savedDate);
      let updateDelta = await ref.current.getEditor().getContents();
      
      // same with updateDelta on first run
      // console.log("delta?" , updateDelta);
      await noteWriteRequest(currentDate, ref);
      setValue(updateDelta);
    }
    else{
      console.log("handleEditor error");
    }
  }


  return (
    <div className = {styles.wrapper}>
   
      <QuillEditor 
        ref={ref}
        theme="snow" 
        value= {value}
        onChange = {handleEditorChange} 
      />
      
  </div>
  );
});

// found in the npmjs react-quill documentation under methods:
// "If you have a ref to a ReactQuill node, you will be able to invoke the following methods
// (...) getEditor(): Returns the Quill instance that backs the editor (...)"
// quillRef.current.getEditor().getContents() --> access the quill editor by referece.current
// getEditor() returns the quill instance associated to the reference, and getContents() returns a delta
// since the 'value' obtained by useState(''); is just html


export default QuillNotesEditor;  
