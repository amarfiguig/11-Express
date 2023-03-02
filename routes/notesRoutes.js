const router = require("express").Router();
const { readFromFile, readAndAppend, writeToFile } = require("../helpers/fsUtils");
const uuid = require("../helpers/uuid");

// GET Route for retrieving all the tips
router.get("/", (req, res) => {
  console.log("getting notes");
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new UX/UI tip
router.post("/", (req, res) => {
  console.log("posting note");
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    readAndAppend(newNote, "./db/db.json");
    res.json(`Note added successfully 🚀`);
  } else {
    res.error("Error in adding note");
  }
});

// DELETE Route for deleting the note
router.delete("/:id", (req, res) => {
  const noteId = req.params.id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Make a new array of all notes except the one with the ID provided in the URL
      const result = json.filter((note) => note.id !== noteId);

      // Save that array to the filesystem
      writeToFile('./db/db.json', result);

      // Respond to the DELETE request
      res.json(`Item ${noteId} has been deleted 🗑️`);
    });
});

module.exports = router
