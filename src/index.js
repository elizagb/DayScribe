import React from 'react';
import ReactDOM from 'react-dom';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import TextWrapperInterface from './TextWrapperInterface'

// // Create a container div dynamically
// const root = document.createElement("div");
// root.className = "container";
// document.body.appendChild(root);

// // Function to initialize Quill
// const initializeQuill = () => {
//   const quill = new Quill(root, { theme: 'snow' });
// };


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TextWrapperInterface />
  </React.StrictMode>,

);


