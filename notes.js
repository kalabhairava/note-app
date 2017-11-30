//---------------------------------------
// Dependencies
//---------------------------------------
const fs = require("fs");

const notesFile = "notes.json";

/**
 * Fetches all the existing notes
 * @returns {Array} an array of notes
 */
const fetchNotes = () => {
  try {
    // throws an error if the file does not exist, or if the file has invalid data
    return JSON.parse(fs.readFileSync(notesFile));
  } catch (error) {
    return [];
  }
};

/**
 * Saves notes to a file
 * @param {Array} notes An array of notes 
 */
const saveNotes = notes => {
  fs.writeFileSync(notesFile, JSON.stringify(notes));
};

/**
 * Adds a new note
 * @param {string} title title of the note
 * @param {string} body body of the note
 * @returns {Object} the note added 
 */
const addNote = (title, body) => {
  const note = {
    title,
    body
  };

  const notes = fetchNotes();
  const duplicateNotes = notes.filter(prevNote => prevNote.title === title);

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
  return fetchNotes();
};

/**
 * Returns the note with the given title
 * @param {string} title the title of the note to be retrieved
 * @returns {Object} the note retrieved
 */
const getNote = title => {
  const notes = fetchNotes();
  const filteredNotes = notes.filter(note => note.title === title);
  return filteredNotes[0]; // returns undefined if filteredNotes is empty (`undefined` is returned when you access non-existent value of an array)
};

/**
 * Removes the note with the given title
 * @param {string} title the title of the note to be removed
 * @returns {boolean} true if the note was removed, false if not.
 */
const removeNote = title => {
  const notes = fetchNotes();
  const filteredNotes = notes.filter(note => note.title !== title);
  saveNotes(filteredNotes);

  return notes.length !== filteredNotes.length; // returns true if the note was removed
};

/**
 * logs the given note
 * @param {Object} note the note to be logged
 */
const logNote = note => {
  debugger;
  console.log("\n--------------------------------------------");
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
  console.log("--------------------------------------------");
};

module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote,
  logNote
};
