const express = require('express');
const routes = express.Router();
const {updateNote,createNote,deleteNote,getNotes, getnotesById} = require('../Controllers/NotesController');


routes.post('/createNote',createNote);
routes.delete('/deleteNote/:id',deleteNote);
routes.put('/updateNote/:id',updateNote);
routes.get('/getNotes',getNotes);
routes.get('/getNotesById/:id',getnotesById);

module.exports = routes;