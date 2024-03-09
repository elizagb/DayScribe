
import Delta from 'quill-delta';
import { writeNote,fetchNote, removeNote } from './communicators.js';
import {tokenizeDate, dateTokensToString, getNextDate, formatDelta} from './eventHandlerHelpers.js'


export async function noteWriteRequest(date, quillEditor){
  // takes a date in "MM/DD/YYYY"and calls writeNote
  // using the given date, and Delta stored in the quillEditor (if non-empty)

  let currentText = await quillEditor.current.getEditor().getText();

  if (currentText.length > 1){
    let currentDelta = await quillEditor.current.getEditor().getContents();
    let formattedDate = date.replaceAll("/", ""); 
    console.log(`Note to write into storage: ${formatDelta(currentDelta)}\n`);
    writeNote(formattedDate, currentDelta);
  }
  else {
    console.log("Empty note: no write required");
  }

}

export function noteDeleteRequest(date){

}