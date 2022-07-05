const mongoose = require('mongoose');
const User = require('../models/user');
const TaskList = require('../models/taskList');
const Task = require('../models/task');

const addTaskList = (req, res) => {
    TaskList.create(req.body)
    .then( dbTaskList => {
        return User.findOneAndUpdate({ _id: req.body.id}, { $push: { taskLists: dbTaskList._id }} , { new: true});
    })
    .then( dbUser => {
        res.status(200).json(dbUser);
    })
    .catch( err  => {
        res.status(400).send(err.message);
    });
}


const updateTaskList = (req, res) => {
    TaskList.findOneAndUpdate({ _id: req.body.id }, { title: req.body.title })
    .then( () => {
        TaskList.findOne({ _id: req.body.id})
        .then( updatedTaskList => { 
            if(updatedTaskList == null){
                return res.status(400).send({
                    message: "TaskList not found"});    
            }else{
                return res.status(200).send({
                    message: "TaskList successfully updated"});
            }
        })
        .catch( err => { console.log("server error")});
    })
    .catch( err => {
        res.status(500).send(err);
    });
}

const deleteTaskList = (req, res) => {
    TaskList.findOneAndDelete({ _id: req.body.id })
    .then( deletedTaskList => {
        if(deletedTaskList == null){
            return res.status(400).send({
                message: "TaskList not found"});
        }else{
            return res.status(200).send({
                message: "TaskList successfully deleted"});    
        }
    })
    .catch( err => {
        res.status(500).send(err.message);
    });
}

module.exports = { addTaskList, updateTaskList, deleteTaskList }
