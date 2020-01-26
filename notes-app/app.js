/*
// file system
const fs = require("fs"); //require is for loading core node module

//fs.writeFileSync("Notes.txt", "hello ,lets practice nodejs");

fs.appendFileSync("Notes.txt", ". Its always fun to learn new things");
*/

/*
const add = require("./utils.js"); //loading other js file
//console.log(add);
const sum = add(3, 4);
console.log(sum);
*/

const notes = require("./notes.js");
const chalk = require("chalk");
const yargs = require("yargs");

//const msg = getNotes();
//console.log(msg);
//console.log(process.argv);
yargs.version("1.1.0");

//create add command
yargs.command({
  command: "add",
  describe: "adding a note",
  builder: {
    //builder are used to add option for the command
    title: {
      describe: "Note title",
      demandOption: true, //for making it required
      type: "string"
    },
    body: {
      describe: "note body",
      demandOption: true,
      type: "string"
    }
  },
  handler(argv) {
    //handler is used to instract the command what to do
    notes.addNote(argv.title, argv.body);
  }
});

//create remove command
yargs.command({
  command: "remove",
  describe: "remove a note",
  builder: {
    title: {
      describe: "title to delete",
      demandOption: true,
      type: "string"
    }
  },
  handler(argv) {
    notes.removeNote(argv.title);
  }
});

//create list command
yargs.command({
  command: "list",
  describe: "lists in the notes",
  handler() {
    notes.listNotes();
  }
});

//create read command
yargs.command({
  command: "read",
  describe: "read the notes",
  builder: {
    title: {
      describe: "note title",
      demandOption: true,
      type: "string"
    }
  },
  handler(argv) {
    notes.readNotes(argv.title);
  }
});

//console.log(yargs.argv);
yargs.parse();
