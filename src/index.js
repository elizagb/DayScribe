/* CS 422 Winter 2024
 * index.js
 * Created by Megan Beckstrand on 2/23/2024
 * Last modified 3/11/2024
 * 
 * Renders the TextWrapperInterface object in a React Root component.
 * This React Root ultimately renders over the index.html <div> component with the "root" id label.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import TextWrapperInterface from './TextWrapperInterface'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TextWrapperInterface />
  </React.StrictMode>,

);


