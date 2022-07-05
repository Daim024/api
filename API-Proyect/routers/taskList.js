const TaskListController = require('../controllers/taskList')
const express = require('express');
const router = express.Router();

router.post('/', TaskListController.addTaskList); //id user + body
router.put('/', TaskListController.updateTaskList); //id list + body
router.delete('/', TaskListController.deleteTaskList); //id list

module.exports = router;