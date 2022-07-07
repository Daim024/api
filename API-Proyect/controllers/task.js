const mongoose = require('mongoose');
const User = require('../models/user');
const Task = require('../models/task');

const addTask = (req, res) => {
    Task.create(req.body)
    .then( dbTask => {
        return User.findOneAndUpdate({ _id: req.body.id }, { $push: { task: dbTask._id }}, { new: true});
    })
    .then( dbUser => {
        res.status(200).json(dbUser);
    })
    .catch( err => {
        res.status(400).send(err.message);
    })
}

const getUserTasks = (req, res) => {
    User.findOne({ username: req.params.id})
   // User.findOne({ _id: req.body.id})
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