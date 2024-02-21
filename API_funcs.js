/* Functions for encapsulating chrome.storage API calls*/

function placeNote(datekey, Delta) {

    let setCorrectly = true;
    const jsonDelta = JSON.stringify(Delta);

    chrome.storage.local.set({ [datekey]: jsonDelta });
    if (chrome.runtime.lastError) {
        console.error(`Error setting the note for $(datekey) in local storage.`);
        setCorrectly = false;
    } else {
        console.log(`Succefully set note for ${datekey} in local storage! `);
    }

    chrome.storage.sync.set({ [datekey]: jsonDelta});
    if (chrome.runtime.lastError) {
        console.error(`Error setting the note for ${datekey} in synced storage.`);
        setCorrectly = false;
    } else {
        console.log(`Succefully set note for ${datekey} in synced storage!`);
    }

    return setCorrectly;

}

function fetchNoteLocal(datekey) {
    
    chrome.storage.local.get([datekey], function(returnedJsonDelta) {
        if (chrome.runtime.lastError) {
            console.error(`Error retrieving note for ${datekey} from local storage`);
            return {'error': `failed to store ${datekey} in local storage.`};
        } else {
            console.log(`Successfully stored note for ${datekey} in local storage!`);
            return JSON.parse(returnedJsonDelta);
        }
    });
}

function fetchNoteSynced(datekey) {
    
    chrome.storage.sync.get([datekey], function(returnedJsonDelta) {
        if (chrome.runtime.lastError) {
            console.error(`Error retrieving note for ${datekey} from synced storage`);
            return {'error': `failed to store ${datekey} in synced storage.`};
        } else {
            console.log(`Successfully stored note for ${datekey} in synced storage!`);
            return JSON.parse(returnedJsonDelta);
        }
    });
}

function deleteNote(datekey) {

    let successfulDelete = true;

    chrome.storage.local.remove([datekey], function() {
        if (chrome.runtime.lastError) {
            console.error(`Error removing note for ${datekey} from local storage.`);
            successfulDelete = false;
        } else {
            console.log(`Successfully removed note for ${datekey} from local storage!`);
        }
    });

    chrome.storage.sync.remove([datekey], function() {
        if (chrome.runtime.lastError) {
            console.error(`Error removing note for ${datekey} from synced storage.`);
            successfulDelete = false;
        } else {
            console.log(`Successfully removed note for ${datekey} from synced storage!`);
        }
    });

    return successfulDelete;
}

function clearCalendar() {

    let successfulClear = true;

    chrome.storage.local.clear(function() {
        if (chrome.runtime.lastError) {
            console.error("Error clearing local storage.");
            successfulClear = false;
        } else {
            console.log("Succesfully cleared local storage.");
        }
    });

    chrome.storage.sync.clear(function() {
        if (chrome.runtime.lastError) {
            console.error("Error clearing synced storage.");
            successfulClear = false;
        } else {
            console.log("Succesfully cleared synced storage.");
        }
    });

    return successfulClear;
}