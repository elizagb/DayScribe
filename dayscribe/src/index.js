import React from 'react';
import ReactDOM from 'react-dom';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import App from './App';

// Create a container div dynamically
const root = document.createElement("div");
root.className = "container";
document.body.appendChild(root);

// Function to initialize Quill
const initializeQuill = () => {
  const quill = new Quill(root, { theme: 'snow' });
};

// Render the React app and initialize Quill after rendering
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/*
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  root,
  initializeQuill
);
*/

