const express = require('express');
const path = require('path');
const fs = require('fs');
// const util = require('util`');

// Set up Server
const app = express();
const PORT = process.env.PORT || 3001;

// Handling asynchronous items

// get route
// app.get('/', (req, res) => {
    
// })

// Setup HTML Routes
app.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});


app.listen(PORT, function() {
    console.log('Listening on PORT ' + PORT);
});