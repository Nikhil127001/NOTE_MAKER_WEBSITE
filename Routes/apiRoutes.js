const express = require('express');
const app = express();
const UserRoutes = require('./userRoutes');
const NotesRoutes = require('./noteRoutes');
app.use('/userRoutes', UserRoutes);
app.use('/userRoutes', NotesRoutes);
module.exports = app;
