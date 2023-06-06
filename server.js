// dependencies
var express = require("express");
var path = require("path");
var fs = require("fs");
var database = require("./db/db.json");
const { v4: uuidv4 } = require('uuid')
// set up express
var app = express();
var PORT = process.env.PORT || 3000;

// handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes/Redirects

// for the css & javascript
app.use(express.static('public'));

// notes.html
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

// api/notes display all notes
app.get("/api/notes", function(req, res) {
    res.json(database);
  });

//index.html
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});


// post api/notes
app.post("/api/notes", function(req, res){
    var newNote = req.body;
    let noteID = uuidv4()
    newNote.id = noteID;
    database.push(newNote);

    fs.writeFile("./db/db.json", JSON.stringify(database), function(err){
    if (err) throw err;
    res.json("true");
    })

});

// api/delete/notes
app.delete("/api/notes/:id", function(req, res) {
    var id = req.params.id;
    for (var i = 0; i < database.length; i++) {
        if (database[i].id === id) {
          database.splice(i,1);
        }
    }
    fs.writeFile("./db/db.json", JSON.stringify(database), function(err){
        if (err) throw err;
       res.json("true");
})
});


// start server
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT)
});