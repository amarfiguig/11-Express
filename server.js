const express = require("express");
const fs = require('fs');
const path = require('path');

// Importing express to set up the server
const app = express();

// Setting the initial port for the server
const PORT = process.env.PORT || 3001;
const allNotes = require('./db/db.json');

// Enabling Express to parse incoming data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Importing API routes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use('/api', apiRoutes);

// Listening on the specified port
app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
});
