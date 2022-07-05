const NoteController = require('../controllers/note')
const express = require('express');
const router = express.Router();

router.post('/', NoteController.addNote); //id module

router.get('/:id', NoteController.getUserNotes); // id user

router.put('/', NoteController.updateNote); //id note

router.delete('/', NoteController.deleteNote); //id note

module.exports = router;