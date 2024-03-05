import Delta from 'quill-delta';
import { writeNote,fetchNote, removeNote } from './communicators.js';

// soon to possibly get passed a reference to the quill editor so that we can
// update the quill editor?
// ** We will need to know how THE SYSTEM knows which date's note we are modifyinga **


export function getSpecificNote(date){
    // is dateKey MMDDYYYY?
    console.log(`\ngetSpecificNote called with ${date}\n`);
    let formattedDate = "03032024"
    let returnDelta = fetchNote(formattedDate);
    
    console.log(`return Delta = ${returnDelta}\n`);

}


export function getValidDates(date){
    
}