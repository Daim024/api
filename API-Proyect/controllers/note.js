//Importing dependency
const mongoose = require('mongoose');
const User = require('../models/user');
const Module = require('../models/module');
const Note = require('../models/note');

//Adding function to add a note to a specific module, entering a note title and description, and referencing the module
const addNote = (req, res) => {
    Note.create(req.body)
    .then( dbNote => {
        return Module.findOneAndUpdate({ _id: req.body.id }, { $push: { notes: dbNote._id }}, { new: true});
    })
    .then( dbModule => {
        res.status(200).json(dbModule);
    })
    .catch( err => {
        res.status(400).send(err.message);
    })
}

//Function to display the saved data
//And print the id of the created note
const getUserNotes = (req, res) => {
    User.findOne({ username: req.params.id})
    //User.findOne({ username: req.body.username})
    .populate({
        path: 'modules',
        populate: {
            path: 'notes'
        }
    })
    .then( dbUser => {
        res.status(200).json(dbUser);
    })
    .catch( err => {
        res.status(400).send(err.message);
    });
}

//Adding a function to update a specific note by entering the parameters that you want to change, and when doing 
//so, it prints a message that the note was updated
const updateNote = (req, res) => {
    Note.findOneAndUpdate({ _id: req.body.id }, { title: req.body.title, description: req.body.description })
    .then( () => {
        Note.findOne({ _id: req.body.id})
        .then( updatedNote => { 
            if(updatedNote == null){
                return res.status(400).send({
                    message: "Note not found"});    
            }else{
                return res.status(200).send({
                    message: "Note successfully updated"});
            }
        })
        .catch( err => { console.log("server error")});
    })
    .catch( err => {
        res.status(500).send(err);
    })
}

//Function to delete a note where the id of the specific note is entered
const deleteNote = (req, res) => {
    Note.findOneAndDelete({ _id: req.body.id })
    .then( deletedNote => {
        if(deletedNote == null){
            return res.status(400).send({
                message: "Note not found"
            })
        } else{
            return res.status(200).send({
                message: "Note successfully deleted"
            })
        }
    })
    .catch( err => {
        res.status(500).send(err);
    })
}

//To export the functions
module.exports = { addNote, getUserNotes, updateNote, deleteNote}