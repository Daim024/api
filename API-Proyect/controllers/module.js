const mongoose = require('mongoose');
const User = require('../models/user');
const Module = require('../models/module');
const Note = require('../models/note');

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

module.exports = { addModule, updateModule, deleteModule }
