/* CS 422 Winter 2024
communicators.py
Created by Luke Marshall 2/21/2024
Last modified: 3/11/2024
Contains functions which simplify the Chrome chrome.storage API calls.

functions:
writeNote: Used to either initialize storage or update a note through the storage of the 
Quill note as a Delta oject.
fetchNote: Used to retrieve the Delta object note corresponding to the given date key
from local storage to then display on the Quill interface as a saved version of 
the last time the note was accessed.
fetNoteSynced: Used to retrieve the Delta object note corresponding to the given date key
from sync storage to then display on the Quill interface as a saved version of 
the last time the note was accessed.
removeNote: Removes the object from the local and synced storage that is stored at
the given date key if sync is also specified as true, otherwise only removing from local storage.
clearCalendar: USE WITH CAUTION. Removes every object stored in the local and synced
storage if sync is specified as true otherwise only clearing local storage.
Information about chrome.storage API found at:
https://developer.chrome.com/docs/extensions/reference/api/storage

Each storage API method call has error handling through the use of chrome.runtime.lastError which 
is where the error is stored if there is a failure of the most recent API call, otherwise it remains 
undefined. If another API call occurs the value is overwritten to the new value determined by that 
call or if the program leaves the scope of the API call callback function. 
This means error checking needs to occur immediately after each API call to ensure capturing 
any errors which occur. Found at: 
https://developer.chrome.com/docs/extensions/reference/api/runtime#property-lastError

For use with Firefox browser:
Even though the API calls include the chrome.* syntax, the chrome namespace is compatible 
with the Firefox browser.storage API, so it is able to use the same syntax. The only difference 
as of the date last modified is that chrome doesn't support the use of Promises but Firefox does; 
therefore to ensure the capatability of the two with the same code, only callback functions should
be used for asynchronous reactions and functionality. Both accept and return JSON objects directly 
without any stringifying or parsing needed.

Delta objects are used to store each note as a snapshot of a Quill note interface as it was when 
it was last modified. Within storage the Delta objects are stored as values with their keys being the 
dates the notes were created for, according to the interface. Delta objects are a strict subset 
of JSON and as such may be directly placed into and returned from either Chrome chrome.storage or
Firefox browser.storage using the same API calls.
More information on Delta objects can be found at: https://quilljs.com/docs/delta/
*/

/* global chrome */ // notifies js that there is a global variable named chrome outside of the file if the functions are 
// used outside of an extension, such as for testing locally

//====================================================================================================================================================
//---------------------------------------- Write Function ---------------------------------------------------------------------------------------------
//====================================================================================================================================================

export function writeNote(dateKey, Delta, sync=false) { // export allows the function to be imported to another file
    /* Function handles the API calls for the .set functionality, either for initially creating an
    object at a key or subsequently updating it. 
    
    Args:
        dateKey (str): the date referring to the note being set or updated, used as the key in storage
        Delta (Delta object): A snapshot of the Quill interface at the time it was last saved, as a
        Delta object (JSON), able to be placed into storage directly.
        sync (bool): defaults to false, synced being set to true means that the delta is written 
        into the local and sync storage instead of only local when synced is set to false
        */
    // setCorrectly (bool): boolean value set based on if each of the API calls is successful (true if successful, false if not)
    let setCorrectly = true; // set in the individual .set calls to track if either fail and returning this finding
    // but allowing for both .set calls to proceed if synced is set to true

    // chrome.storage is the syntax for accessing the built-in browser storage, for either Firefox or Chrome
    // dateKey used as the ID key stored with the Delta argument as the value in the local browser storage
    chrome.storage.local.set({ [dateKey]: Delta }); 

    // chrome.runtime.lastError is defined as an error by the browser extension if the .set call is unsuccessful,
    // undefined otherwise and equates to false in the checked for boolean status
    if (chrome.runtime.lastError) { // if the API call is unsuccessful...
        //console.error prints to standard error the message that is passed in the arguments
        console.error(`Error setting the note for ${dateKey} in local storage.`); // displays error message on console
        // assign setCorrectly to false if the .set fails so that the failure can be tracked from calling function
        setCorrectly = false;
    } else { // if the API call is successful
        console.log(`Succefully set note for ${dateKey} in local storage! `); 
        // output to console that API call was successful
    }

    // check if synced is true, meaning the delta object should be stored in the sync storage as well as local
    if (sync) {
        // dateKey used as the ID key stored with the Delta argument as the value in the sync browser storage
        chrome.storage.sync.set({ [dateKey]: Delta});
        if (chrome.runtime.lastError) { // if the API call is unsuccessful...
            console.error(`Error setting the note for ${dateKey} in synced storage.`); // displays error message on console
            // assign setCorrectly to false if the .set fails so that the failure can be tracked from calling function
            setCorrectly = false;
        } else { // if the API call is successful
            console.log(`Succefully set note for ${dateKey} in synced storage!`);
            // output to console that API call was successful
        }
    }

    return setCorrectly; // returns true if both storage API calls were successful, false if at least one was unsuccessful
}


