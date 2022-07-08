//Importing dependency
const mongoose = require('mongoose');
const User = require('../models/user');
const Task = require('../models/task');

//Adding function to add a task by entering the description parameter, and printing a unique id for each task
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

////Function to display the saved data
//And print the id of the created task
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

//Adding a function to update the description parameter and at the end it prints that it was updated correctly
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

//Function to delete the task by entering the unique id of the 
//task and prints with a was deleted correctly
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

//To export the functions
module.exports = { addTask, getUserTasks,  updateTask, deleteTask}