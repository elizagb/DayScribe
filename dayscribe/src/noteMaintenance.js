
import Delta from 'quill-delta';
import { writeNote,fetchNote, removeNote } from './communicators.js';


function formatDelta(delta) {
    // from quilljs.com/docs/delta/
    // for debugging

    return `${JSON.stringify(delta.ops, null, 2)}`;
  }




export function noteWriteRequest(date, note){
    
    let testDate = "03032024"; 
    // const testDelta = new Delta().insert('testDelta input');
    const testDelta = new Delta().insert(note);
    
    
    console.log(`input note val => ${note}\n`);
    console.log(`testDelta created => ${formatDelta(testDelta)}\n`);
    writeNote(testDate, testDelta);
}

export function noteDeleteRequest(date){

}