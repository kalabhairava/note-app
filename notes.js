console.log("Starting notes.js");

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
    console.log('Error reading file: File does not exist, or it contains invalid data');
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

  // contains all the duplicate notes
  const duplicateNotes = notes.filter((prevNote) => prevNote.title === title);

  // Make sure that no duplicate notes are saved (duplicate notes => notes with same title)
  if (duplicateNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);
    console.log('Note added:');
    console.log('-------------');
    console.log(`Title: ${title}`);
    console.log(`Body: ${body}`);
  } else {
    console.log(`Note with the title ${title} already exists. Please add the note with a new title`);
  }
};

/**
 * Returns all the existing notes
 * @returns {Array} an array of all the existing notes
 */
const getAll = () => {
  console.log("Getting all notes");
};

/**
 * Returns the specified note
 * @param {string} title the title of the note to be retrieved
 */
const getNote = (title) => {
  console.log(`Getting this sucker: ${title}`);
};

/**
 *Removes the specified note
 * @param {string} title the title of the note to be removed
 */
const removeNote = (title) => {
  const notes = fetchNotes();
  const filteredNotes = notes.filter((note) => note.title !== title);
  saveNotes(filteredNotes);

  if (notes.length !== filteredNotes.length) {
    console.log(`Removed this sucker: ${title}`);
  } else {
    console.log(`Note ${title} was not found`);
  }
};

// Different ways of exporting modules
// 1. Set properties on module.exports: e.g. module.exports.addNote = () => {}
// 2. Set module.exports to an object with properties we want to export: e.g. module.exports = {}
// 3. Assign a function to  module.exports: e.g. module.exports = addNote;

module.exports = {
  addNote, // ES6 syntax. Identical to addNote: addNote in ES5 syntax. When the key and value names of a property are same, you can just use the key name.
  getAll,
  getNote,
  removeNote
};
