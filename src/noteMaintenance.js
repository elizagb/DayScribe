
import Delta from 'quill-delta';
import { writeNote,fetchNote, removeNote } from './communicators.js';
import {tokenizeDate, dateTokensToString, getNextDate, formatDelta} from './eventHandlerHelpers.js'


export function noteWriteRequest(date, note){
  // takes a date in "MM/DD/YYYY"and calls writeNote
  // using the given date and note (which is a Delta object)
  let formattedDate = date.replaceAll("/", ""); 
  // let testDate = "03032024"; 
  const testDelta = new Delta().insert('This is a delta object');  
  console.log(`testDelta: ${formatDelta(testDelta)}\n`);
  // writeNote(testDate, note);
  
  console.log(`input note val: ${formatDelta(note)}\n`);
  writeNote(formattedDate, note);
}

export function noteDeleteRequest(date){

}