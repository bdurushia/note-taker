const router = require('express').Router();
const path = require('path');
const fs = require('fs');


// Get Request to retrieve saved notes - API Route
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../../db/db.json'));
});

// Post request to handle saving notes in the app to the database - API Route
router.post('/notes', (req, res) => {
    let newNote = req.body;
    let noteList = JSON.parse(fs.readFileSync('../../db/db.json', 'utf8'));
    let noteLength = (noteList.length + 1).toString();

    newNote.id = noteLength;
    noteList.push(newNote);

    fs.writeFileSync('../../db/db.json', JSON.stringify(noteList));
    res.json(noteList);
});

router.delete('/notes/:id', (req, res) => {
    let noteList = JSON.parse(fs.readFileSync('../../db/db.json', 'utf8'));
    let noteId = (req.params.id).toString();

    noteList = noteList.filter(selected => {
        return selected.id != noteId;
    });

    fs.writeFileSync('../../db.json', JSON.stringify(noteList));
    res.json(noteList);
});

module.exports = router;