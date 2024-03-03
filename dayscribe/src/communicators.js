/* global chrome */
// Your code using chrome.storage and other chrome.* APIs


/* CS 422 Winter 2024
communicators.py
Created by Luke Marshall 2/21/2024
Last modified: 2/22/2024

Containes functions which simplify the Chrome chrome.storage and Firefox browser.storage 
API calls.
writeNote: Used to either create or update a note through the storage of the 
Quill interface as a Delta oject.
fetchNoteLocal: Used to retrieve the delta object at the specified ID key
from local storage to then display on the Quill interface as a saved version of 
the last time it was accessed.
fetNoteSynced: Used to retrieve the delta object at the specified ID key
from user-synced storage to then display on the Quill interface as a saved version 
of the last time it was accessed.
removeNote: Removes the object from the local and synced storage that is stored at
the given ID.
clearCalendar: USE WITH CAUTION. Removes every object stored in the local and synced
storage.
Information about chrome.storage API found at:
https://developer.chrome.com/docs/extensions/reference/api/storage

Each has error handling through the use of chrome.runtime.lastError which is where the
error is stored if there is a failure of the most recent API call, else it remains undefined. 
If another API call occurs the value is overwritten to the new value determined by that 
call and if the program leaves the scope of the API call such as within a callback function. 
This means error checking needs to occur quickly after each API call to ensure capturing 
any that occur. Found at: 
https://developer.chrome.com/docs/extensions/reference/api/runtime#property-lastError

Even though the API calls include the chrome.* syntax, the chrome namespace is compatible 
with the Firefox browser.storage API, so it is able to use the same syntax. The only difference 
as of the date last modified is that chrome doesn't support the use of Promises but Firefox does; 
therefore to ensure the capatability of the two with the same code, only callback functions should
be used for asynchronous reactions and functionality. Both accept and return JSON objects directly 
without any stringifying or parsing needed.

Delta objects are used to store each note as a snapshot of the Quill interface as it was when 
it was last saved. Within storage the Deltas are stored as values with their ID keys being the 
dates the notes were created for, according to the interface. Delta objects are a strict subset 
of JSON and as such may be directly placed into and returned from either Chrome chrome.storage or
Firefox browser.storage using the same API calls.
More information on Delta objects can be found at: https://quilljs.com/docs/delta/
*/

//====================================================================================================================================================
//---------------------------------------- Write Function ---------------------------------------------------------------------------------------------
//====================================================================================================================================================

function writeNote(dateKey, Delta, synced=false) {
    /* Function handles the API calls for the .set functionality, either for initially creating an
    object at an ID or subsequently updating it. 
    
    Args:
        dateKey (str): the date referring to the note being set or updated, used as the ID in storage
        Delta (Delta object): A snapshot of the Quill interface at the time it was last saved, as a
        Delta object (JSON), able to be placed into storage directly.
        synced (bool): defaults to false, synced being set to true means that the delta is written 
        into the local and sync storage instead of only local when synced is set to false
        */
    //setCorrectly (bool): boolean value set based on if each of the API calls is successful (true if successful, false if not)
    let setCorrectly = true;

    // chrome.storage is the syntax for accessing the built-in browser storage. 
    chrome.storage.local.set({ [dateKey]: Delta });

    if (chrome.runtime.lastError) {
        console.error(`Error setting the note for ${dateKey} in local storage.`);
        setCorrectly = false;
    } else {
        console.log(`Succefully set note for ${dateKey} in local storage! `);
    }

    if (synced) {
        chrome.storage.sync.set({ [dateKey]: jsonDelta});
        if (chrome.runtime.lastError) {
            console.error(`Error setting the note for ${dateKey} in synced storage.`);
            setCorrectly = false;
        } else {
            console.log(`Succefully set note for ${dateKey} in synced storage!`);
        }
    }

    return setCorrectly;

}


//====================================================================================================================================================
//---------------------------------------- Fetch Functions ---------------------------------------------------------------------------------------------
//====================================================================================================================================================

function fetchNoteLocal(dateKey) {
    
    chrome.storage.local.get([dateKey], function(returnedDelta) {
        if (chrome.runtime.lastError) {
            console.error(`Error retrieving note for ${dateKey} from local storage`);
            return {'error': `failed to store ${dateKey} in local storage.`};
        } else {
            console.log(`Successfully stored note for ${dateKey} in local storage!`);
            return returnedDelta[dateKey]
        }
    });
}

function fetchNoteSynced(dateKey) {
    
    chrome.storage.sync.get([dateKey], function(returnedDelta) {
        if (chrome.runtime.lastError) {
            console.error(`Error retrieving note for ${dateKey} from synced storage`);
            return {'error': `failed to store ${dateKey} in synced storage.`};
        } else {
            console.log(`Successfully stored note for ${dateKey} in synced storage!`);
            return returnedDelta[dateKey];
        }
    });
}


//====================================================================================================================================================
//---------------------------------------- Removal Functions ---------------------------------------------------------------------------------------------
//====================================================================================================================================================

function removeNote(dateKey, synced=false) {

    let successfulDelete = true;

    chrome.storage.local.remove([dateKey], function() {
        if (chrome.runtime.lastError) {
            console.error(`Error removing note for ${dateKey} from local storage.`);
            successfulDelete = false;
        } else {
            console.log(`Successfully removed note for ${dateKey} from local storage!`);
        }
    });

    if (synced) {
        chrome.storage.sync.remove([dateKey], function() {
            if (chrome.runtime.lastError) {
                console.error(`Error removing note for ${dateKey} from synced storage.`);
                successfulDelete = false;
            } else {
                console.log(`Successfully removed note for ${dateKey} from synced storage!`);
            }
        });
    }

    return successfulDelete;
}

function clearCalendar(synced=false) {

    let successfulClear = true;

    chrome.storage.local.clear(function() {
        if (chrome.runtime.lastError) {
            console.error("Error clearing local storage.");
            successfulClear = false;
        } else {
            console.log("Succesfully cleared local storage.");
        }
    });

    if (synced) {
        chrome.storage.sync.clear(function() {
            if (chrome.runtime.lastError) {
                console.error("Error clearing synced storage.");
                successfulClear = false;
            } else {
                console.log("Succesfully cleared synced storage.");
            }
        });
    }

    return successfulClear;
}