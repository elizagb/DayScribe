import Delta from 'quill-delta';
import { writeNote,fetchNote, removeNote, printDb } from './communicators.js';

// soon to possibly get passed a reference to the quill editor so that we can
// update the quill editor?
// ** We will need to know how THE SYSTEM knows which date's note we are modifyinga **

function tokenizeDate(date){
  // takes a string "MM/DD/YYYY", converting it to list of ints: [MM, DD, YYYY]
  const [month, day, year] = date.split('/');
  const retList = [parseInt(month, 10), parseInt(day, 10), parseInt(year, 10)]; 
  return retList;
}


function dateTokensToString(dateTokens){
  // takes a list of ints [MM, DD, YYYY], converting it to "MM/DD/YYYY"
  
  return `${dateTokens[0].toString().padStart(2, '0')}/${dateTokens[1].toString().padStart(2, '0')}/${dateTokens[2]}`;
}


export async function getSpecificNote(dateString, shiftDirection){
    // dateKey is MMDDYYYY
    
    // take a date string, tokenize to make into a Date() object
    // then we can shift the date +/- 1 without needing to
    // worry about boundary logic like Jan 1st to Dec 31st, etc.
    return new Promise(async (resolve, reject) => {

        console.log(`\ngetSpecificNote called with date: ${dateString}\n`);
    
        let dateTokens = tokenizeDate(dateString);
        // note: month is only one zero indexed (so awesome)
        let currDate = new Date(dateTokens[2], dateTokens[0]-1, dateTokens[1]);
        currDate.setDate(currDate.getDate() + shiftDirection);
        let fetchDate = [currDate.getMonth() + 1, currDate.getDate(), currDate.getFullYear()];
        // source: https://www.geeksforgeeks.org/how-to-calculate-the-yesterdays-date-in-javascript/a
        let fetchDateStr = dateTokensToString(fetchDate);
        
        let formattedDate = fetchDateStr.replaceAll("/", ""); 
        try {
            let returnDelta = await fetchNote(formattedDate);
            console.log(`return Delta = ${returnDelta}\n`);
            resolve([fetchDateStr, returnDelta]);
    
        }
        catch (error){
            console.log(`fetch error: didn't pass the try block`);
            reject(error);
        }

    })
    

}


export function getValidDates(date){
    
}