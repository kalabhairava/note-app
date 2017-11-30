const fs = require("fs");
const yargs = require("yargs");
const notes = require("./notes");

const titleConfigForYargs = {
  describe: "Title of note",
  demand: true,
  alias: "t"
};

const bodyConfigForYargs = {
  describe: "Body of note",
  demand: true,
  alias: "b"
};

const argv = yargs
  .command("add", "Add a new note", {
    title: titleConfigForYargs,
    body: bodyConfigForYargs
  })
  .command("list", "List all the notes", {})
  .command("read", "Read a note", {
    title: titleConfigForYargs
  })
  .command("remove", "Remove a note", {
    title: titleConfigForYargs
  })
  .help()
  .alias("help", "h").argv;

// grab the command
const command = argv._[0];

if (command === "add") {
  const note = notes.addNote(argv.title, argv.body);

  if (note) {
    console.log("Note added:");
    notes.logNote(note);
  } else {
    console.log(
      `Note with the title ${argv.title} already exists. Please add the note with a new title`
    );
  }
} else if (command === "list") {
  const noteList = notes.getAll();

  if (noteList.length > 0) {
    noteList.forEach(note => notes.logNote(note));
  } else {
    console.log("No notes found. Time to add some notes!");
  }
} else if (command === "read") {
  const note = notes.getNote(argv.title);
  if (note) {
    console.log("Note fetched:");
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
