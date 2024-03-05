import Delta from 'quill-delta';
import { writeNote,fetchNote, removeNote } from './communicators.js';


export function getSpecificNote(date){
    console.log("getSpecificNote called with ${date}\n");
    fetchNote()
}


export function getValidDates(date){

}