console.log("Starting notes.js");

//---------------------------------------
// Built in modules
//---------------------------------------
const fs = require("fs");

const addNote = (title, body) => {
  console.log("Adding Note: ", title, body);

  // an array of notes
  let notes = [];

  // new note to be added
  const note = {
    title,
    body
  };

  // Get the previous notes
  // Wrapping this in try-catch block, as fs.readFileSync() will throw an error the first time it is run since the file notes.json does not exist at that point
  try {
    // throws an erro if the file does not exist, or if the file has invalid data
    notes = JSON.parse(fs.readFileSync('notes.json'));
  } catch (error) {
    // Do nothing. We have already initialized the notes array to an empty array
    // If the file doesn't exist, or has invalid data, notes array will be empty
  }

  // Make sure that no duplicate notes are saved (duplicate notes => notes with same title)
  // contains all the duplicate notes
  const duplicateNotes = notes.filter((prevNote) => prevNote.title === title);

  if (duplicateNotes.length === 0) {
    notes.push(note);

    // saves notes to a file
    fs.writeFileSync('notes.json', JSON.stringify(notes))
  } else {
    console.log(`Note with the title ${title} already exists. Please add the note with a new title`);
  }
};

const getAll = () => {
  console.log("Getting all notes");
};

const getNote = title => {
  console.log("Getting note: ", title);
};

const removeNote = title => {
  console.log("Removing this sucker: ", title);
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
