//Importing dependency
const mongoose = require('mongoose');
const User = require('../models/user');
const WebQA = require('../models/webQA');

//Adding function to add question parameters and its answer for the web
const addWebQA = (req, res) => {
    WebQA.create(req.body)
    .then( dbWebQA => {
        return User.findOneAndUpdate({ _id: req.body.id}, { $push: { webQA: dbWebQA._id }} , { new: true});
    })
    .then((dbUser) => {
        res.status(200).json(dbUser);
    })
    .catch((err) => {
        res.status(400).send(err.message);
    });
}

//Adding function to be able to observe the data that was saved from the 
//question and answer string
const getUserWebQA = (req, res) => {
    User.findOne({ username: req.params.id})
   // User.findOne({ _id: req.body.id})
    .then( dbUser => {
        res.status(200).json(dbUser);
    })
    .catch( err => {
        res.status(400).send(err.message);
    });
}

//Function to update questions and answer
const updateWebQA = (req, res) => {
    WebQA.findOneAndUpdate({ _id: req.body.id }, { title: req.body.title, description: req.body.description})
    .then( () => {
        WebQA.findOne({ _id: req.body.id})
        .then( updatedWebQA => { 
            if(updatedWebQA == null){
                return res.status(400).send({
                    message: "WebQA not found"});    
            }else{
                return res.status(200).send({
                    message: "WebQA successfully updated"});
            }
        })
        .catch(err => { console.log("server error")});
    })
    .catch( err => {
        res.status(500).send(err);
    });
}

//Function to remove the parameters of the question and answer
const deleteWebQA = (req, res) => {
    WebQA.findOneAndDelete({ _id: req.body.id })
    .then( deletedWebQA => {
        if(deletedWebQA == null){
            return res.status(400).send({
                message: "WebQA not found"});
        }else{
            return res.status(200).send({
                message: "WebQA successfully deleted"});    
        }
    })
    .catch( err => {
        res.status(500).send(err.message);
    });
}

//To export the functions
module.exports = { addWebQA, getUserWebQA, updateWebQA, deleteWebQA }