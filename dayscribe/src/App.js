
import React, { useState } from 'react';
import QuillNotesEditor from './QuillNotesEditor';

import 'react-quill/dist/quill.snow.css';
import styles from "./App.css";

/*const Button = styled.button`
  background-color: ${(props) => theme[props.theme].default};
  color: white;
  padding: 5px 15px;
  border-radius: 5px;
  outline: 0;
  border: 0; 
  text-transform: uppercase;
  margin: 10px 0px;
  cursor: pointer;
  box-shadow: 0px 2px 2px lightgray;
  transition: ease background-color 250ms;
  &:hover {
    background-color: ${(props) => theme[props.theme].hover};
  }
  &:disabled {
    cursor: default;
    opacity: 0.7;
  }
`;*/


const Editor = () => {
  // Editor state
  const [value, setValue] = useState("");

  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>Editor Content</label>
      <h1> Welcome to DayScribe! </h1>
        <MyButton />
        <MyButton />
      {/* <QuillEditor
        className={styles.editor}
        theme="snow"
        value={value}
        onChange={(value) => setValue(value)}
      /> */}
      <QuillNotesEditor/>

    </div>
  );
};

function MyButton(){

  const [count, setCount] = useState(0);

  function handleClick() {
    //go to previous delta obj

  }
  return (
    <button onClick={handleClick}>I'm a button</button>
  )

}


export default Editor;
// OR App
//work in here