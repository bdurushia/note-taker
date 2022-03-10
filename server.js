// Require route modules
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes/index');
const express = require('express');
const path = require('path');
// Set up the Server with Express
const app = express();
const PORT = process.env.PORT || 3001;
// Parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// Parse incoming JSON data
app.use(express.json());
// Use Middleware to access static files in Public Folder
app.use('/', express.static(path.join(__dirname, '/public'))); //Had issues with writing this as app.use(express.static('public)); and so must be written as current setup otherwise the assets/CSS and assets/JS won't route properly 
// Use Routes from route folder
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);
// Run server on PORT
app.listen(PORT, function() {
    console.log('Listening on PORT ' + PORT);
});