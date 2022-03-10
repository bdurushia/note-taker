const router = require('express').Router();
const path = require('path');
const fs = require('fs');
const db = require('../../db/db.json');
const ShortUniqueId = require('short-unique-id');

function createNewNote(body, notesArray){
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../../db/db.json'),
        JSON.stringify(notesArray, null, 2)
    );

    return note;
}

function deleteNote(noteId, notesArray){
    console.log("This text");
    console.log(noteId);
    
    let filtered = notesArray.filter(function(item) {
        return item.id !== noteId;
    })

    fs.writeFileSync(
        path.join(__dirname, '../../db/db.json'),
        JSON.stringify(filtered, null, 2)
    );

    return ;
}

// Get Request to retrieve saved notes - API Route
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../../db/db.json'));
});

// Post request to handle saving notes in the app to the database - API Route
router.post('/notes', (req, res) => {
    let uid = new ShortUniqueId();
    console.log(uid().toString());
    req.body.id = uid().toString();

    let note = createNewNote(req.body, db)

    res.json(note);
})

router.delete('/notes/:id', (req, res) => {
    let noteId = (req.params.id).toString();
    console.log(noteId);

    let note = deleteNote(noteId, db);

    res.json(note);
});

module.exports = router;