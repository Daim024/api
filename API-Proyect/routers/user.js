const UserController = require('../controllers/user')
const express = require('express');
const router = express.Router();

router.put('/:id', UserController.updateUser); // id user + body
router.delete('/:id', UserController.deleteUser); // id user + body
module.exports = router;