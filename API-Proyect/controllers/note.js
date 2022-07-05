const mongoose = require('mongoose');
const User = require('../models/user');
const Module = require('../models/module');
const Note = require('../models/note');

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

module.exports = { addNote, getUserNotes, updateNote, deleteNote}
