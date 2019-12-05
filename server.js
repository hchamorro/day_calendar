// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 8000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(express.static("assets"));
app.use(express.static("js"));

// data
const rawData = fs.readFileSync("db.json");
const data = JSON.parse(rawData);
let noteId = 1;
//routes

//get
//api
app.get("/api/notes", (req, res) => {
  return res.json(data);
});
// get one obj from api
app.get("api/notes/:id", (req, res) => {
  const chosen = req.params.id;
  let data = characters.filter(obj => {
    return obj.routeName === chosen;
  });

  if (data.length) {
    return res.json(data[0]);
  }
  return res.send("no note");
});

//html
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// //post
// app.post("/api/notes", (req, res) => {
//   // req.body.id = noteId++;
//   const note = req.body;
//   console.log(note);
//   fs.appendFileSync("./db.json", note);
//   res.json(true);
// });
//POST to db
app.post("/api/notes", (req, res) => {
  const newNote = req.body;
  const db = fs.readFile(__dirname + "/db/db.json", (err, data) => {
    const notes = JSON.parse(data);
    notes.push(newNote);
    res.json(notes);
    console.log("new notes db is", notes);
    fs.writeFile(__dirname + "/db/db.json", JSON.stringify(data), err => {
      if (err) {
        console.error(err);
        return;
      }
    });
  });
});

//listen
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
