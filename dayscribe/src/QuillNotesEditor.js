import React, { useState } from 'react';
import QuillEditor from "react-quill";
import 'react-quill/dist/quill.snow.css';
import styles from "./TextEditor.css";

function QuillNotesEditor() {
  const [value, setValue] = useState('');

  return <QuillEditor
  className={styles.editor}
  theme="snow"
  value={value}
  onChange={(value) => setValue(value)}
/>
}

export default QuillNotesEditor;  

