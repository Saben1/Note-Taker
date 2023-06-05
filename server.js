const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve the notes.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
});

// Retrieve existing notes
app.get('/api/notes', (req, res) => {
  fs.readFile('./notes.json', 'utf8', (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

// Save new notes
app.post('/api/notes', (req, res) => {
  fs.readFile('./notes.json', 'utf8', (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data);
    const newNote = req.body;
    newNote.id = notes.length + 1;
    notes.push(newNote);
    fs.writeFile('./notes.json', JSON.stringify(notes), (err) => {
      if (err) throw err;
      res.json(newNote);
    });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