//====================================================================================================================================================
//---------------------------------------- Fetch Functions ---------------------------------------------------------------------------------------------
//====================================================================================================================================================

export function fetchNote(dateKey) { // export allows the function to be imported to another file
    /* Function handles the fetching of a note from storage
    
    Args:
        dateKey (str): key of the note in storage being fetched
        */
    
        return new Promise((resolve, reject) => { // Promise object created to handle asynchronous events
            // takes a function called the executor as an argument, this executor takes two more functions as arguments
            // executor is called immediately after Promise is created, allows for calling either resolve or reject as a 
            // result of running some code; resolve call returns to a .then method in the calling function which can then use
            // the information in the resolve argument; reject call returns to a .catch method in the calling function
            // which can then use the information in the rejecty argument
    
        // chrome.storage is the syntax for accessing the built-in browser storage, for either Firefox or Chrome
        // dateKey used as the key for a stored note, .get call uses it as first argument to retrieve the appropriate 
        // key-value pair
        chrome.storage.local.get([dateKey], function(returnedJSON) { // second argument is callback function reacting to 
                                                                    // result of the .get call

            // chrome.runtime.lastError is defined as an error by the browser extension if the .get call is unsuccessful,
            // undefined otherwise and equates to false in the checked for boolean status
            if (chrome.runtime.lastError) { // if the API call is unsuccessful...
                console.error(`Error retrieving note for ${dateKey} from local storage`); // displays error message on console
                reject ('error' + `failed to retrieve ${dateKey} from local storage.`); // returns reject to caller .catch method
            } else { // if the API call is successful
                console.log(`Successfully retrieved note for ${dateKey} from local storage!`);
                // output to console that API call was successful
                resolve(returnedJSON[dateKey]); // return resolve to caller .thn method
            }
        });
    });
}

function inMonth(month, dates) { // export allows the function to be imported to another file
    /* Helper function for fetchAllDates function. Returns a filtered list of notes in the database which are all in a 
    given month. 

    Args:
        month (str): the month that the returned populated note dates should be confined to
        dates (arr[str]): an array of the dates of populated notes that are contained in the database
        */
    // inMo (arr[str]): array that will hold the dates of populated notes held within the database
    let inMo = []; // empty array for dates to be added to when a date in the given month is found
    for (const date of dates) { // iterate through the dates in the list of populated note dates
        if (date.slice(0,2) == month) { // check if the month for the date is the same as the given month
            inMo.push(date); // if it is, add it to inMo
        }
    }
    return inMo; // return the list of populated note dates in a given month
}

export function fetchAllDates(month) { // export allows the function to be imported to another file
    /* Function asynchronously returns all the dates for populated notes in storage that are in a given month
    
    Args:
        month (str): month that caller would like to know all the dates of the populated notes for
        */
    return new Promise((resolve, reject) => { // Promise object created to handle asynchronous events
            // takes a function called the executor as an argument, this executor takes two more functions as arguments
            // executor is called immediately after Promise is created, allows for calling either resolve or reject as a 
            // result of running some code; resolve call returns to a .then method in the calling function which can then use
            // the information in the resolve argument; reject call returns to a .catch method in the calling function
            // which can then use the information in the rejecty argument

        // chrome.storage is the syntax for accessing the built-in browser storage, for either Firefox or Chrome
        // .get call is passed null in order to return all key-value paires in the storage
        chrome.storage.local.get(null, function(returnedItems) { // second argument is callback function reacting to 
                                                                // result of the .get call
            //source: https://stackoverflow.com/questions/18150774/get-all-keys-from-chrome-storage

            // chrome.runtime.lastError is defined as an error by the browser extension if the .get call is unsuccessful,
            // undefined otherwise and equates to false in the checked for boolean status
            if (chrome.runtime.lastError) { // if the API call is unsuccessful...
                console.error('Error retrieving all items from local storage in fetchAllDates call'); // displays error message on console
                reject('error' + 'failed to retieve all items from local storage in fetchAllDates call'); // returns reject to caller .catch method
            } else { // if the API call is successful
                console.log('Successfully retrieved all objects from local storage!');
                // output to console that API call was successful
                let itemKeys = Object.keys(returnedItems); // retrieve the keys (dates) of all the notes in storage
                resolve(inMonth(month, itemKeys)); // return list of populated note dates to the caller through resolve function
            }
        });
    });
}

export function printDb() { // export allows the function to be imported to another file
    /* Function prints all the dates for notes in the local storage to the console. For debugging purposes. */

    // chrome.storage is the syntax for accessing the built-in browser storage, for either Firefox or Chrome
    // .get call is passed null in order to return all key-value paires in the storage
    chrome.storage.local.get(null, function(returnedItems) { // second argument is callback function reacting to 
                                                            // result of the .get call
        // https://stackoverflow.com/questions/18150774/get-all-keys-from-chrome-storage
        // chrome.runtime.lastError is defined as an error by the browser extension if the .get call is unsuccessful,
        // undefined otherwise and equates to false in the checked for boolean status
        if (chrome.runtime.lastError) { // if the API call is unsuccessful...
            console.error('Error retrieving all items from local storage in printDB call'); // displays error message on console
            return { 'error': 'failed to retieve all items from local storage in printDB call' }; // returns object to caller with error message
        } else { // if the API call is successful
            console.log('Successfully retrieved all objects from local storage!'); // report that the call was successful to console
            let itemKeys = Object.keys(returnedItems); // retrieve the keys (dates) of all the notes in storage
            console.log(`${itemKeys}`); // write the dates to console
        }
    });
}


