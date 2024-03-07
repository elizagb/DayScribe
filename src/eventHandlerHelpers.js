
// helper functions used by noteRetrieval and noteMaintenance:
// to help with converting between date formats across modules


export function tokenizeDate(date){
    // takes a string "MM/DD/YYYY", converting it to list of ints: [MM, DD, YYYY]
    const [month, day, year] = date.split('/');
    const retList = [parseInt(month, 10), parseInt(day, 10), parseInt(year, 10)]; 
    return retList;
  }
  
  
export function dateTokensToString(dateTokens){
    // takes a list of ints [MM, DD, YYYY], converting it to "MM/DD/YYYY"

    return `${dateTokens[0].toString().padStart(2, '0')}/${dateTokens[1].toString().padStart(2, '0')}/${dateTokens[2]}`;
    }
  
export function getNextDate(date, shiftDirection){
    // takes a date in "MM/DD/YYYY" format, tokenize to make into a Date() object
    // and shifts it +/- 1 day with implicit handling for boundaries

    let dateTokens = tokenizeDate(date);
    // note: month is only one zero indexed 
    let currDate = new Date(dateTokens[2], dateTokens[0]-1, dateTokens[1]);
    currDate.setDate(currDate.getDate() + shiftDirection);
    let fetchDate = [currDate.getMonth() + 1, currDate.getDate(), currDate.getFullYear()];
    // source: https://www.geeksforgeeks.org/how-to-calculate-the-yesterdays-date-in-javascript/a
    let fetchDateStr = dateTokensToString(fetchDate);

    // return in "MM/DD/YYYY" format
    return fetchDateStr;
}

export function formatDelta(delta) {
    // from quilljs.com/docs/delta/
    // for debugging --> printing delta objects in readable format

    return `${JSON.stringify(delta.ops, null, 2)}`;
  }

