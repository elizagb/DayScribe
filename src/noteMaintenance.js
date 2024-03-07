
import Delta from 'quill-delta';
import { writeNote,fetchNote, removeNote } from './communicators.js';
import {tokenizeDate, dateTokensToString, getNextDate, formatDelta} from './eventHandlerHelpers.js'


export function noteWriteRequest(date, note){
  // takes a date in "MM/DD/YYYY"and calls writeNote
  // using the given date and note (which is a Delta object)
  let formattedDate = date.replaceAll("/", ""); 
  
  console.log(`Note to write into storage: ${formatDelta(note)}\n`);
  writeNote(formattedDate, note);
}

export function noteDeleteRequest(date){

}