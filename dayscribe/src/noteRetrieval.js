
function getSpecificNote(date, direction=1){
    // encapsulate LeftArrow/RightArrow handleClick() functions?

    // enumerated values for direction: 0 is left, 1 is current, 2 is right?

    // linear probe until we hit a border condition
    // but if we do that, how will we make new notes for adjacent dates?


    // --> may want to make a function in communicators.js that sorts the databse by key, and
    // returns the first / last date
    // --> if a request goes past a border condition, return none (which should create a new note?)
    
    
    // in practical use, doesn't make much sense to have many of these intermediary functions
    // especially since the quill object exists in App.js already
    // ----> but if we can access that Quill object, we can abstact all in-line functions with
    //       functions from these helper modules
    // however getSpecificNote may be a worthwhile abstraction to clear up App.js

    // linear probe (to next day regardless of populated or not)
    // 

}

function getValidDates(date){
    // call fetchPopulatedDates()
    // convert date from unix epoch to a date-string:
    // format

}