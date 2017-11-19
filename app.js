console.log("Starting app.js");

//---------------------------------------
// Built in modules
//---------------------------------------
const fs = require("fs");

//---------------------------------------
// 3rd Party modules
//---------------------------------------

//---------------------------------------
// Internal dependencies
//---------------------------------------
const notes = require("./notes");

// process object contains the list of all the arguments passed to the app
console.log(process.argv);
// argv[0] => path to the node binary
// argv[1] => path to the file executed
// argv[2...n] => arguments passed to the node app

// grab the command
const command = process.argv[2];
console.log(`Command: ${command}`);

// Take action based on the user command
// The user passed command via comamnd line => e.g. node app.js list
if (command === "add") {
  console.log("Adding new note");
} else if (command === "list") {
  console.log("Listing all notes");
} else if (command === "read") {
  console.log("Fetching note");
} else if (command === "remove") {
  console.log("Removing that sucker");
} else {
  console.log("Command not recognized");
}

// There are different ways of passing arguments via CLI
// 1. node app.js list => Normal way, no worries
// Passing command line arguments as key-value pairs
// 2. node app.js --title=boom => process.argv contains '--title=boom' as an argument, which is not what we intended
// 3. node app.js --title boom => process.argv contains 'title', and 'boom' as separate arguments, which again, was not intended.
// 4. node app.js --title="Boom Boom" => Using quotes to pass values with spaces. Windows creates problems if you use single quotes.
//                                process.argv contains '--title="Boom Boom" ' as a single argument. Not as intended, again.

// To fix all our woes with reading command line arguments, use `yargs`, a 3rd party npm module.
