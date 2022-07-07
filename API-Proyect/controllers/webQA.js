const mongoose = require('mongoose');
const User = require('../models/user');
const WebQA = require('../models/webQA');

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

module.exports = { addWebQA, getUserWebQA, updateWebQA, deleteWebQA }