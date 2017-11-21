console.log("Starting notes.js");

const addNote = (title, body) => {
  console.log("Adding Note: ", title, body);
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
