const SecurityResponseController = require('../controllers/securityResponse')
const express = require('express');
const router = express.Router();

router.post('/', SecurityResponseController.addSecurityResponse); //id de usuario

router.get('/:id', SecurityResponseController.getUserSecurityResponse); // id de usuario

router.put('/', SecurityResponseController.updateSecurityResponse); //id

router.delete('/', SecurityResponseController.deleteSecurityResponse); //id 

module.exports = router;
