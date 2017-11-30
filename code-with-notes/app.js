//---------------------------------------
// Built in modules
//---------------------------------------
const fs = require("fs");

//---------------------------------------
// 3rd Party modules
//---------------------------------------
const yargs = require("yargs");

//---------------------------------------
// Internal dependencies
//---------------------------------------
const notes = require("./notes");

//---------------------------------------
// Private variables
//---------------------------------------
const titleConfigForYargs = {
  describe: 'Title of note', // description of the argument
  demand: true,              // marks the argument as required. false by default. If the argument is missing, logs => Missing required argument: title 
  alias: 't'                 // shortcut for arguments
};

const bodyConfigForYargs = {
  describe: 'Body of note',
  demand: true,
  alias: 'b'
}

// yargs stores the arguments passed to the app in `yargs.argv`
// const argv = yargs.argv;
// console.log(`yargs.argv ==> ${argv}`);
// logs yargs.argv ==> [object Object], which is not what I expected. When you use a variable inside string templates, I think it converts it into string first and then prints it.
// When you use a variable inside template literal, it prints variable.toString() in place of ${var}
// IMPORTANT: Careful while printing objects/arrays inside a template literal, it'll bite you.

// console.log("yargs.argv ==> ", argv);
// logs yargs.argv ==>  { _: [ 'add', 'list', 'remove' ], '$0': 'app.js' }
// yargs.argv is an object with 2 properties
// 1. _ (underscore) => an array of arguments passed
// 2. $0 => name of the file executed

// Configuring yargs
// The above usage of yargs is the old unconfigured one
const argv = yargs
  .command('add', 'Add a new note', { // takes 3 arguments => name of the command, a short description, and a config object
    title: titleConfigForYargs,
    body: bodyConfigForYargs
  })
  .command('list', 'List all the notes', {})
  .command('read', 'Read a note', {
    title: titleConfigForYargs
  })
  .command('remove', 'Remove a note', {
    title: titleConfigForYargs
  })
  .help()   // to enable --help flag. 
  // node app.js --help logs
  // Commands:
  // add  Add a new note

  // Options:
  // --help  Show help[boolean]
  .argv;

// process object has a property called `argv` which contains a list of all the arguments passed to the app
// console.log("process.argv ==> ", process.argv);
// argv[0] => path to the node binary
// argv[1] => path to the file executed
// argv[2...n] => arguments passed to the node app

// grab the command
const command = argv._[0]; // process.argv[2];
// console.log(`Command: ${command}`);

// Take action based on the user command
// The user passes command via comamnd line => e.g. node app.js list
if (command === "add") {
  const note = notes.addNote(argv.title, argv.body);

  if (note) {
    console.log('Note added:');
    notes.logNote(note);
  } else {
    console.log(`Note with the title ${argv.title} already exists. Please add the note with a new title`);
  }
} else if (command === "list") {
  const noteList = notes.getAll();

  if (noteList.length > 0) {
    noteList.forEach((note) => notes.logNote(note));
  } else {
    console.log('No notes found. Time to add some notes!');
  }
} else if (command === "read") {
  const note = notes.getNote(argv.title); // returns a boolean value
  if (note) {
    console.log('Note fetched:');
    notes.logNote(note);
  } else {
    console.log(`Note ${argv.title} was not found`);
  }
} else if (command === "remove") {
  const noteRemoved = notes.removeNote(argv.title);

  if (noteRemoved) {
    console.log(`Removed this sucker: ${argv.title}`);
  } else {
    console.log(`Note ${argv.title} was not found`);
  }
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
// TIP: Always go through the docs before you use a 3rd party module to understand what it's all about
// yargs has an internal parser that parses arguments for us.
// If the argument starts with '--' (--key=value): yargs adds a property 'key: value' to the argv object
// If the argument doesn't start with '--', yargs adds the argument to the _ array
// When to use --key=value type of arguments? => When you want to send variable data to the app. e.g. title and body of a note
// when you pass:
// --title="boom" => yargs.argv ==>  { _: [ 'add' ], title: 'boom', '$0': 'app.js' } // It adds title as a property of argv object
// --title="boom boom" => yargs.argv ==>  { _: [ 'add' ], title: 'boom boom', '$0': 'app.js' }
// --title "boom boom" => yargs.argv ==>  { _: [ 'add' ], title: 'boom boom', '$0': 'app.js' }

// process.argv in the same case prints =>
// [ '/usr/bin/node',
// '/home/shiva/projects/note-app/app.js',
// 'add',
// '--title',
// 'boom boom' ]

// TypeError: thrown when you try to run an operation which is not supported by that type.
// e.g. Trying to invoke a variable which is not a function
// const a = 10;
// a();
