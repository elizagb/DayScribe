import Delta from 'quill-delta';
import { clearCalendar, writeNote,fetchNote, removeNote, printDb, fetchAllDates } from './communicators.js';
import {tokenizeDate, dateTokensToString, getNextDate, formatDelta} from './eventHandlerHelpers.js'

// soon to possibly get passed a reference to the quill editor so that we can
// update the quill editor?
// ** We will need to know how THE SYSTEM knows which date's note we are modifyinga **


export async function getSpecificNote(dateString, shiftDirection){
  // fetches the next note in the direction specified by shiftDirection

    return new Promise(async (resolve, reject) => {

      console.log(`\ngetSpecificNote called with date: ${dateString}\n`);
  
      let fetchDateStr = getNextDate(dateString, shiftDirection);     
      
      // shift from "MM/DD/YYYY" to "MMDDYYYY" as stored in the database
      let formattedDate = fetchDateStr.replaceAll("/", ""); 
      try {
          let returnDelta = await fetchNote(formattedDate);
          console.log(`getSpecificNote returning: ${returnDelta}\n`);
          resolve([fetchDateStr, returnDelta]);
      }
      catch (error){
          console.log(`fetch error: didn't pass the try block`);
          reject(error);
      }

    });
    
}


export async function getValidDates(date){
    // for calendar functionality: populating calendar with dates
    return new Promise(async (resolve, reject) => {
      console.log(`getValidDates called for ${date}`);
      try {
        console.log("date:", date, "month:", date.slice(0,2));   
        let returnDates = await fetchAllDates(date.slice(0,2));
        console.log(`noteRetrieval returned dates: ${returnDates}`);
        let convertedDates = []
        // convert these into Date objects for CalendarInterface
        for (let i = 0; i < returnDates.length; i++){
          convertedDates.push(
            new Date(returnDates[i].slice(4,), returnDates[i].slice(0,2)-1, returnDates[i].slice(2,4))
            );
        }
        
        resolve(convertedDates);
      }
      catch (error){
        reject(error);
      }
    });

}