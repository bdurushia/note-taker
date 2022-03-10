const router = require('express').Router();
const path = require('path');
const fs = require('fs');
const db = require('../../db/db.json');

// NPM Package that generates a unique ID
const ShortUniqueId = require('short-unique-id');

// Handle creating a new note, pushing to database
function createNewNote(body, notesArray){
    const note = body;
    notesArray.push(note);
    // write new note to database JSON file
    fs.writeFileSync(
        path.join(__dirname, '../../db/db.json'),
        JSON.stringify(notesArray, null, 2)
    );

    return note;
}

// Handle deleting a note by targeting it's uniqueID
function deleteNote(noteId, notesArray){
    // Filter through database JSON array, return array minus the item with the selected ID
    let filtered = notesArray.filter(function(item) {
        return item.id !== noteId;
    })
    // write new notes array to JSON in database
    fs.writeFileSync(
        path.join(__dirname, '../../db/db.json'),
        JSON.stringify(filtered, null, 2)
    );
    return;
}

// Get Request to retrieve saved notes - API Route
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../../db/db.json'));
});

// Post request to handle saving notes in the app to the database - API Route
router.post('/notes', (req, res) => {
    // assign a uniquely generated ID to new note, e.g. { "id": "iSclPV" }
    let uid = new ShortUniqueId();
    req.body.id = uid().toString();

    // pass through selected note and db array to create new note
    let note = createNewNote(req.body, db)

    res.json(note);
})

router.delete('/notes/:id', (req, res) => {
    // get slected notes' ID
    let noteId = (req.params.id).toString();
    // use selected note id in delete function
    let note = deleteNote(noteId, db);

    res.json(note);
});

module.exports = router;