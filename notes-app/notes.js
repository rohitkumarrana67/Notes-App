const fs = require("fs");
const chalk = require("chalk");

const getNotes = function() {
  return "Yours Notes...";
};

//for adding notes
const addNote = (title, body) => {
  const notes = loadNotes(); // first we load already existing data

  //checking for the alraedy the title is present
  const dublicatenotes = notes.filter(note => note.title === title);
  //finding the first occurence of titie
  const dublicatenote = notes.find(note => note.title === title);
  /* const dublicatenotes=notes.filter(function(note)
  {
    return note.title==title;
  });
  */

  //second we push data ,when no dublicates are found
  if (!dublicatenote) {
    notes.push({
      title: title,
      body: body
    });
    saveNotes(notes); //third then we save the data
    console.log(chalk.green.bold("New Note is SAVED!!!!"));
  } else {
    console.log(chalk.red.bold("title is already taken"));
  }
};

//removing notes
const removeNote = title => {
  const notes = loadNotes();
  const dublicatenotes = notes.filter(note => note.title != title);
  if (dublicatenotes.length === notes.length) {
    console.log(chalk.red.bold("title does not exist"));
  } else {
    console.log(
      chalk.green.bold("Note with the title- " + title + " is deleted")
    );
    saveNotes(dublicatenotes);
  }
};

//list notes

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.red.bold("LISTS OF NOTES ARE:"));
  notes.forEach(list => {
    console.log(chalk.green(list.title));
  });
};

//read notes

const readNotes = title => {
  const notes = loadNotes();
  //finding notes
  const matchNote = notes.find(note => note.title === title);
  if (matchNote) {
    console.log(chalk.green.bold("TITLE= " + matchNote.title));
    console.log(chalk.yellow.bold("BODY:-"));
    console.log(chalk.blue(matchNote.body));
  } else {
    console.log(chalk.red.bold("SORRY NO SUCH NOTES FOUND"));
  }
};

//rewriting to the notes.json after pushing new values
const saveNotes = notes => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

// loads the notes
const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json"); //exception handling when no such file exist
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNotes: readNotes
};
