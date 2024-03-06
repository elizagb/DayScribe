import Delta from 'quill-delta';
import { writeNote,fetchNote, removeNote, printDb } from './communicators.js';

// soon to possibly get passed a reference to the quill editor so that we can
// update the quill editor?
// ** We will need to know how THE SYSTEM knows which date's note we are modifyinga **


export async function getSpecificNote(date){
    // is dateKey MMDDYYYY?
    console.log(`\ngetSpecificNote called with date: ${date}\n`);
    // let formattedDate = "03032024"
    let formattedDate = date.replaceAll("/", ""); 
    try {
        let returnDelta = await fetchNote(formattedDate);
        console.log(`return Delta = ${returnDelta}\n`);
    }
    catch (error){
        console.log(`fetch error: didn't pass the try block`);
    }

}


export function getValidDates(date){
    
}