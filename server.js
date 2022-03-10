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
app.use('/', express.static(path.join(__dirname, '/public')));
// Use Routes
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);
// Run server on PORT
app.listen(PORT, function() {
    console.log('Listening on PORT ' + PORT);
});