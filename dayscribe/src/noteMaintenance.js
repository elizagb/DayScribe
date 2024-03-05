
import Delta from 'quill-delta';
import { writeNote,fetchNote, removeNote } from './communicators.js';


function formatDelta(delta) {
    // from quilljs.com/docs/delta/
    // for debugging --> printing delta objects in readable format

    return `${JSON.stringify(delta.ops, null, 2)}`;
  }



export function noteWriteRequest(date, note){
    // takes a date(currently hard-coded to march 3rd 2024), 
    // prints it to console, and calls writeNote using the given date, and the note (Delta object)     

    let testDate = "03032024"; 
    // const testDelta = new Delta().insert('testDelta input');
     
    console.log(`input note val => ${formatDelta(note)}\n`);
    writeNote(testDate, note);
}

export function noteDeleteRequest(date){

}