const mongoose = require('mongoose');
const User = require('../models/user');
const TaskList = require('../models/taskList');
const Task = require('../models/task');

const addTask = (req, res) => {
    Task.create(req.body)
    .then( dbTask => {
        return TaskList.findOneAndUpdate({ _id: req.body.id }, { $push: { tasks: dbTask._id }}, { new: true});
    })
    .then( dbTask => {
        res.status(200).json(dbTask);
    })
    .catch( err => {
        res.status(400).send(err.message);
    })
}

const getUserTasks = (req, res) => {
    User.findOne({ username: req.params.id})
   // User.findOne({ _id: req.body.id})
    .populate({
        path: 'taskLists',
        populate: {
            path: 'tasks'
        }
    })
    .then( dbUser => {
        res.status(200).json(dbUser);
    })
    .catch( err => {
        res.status(400).send(err.message);
    });
}


const updateTask = (req, res) => {
    Task.findOneAndUpdate({ _id: req.body.id }, { title: req.body.title, status: req.body.status })
    .then( () => {
        Task.findOne({ _id: req.body.id})
        .then( updatedTask => { 
            if(updatedTask == null){
                return res.status(400).send({
                    message: "Task not found"});    
            }else{
                return res.status(200).send({
                    message: "Task successfully updated"});
            }
        })
        .catch( err => { console.log("server error")});
    })
    .catch( err => {
        res.status(500).send(err);
    })
}


const deleteTask = (req, res) => {
    Task.findOneAndDelete({ _id: req.body.id })
    .then( deletedTask => {
        if(deletedTask == null){
            return res.status(400).send({
                message: "Task not found"
            })
        } else{
            return res.status(200).send({
                message: "Task successfully deleted"
            })
        }
    })
    .catch( err => {
        res.status(500).send(err);
    })
}

module.exports = { addTask, getUserTasks,  updateTask, deleteTask}