// For expansion into sync storage if desired at some point:
// export function fetchNoteSynced(dateKey) {
    
//     chrome.storage.sync.get([dateKey], function(returnedDelta) {
//         if (chrome.runtime.lastError) {
//             console.error(`Error retrieving note for ${dateKey} from synced storage`);
//             return {'error': `failed to retrieve ${dateKey} from synced storage.`};
//         } else {
//             console.log(`Successfully retrieved note for ${dateKey} from synced storage!`);
//             return returnedDelta[dateKey];
//         }
//     });
// }


//====================================================================================================================================================
//---------------------------------------- Removal Functions ---------------------------------------------------------------------------------------------
//====================================================================================================================================================

export function removeNote(dateKey, sync=false) { // export allows the function to be imported to another file
    /* Function removes a given note from storage, indicated by the key is is stored with.
    
    Args:
        dateKey (str): the key for a note in storage, i.e. the date the note corresponds to
        sync (bool): defaults to false, indicates if the note is in and should be removed from sync storage
        */
    // successfulDelete (bool): indicates if all attempts to remove a note from the storage were successful
    let successfulDelete = true; // defaults to true unless an attempt top remove is unsuccessful

    // chrome.storage is the syntax for accessing the built-in browser storage, for either Firefox or Chrome
    // dateKey used as the key for a stored note, .remove call uses it as first argument to remove the appropriate 
    // key-value pair
    chrome.storage.local.remove([dateKey], function() { // second argument is callback function reacting to 
                                                       // result of the .remove call
        // chrome.runtime.lastError is defined as an error by the browser extension if the .remove call is unsuccessful,
        // undefined otherwise and equates to false in the checked for boolean status
        if (chrome.runtime.lastError) { // if the API call is unsuccessful...
            console.error(`Error removing note for ${dateKey} from local storage.`); // displays error message on console
            successfulDelete = false; // sets success flag to false
        } else { // if the API call is successful
            console.log(`Successfully removed note for ${dateKey} from local storage!`); // report that the call was successful to console
        }
    });

    // check if synced is true, meaning the note should be removed from sync storage as well
    if (sync) {
        // dateKey used as the key to remove the item from the sync browser storage
        chrome.storage.sync.remove([dateKey], function() {
            if (chrome.runtime.lastError) { // if the API call is unsuccessful...
                console.error(`Error removing note for ${dateKey} from synced storage.`); // displays error message on console
                successfulDelete = false; // set success flag to false
            } else { // if the API call is successful
                console.log(`Successfully removed note for ${dateKey} from synced storage!`); // report that the call was successful to console
            }
        });
    }

    return successfulDelete; // returns true if both storage API calls were successful, false if at least one was unsuccessful
}

export function clearCalendar(sync=false) { // export allows the function to be imported to another file
    /* Function clears the entirety of the browser storage. USE WITH CAUTION. most likely only for debugging purposes.
    
    Args:
        sync (bool): defaults to false, represents if the sync storage should also be cleared */
    // successfulClear (bool): indicates if all attempts to clear notes from the storage were successful
    let successfulClear = true; // defaults to true unless an attempt to clear is unsuccessful

    // chrome.storage is the syntax for accessing the built-in browser storage, for either Firefox or Chrome
    // .clear storage API method requires no arguments corresponding to which notes to clear
    chrome.storage.local.clear(function() { // only argument is a callback function which checks the result of the clear

        // chrome.runtime.lastError is defined as an error by the browser extension if the .remove call is unsuccessful,
        // undefined otherwise and equates to false in the checked for boolean status
        if (chrome.runtime.lastError) { // if the API call is unsuccessful...
            console.error("Error clearing local storage."); // displays error message on console
            successfulClear = false; // set success flag to false
        } else { // if the API call is successful
            console.log("Succesfully cleared local storage!"); // report that the call was successful to console
        }
    });

    // check if synced is true, meaning the sync storage should also be cleared
    if (sync) {
        
        // .clear storage API method requires no arguments corresponding to which notes to clear
        chrome.storage.sync.clear(function() {
            if (chrome.runtime.lastError) { // if the API call is unsuccessful...
                console.error("Error clearing synced storage."); // displays error message on console
                successfulClear = false; // set success flag to false
            } else { // if the API call is successful
                console.log("Succesfully cleared synced storage!"); // report that the call was successful to console
            }
        });
    }

    return successfulClear; // returns true if both storage API calls were successful, false if at least one was unsuccessful
}