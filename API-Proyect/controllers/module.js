//Importing dependency
const mongoose = require('mongoose');
const User = require('../models/user');
const Module = require('../models/module');
const Note = require('../models/note');

//Function to add a module where the title parameters are entered, and it will print the module with a unique id
const addModule = (req, res) => {
    Module.create(req.body)
    .then( dbModule => {
        return User.findOneAndUpdate({ _id: req.body.id}, { $push: { modules: dbModule._id }} , { new: true});
    })
    .then((dbUser) => {
        res.status(200).json(dbUser);
    })
    .catch((err) => {
        res.status(400).send(err.message);
    });
}

//Function to display the saved data
//And print the id of the created module
const getUserModule = (req, res) => {
    User.findOne({ username: req.params.id})
   // User.findOne({ _id: req.body.id})
    .then( dbUser => {
        res.status(200).json(dbUser);
    })
    .catch( err => {
        res.status(400).send(err.message);
    });
}

//Function to update module name and print a successfully updated module
const updateModule = (req, res) => {
    Module.findOneAndUpdate({ _id: req.body.id }, { title: req.body.title })
    .then( () => {
        Module.findOne({ _id: req.body.id})
        .then( updatedModule => { 
            if(updatedModule == null){
                return res.status(400).send({
                    message: "Module not found"});    
            }else{
                return res.status(200).send({
                    message: "Module successfully updated"});
            }
        })
        .catch(err => { console.log("server error")});
    })
    .catch( err => {
        res.status(500).send(err);
    });
}

//Function to remove a module by passing it the unique id of the module,
//printing a message that it was successfully removed
const deleteModule = (req, res) => {
    Module.findOneAndDelete({ _id: req.body.id })
    .then( deletedModule => {
        if(deletedModule == null){
            return res.status(400).send({
                message: "Module not found"});
        }else{
            return res.status(200).send({
                message: "Module successfully deleted"});    
        }
    })
    .catch( err => {
        res.status(500).send(err.message);
    });
}

//To export the functions
module.exports = { addModule, getUserModule, updateModule, deleteModule }