const EventController = require('../controllers/event')
const express = require('express');
const router = express.Router();

router.post('/', EventController.addEvent); //id usuer

router.get('/:id', EventController.getEvent); // id user

router.put('/', EventController.updateEvent); //id note

router.delete('/', EventController.deleteEvent); //id note

module.exports = router;