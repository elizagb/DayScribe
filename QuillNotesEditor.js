import React, { useState } from 'react';
import QuillEditor from "react-quill";
import Quill from 'quill';
import 'react-quill/dist/quill.snow.css';
import styles from "./App.css";


function QuillNotesEditor() {
  const [value, setValue] = useState('');

  const quill = new Quill('#editor', { theme: 'snow' });
  return <QuillEditor
  quill= {quill}
  className={styles.editor}
  theme="snow"
  value={value}
  onChange={(value) => setValue(value)}
/>
}

export default QuillNotesEditor;  