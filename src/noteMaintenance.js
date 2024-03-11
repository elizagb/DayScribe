/* CS 422 Winter 2024
 * noteMaintenance.js
 * Created by Nathan Koga on 3/3/2024
 * Last modified 3/10/2024
 * 
 * Contains an intermediary function that facilitate requests from the interface modules
 * to write to and delete from the note storage.
 * 
 * noteWriteRequest: Given a specific date string and a reference to the Quill Editor, 
 * converts the date string to the note storage module's preferred format,
 * and writes the editor data (stored as a Delta object) into the note storage OR deletes.
 */

import { writeNote,removeNote } from './communicators.js';
import {formatDelta} from './eventHandlerHelpers.js'


export async function noteWriteRequest(date, quillEditor){
  /* Takes a date in "MM/DD/YYYY", converts it to "MMDDYYYY" and calls writeNote
   * using the reformatted date as a key, and the Delta stored in the quillEditor.
   * If the note is non-empty, it saves the note to the note storage. Otherwise, it removes the
   * note assocation using the note storage module's removeNote() function.
   * 
   * Args:
   *    date (str): The date (in MM/DD/YYYY) to use when performing any "write" operations to the note storage.
   *    quillEditor (ref component): A reference object to the Quill Editor passed from the Text Wrapper Interface.
   */

  // pulls the raw text from the editor (for determining if it's non-empty)
  let currentText = await quillEditor.current.getEditor().getText();
  
  // reformats the text from Text Wrapper Interface-preferred format to note storage-preferred format
  let formattedDate = date.replaceAll("/", ""); 

  //  for populated notes, takes the delta object from the reference to the Quill Editor
  // and uses the writeNote() function from the note storage module. 
  if (currentText.length > 1){
    let currentDelta = await quillEditor.current.getEditor().getContents();
    
    console.log(`Note to write into storage: ${formatDelta(currentDelta)}\n`);
    writeNote(formattedDate, currentDelta);
  }

  // for empty notes, deletes the association from the note storage.
  else {
    console.log("Empty note: Delete Association");
    removeNote(formattedDate);
  }

}
