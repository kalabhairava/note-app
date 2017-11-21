// JSON: JavaScript Object Notation
// Why would you want to store data in JSON?
// JSON is text, so it is supported almost everywhere.

//---------------------------------------
// Converting objects to JSON string
//---------------------------------------
var obj = {
  name: "Andrew"
};

// JSON.stringify() returns the string representation of the argument passed to it
// From IntelliSense => Converts a JavaScript value to a JSON string
var stringObj = JSON.stringify(obj);

console.log(typeof stringObj);
// logs string

console.log(stringObj);
// logs {"name":"Andrew"} ==> notice that the key name is wrapped in quotes. That's a requirement of JSON. The strings have to be wrapped in double quotes, not single quotes.

//---------------------------------------
// Converting JSON string to JS object
//---------------------------------------

// wrap the JSON string in single quotes as the properties inside a JSON object have to be wrapped in double quotes
const personString = '{"name": "Andrew", "age": 25}';

// JSON.parse converts JSON string to a JS value
// From IntelliSense => converts JSON string to a object
const person = JSON.parse(personString);

// IMPORTANT: JSON.parse() does not support trailing commas
//
// both will throw a SyntaxError
// JSON.parse('[1, 2, 3, 4, ]');
// JSON.parse('{"foo" : 1, }');
// A reason to avoid trailing commas? and start prefixing commas? Something like:
// const obj = { a: 1
// , b: 2
// , c: 3}
// Prefiing commas provides cleaner git diffs, and doesn't throw an error while parsing with JSON.parse()

console.log(typeof person);
// logs object

console.log(person);
// logs { name: 'Andrew', age: 25 }

//-------------------------------------------------
// Reading a JSON file and parsing the string
//------------------------------------------------

const fs = require("fs");

const originalNote = {
  title: "Some title",
  body: "Some body"
};

// Convert the note into a JSON string
const originalNoteString = JSON.stringify(originalNote);

// takes 2 arguments => file name, and the contents of the file
// Use JSON file extension
// If the file doesn't exit, it will be created in the path provided
// If just file name is provided, it'll be created in the directory in which the file is run
// It will overwrite the file contents every time
fs.writeFileSync("notes.json", originalNoteString);

// Reading data from file
const noteString = fs.readFileSync("notes.json");

//console.log(noteString);
// logs originalNoteString

// parse JSON string into JS object
const note = JSON.parse(noteString);
console.log(note);
