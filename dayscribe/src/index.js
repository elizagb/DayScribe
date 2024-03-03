import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Editor from './App';

const root = document.createElement("div")
// root.className = "container"
// document.body.appendChild(root)
// const rootDiv = ReactDOM.createRoot(root);
//rootDiv.render(
ReactDOM.render(
  <React.StrictMode>
    <App />
    <Editor />
  </React.StrictMode>,
  root
);


   //  <App />