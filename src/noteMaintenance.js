
import Delta from 'quill-delta';
import { writeNote,fetchNote, removeNote } from './communicators.js';
import {tokenizeDate, dateTokensToString, getNextDate, formatDelta} from './eventHandlerHelpers.js'


export async function noteWriteRequest(date, note){
  // takes a date in "MM/DD/YYYY"and calls writeNote
  // using the given date, and Delta stored in the quillEditor (if non-empty)

  let currentText = await quillEditor.current.getEditor().getText();

  let formattedDate = date.replaceAll("/", ""); 

  // it should be IF DATE EXISTS IN DATABASE, then update, regardless of contents
  if (currentText.length > 1){
    let currentDelta = await quillEditor.current.getEditor().getContents();
    
    console.log(`Note to write into storage for ${date}: ${formatDelta(currentDelta)}\n`);
    writeNote(formattedDate, currentDelta);
  }
  else {
    console.log("Empty note: deleting association");
    removeNote(formattedDate);
  }

}

export function noteDeleteRequest(date){

}