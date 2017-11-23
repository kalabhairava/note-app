//---------------------------------------
// Built in modules
//---------------------------------------
const fs = require("fs");

//---------------------------------------
// Private variables
//---------------------------------------
const notesFile = 'notes.json';

//---------------------------------------
// Private functions
//---------------------------------------

/**
 * Fetches all the existing notes
 * @returns {Array} an array of notes
 */
const fetchNotes = () => {

  let notes = [];

  // Get the previous notes
  // Wrapping this in try-catch block, as fs.readFileSync() will throw an error the first time it is run since the file notes.json does not exist at that point
  try {
    // throws an error if the file does not exist, or if the file has invalid data
    notes = JSON.parse(fs.readFileSync(notesFile));
  } catch (error) {
    // commenting this log as this sucker started printing annoying message when the app runs for the first time
    // console.log('Error reading file: File does not exist, or it contains invalid data');
  }

  return notes;
};

/**
 * Saves notes to a file
 * @param {Array} notes An array of notes 
 */
const saveNotes = (notes) => {
  // saves notes to a file
  fs.writeFileSync(notesFile, JSON.stringify(notes));
};


//---------------------------------------
// Public methods
//---------------------------------------

/**
 * Adds a new note
 * @param {string} title title of the note
 * @param {string} body body of the note
 */
const addNote = (title, body) => {

  // new note to be added
  const note = {
    title,
    body
  };

  const notes = fetchNotes();

  // get all the duplicate notes
  const duplicateNotes = notes.filter((prevNote) => prevNote.title === title);

  // Make sure that no duplicate notes are saved (duplicate notes => notes with same title)
  if (duplicateNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  } else {
    return null;
  }
};

/**
 * Returns all the existing notes
 * @returns {Array} an array of all the existing notes
 */
const getAll = () => {
  // console.log("Getting all notes");
  return fetchNotes();
};

/**
 * Returns the note with the given title
 * @param {string} title the title of the note to be retrieved
 */
const getNote = (title) => {
  // console.log(`Getting this sucker: ${title}`);
  const notes = fetchNotes();
  const filteredNotes = notes.filter((note) => note.title === title);
  return filteredNotes[0]; // returns undefined if filteredNotes is empty (`undefined` is returned when you access non-existent value of an array)
};

/**
 * Removes the note with the given title
 * @param {string} title the title of the note to be removed
 */
const removeNote = (title) => {
  const notes = fetchNotes();
  const filteredNotes = notes.filter((note) => note.title !== title);
  saveNotes(filteredNotes);

  return notes.length !== filteredNotes.length; // returns true if the note was removed
};

// D.R.Y => Don't Repeat Yourself
// IMPORTANT: If you find yourself copy-pasting code, perhaps it's time to create a functin for it
// Created separate function to print a note as the same functionality was repeated in multiple places.

/**
 * logs the given note
 * @param {Object} note the note to be logged
 */
const logNote = (note) => {
  debugger;
  console.log('\n--------------------------------------------');
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
  console.log('----------------------------------------------');
};

// Different ways of exporting modules
// 1. Set properties on module.exports: e.g. module.exports.addNote = () => {}
// 2. Set module.exports to an object with properties we want to export: e.g. module.exports = {}
// 3. Assign a function to  module.exports: e.g. module.exports = addNote;

module.exports = {
  addNote, // ES6 syntax. Identical to addNote: addNote in ES5 syntax. When the key and value names of a property are same, you can just use the key name.
  getAll,
  getNote,
  removeNote,
  logNote
};
