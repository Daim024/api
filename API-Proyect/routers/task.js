const TaskController = require('../controllers/task')
const express = require('express');
const router = express.Router();

router.post('/', TaskController.addTask); //id de lista

router.get('/:id', TaskController.getUserTasks); // id de usuario

router.put('/', TaskController.updateTask); //id de tarea

router.delete('/', TaskController.deleteTask); //id de tarea

module.exports = router;