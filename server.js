const express = require("express");
const path = require("path");
const fs = require("fs");
// initiate express server and add a port listener
const app = express();
const PORT = process.env.PORT || 8080;
// notes data goes in an array
let noteData = [];
// express calls
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "Develop/public")));


app.post("/api/notes", function(req, res) {
  try {
    // reads the json file
    noteData = fs.readFileSync("./Develop/db/db.json", "utf8");
    console.log(noteData);
    // parse the data to create an array of objects
    noteData = JSON.parse(noteData);
    req.body.id = noteData.length;
    noteData.push(req.body); 
    noteData = JSON.stringify(noteData);
    fs.writeFile("./Develop/db/db.json", noteData, "utf8", function(err) {
      if (err) throw err;
    });
    res.json(JSON.parse(noteData));
  } catch (err) {
    console.error(err);
  }
});

app.get("/api/notes", function(err, res) {
  try {
    noteData = fs.readFileSync("Develop/db/db.json", "utf8");
    // parse the data to create an array of objects
    noteData = JSON.parse(noteData);

    // error handling
  } catch (err) {
    console.log("\n error (in app.get.catch):");
    console.log(err);
  }
  res.json(noteData);
});


app.delete("/api/notes/:id", function(req, res) {
  try {
    //  reads the json file
    noteData = fs.readFileSync("./Develop/db/db.json", "utf8");
    // parse the data to get an array of the objects
    noteData = JSON.parse(noteData);
    // delete the old note from the array on note objects
    noteData = noteData.filter(function(note) {
      return note.id != req.params.id;
    });
    noteData = JSON.stringify(noteData);
    fs.writeFile("./Develop/db/db.json", noteData, "utf8", function(err) {
      if (err) throw err;
    });
    res.send(JSON.parse(noteData));
  } catch (err) {
    console.log(err);
  }
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "Develop/public/notes.html"));
});
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "Develop/public/index.html"));
});

app.get("/api/notes", function(req, res) {
  return res.sendFile(path.json(__dirname, "Develop/db/db.json"));
});

app.listen(PORT, function() {
  console.log("SERVER IS LISTENING: " + PORT);
});

