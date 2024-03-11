/* CS 422 Winter 2024
 * noteRetrieval.js
 * Created by Nathan Koga on 3/3/2024
 * Last modified 3/10/2024
 * 
 * Contains intermediary functions that facilitate requests from the interface modules
 * to fetch specific notes or information regarding populated notes from the note storage.
 * 
 * getSpecificNote: Given a specific date string and a "shift direction", returns a Promise object
 * that handles the asynchronous action of fetching data from the note storage.
 * 
 * getValidDates: Given a specific date string, returns a Promise object that handles the
 * asynchronous action of fetching all valid/populated dates of a given month from the note storage.
 */


import {fetchNote, fetchAllDates } from './communicators.js';
import {dateTokensToString, getNextDate} from './eventHandlerHelpers.js'


export async function getSpecificNote(date, shiftDirection){
  // fetches the next note in the direction specified by shiftDirection

    return new Promise(async (resolve, reject) => {

      console.log(`\ngetSpecificNote called with date: ${date}\n`);
      if (date instanceof Date){
        // if date Object, convert to a 
        
        date = [date.getMonth()+1, date.getDate(), date.getFullYear()]; 
        date = dateTokensToString(date);
      }

      let fetchDateStr = getNextDate(date, shiftDirection);     
      
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
    // takes a Date object, returns a list of Date objects
    return new Promise(async (resolve, reject) => {
      console.log(`getValidDates called for ${date}`);
      try {
        let returnDates = await fetchAllDates(date.getMonth()+1);
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