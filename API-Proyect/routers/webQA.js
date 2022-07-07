const WebQAController = require('../controllers/webQA')
const express = require('express');
const router = express.Router();

router.post('/', WebQAController.addWebQA); //id de usuario
router.get('/:id', WebQAController.getUserWebQA); // id username
router.put('/', WebQAController.updateWebQA); //id de pregunta
router.delete('/', WebQAController.deleteWebQA); //id de pregunta

module.exports = router;
