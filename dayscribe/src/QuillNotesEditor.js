import React, { useState } from 'react';
import QuillEditor from "react-quill";
import Quill from 'quill';
import 'react-quill/dist/quill.snow.css';
import styles from "./App.css";


export const QuillNotesEditor = () => {
  const [value, setValue] = useState('');

  //const quill = new Quill('#editor', { theme: 'snow' });
  return (
  <div>
    <QuillEditor 
      theme="snow" 
      value={value}
      onChange = {(value)=> setValue(value)}
    />
  </div>
  );
}

export default QuillNotesEditor;  
