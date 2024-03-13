/* CS 422 Winter 2024
 * eventHandlerHelpers.js
 * Created by Nathan Koga on 3/3/2024
 * Last modified 3/13/2024
 * 
 * Contains helpful functions that the noteRetrieval and noteMaintenance modules use for current development (and future development)
 * 
 * tokenizeDate: Converts a date string to an array of integers
 * dateTokensToString: Converts an array of integers into a string in "MM/DD/YYYY" format
 * getNextDate: Takes a date string and return a date string for the next day
 * formatDelta: Takes a Delta object (or any JSON object) and returns it as a formatted string for debugging purposes
 * 
 * Sources: quilljs.com/docs/delta/
 */

export function tokenizeDate(date){
  /* Takes a date string in "MM/DD/YYYY" format, and converts it to list of ints: [MM, DD, YYYY]
   * 
   * Args:
   *    date (str): The date in "MM/DD/YYYY" format 
   */    
    const [month, day, year] = date.split('/');
    const retList = [parseInt(month, 10), parseInt(day, 10), parseInt(year, 10)]; 
    return retList;
  }
  
  
export function dateTokensToString(dateTokens){
  /* Takes a list of ints in [MM, DD, YYYY] format, and converts it to "MM/DD/YYYY"
   * 
   * Args:
   *    dateTokens (array[int]): The date in [MM,DD,YYYY] format
   */   

    return `${dateTokens[0].toString().padStart(2, '0')}/${dateTokens[1].toString().padStart(2, '0')}/${dateTokens[2]}`;
    }
  
export function getNextDate(date, shiftDirection){
  /* Takes a date in "MM/DD/YYYY" format, tokenizes it to make into a Date() object
   * and shifts it +/- 1 day with implicit handling for boundaries (Date() objects handle edge cases)
   * 
   * Args:
   *    date (str): The date in "MM/DD/YYYY" format 
   *    shiftDirection (int): The direction in which to move to find the next note (-1 to move back a day, +1 to move forward a day)
   */  

    let dateTokens = tokenizeDate(date);
    
    // note: month is only one zero indexed 
    let currDate = new Date(dateTokens[2], dateTokens[0]-1, dateTokens[1]);

    // set this new Date object to the next date (+/- 1 day forward)
    currDate.setDate(currDate.getDate() + shiftDirection);
    let fetchDate = [currDate.getMonth() + 1, currDate.getDate(), currDate.getFullYear()];
    // source: https://www.geeksforgeeks.org/how-to-calculate-the-yesterdays-date-in-javascript/a
    let fetchDateStr = dateTokensToString(fetchDate);

    // return this new date in "MM/DD/YYYY" format
    return fetchDateStr;
}

export function formatDelta(delta) {  
  /* Takes a Delta object (or any JSON object) and returns it as a formatted string for debugging purposes
   *
   * Args:
   *    delta(Delta object): the Delta object to be made into a human-readable string
   */  
  // Source: from quilljs.com/docs/delta/
  
    return `${JSON.stringify(delta.ops, null, 2)}`;
  }

