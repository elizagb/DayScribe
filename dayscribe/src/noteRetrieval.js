import Delta from 'quill-delta';
import { writeNote,fetchNote, removeNote } from './communicators.js';


export function getSpecificNote(date){
    // is dateKey MMDDYYYY?
    console.log(`\ngetSpecificNote called with ${date}\n`);
    let formattedDate = "03032024"
    let returnDelta = fetchNote(formattedDate);
    
    console.log(`return Delta = ${returnDelta}\n`);

}


export function getValidDates(date){
    
}