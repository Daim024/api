//Importing dependency
const mongoose = require('mongoose');
const User = require('../models/user');
const SecurityResponse = require('../models/securityResponse');

//Function to add a security question, with the answer parameter and prints a unique id for the answer
const addSecurityResponse = (req, res) => {
    SecurityResponse.create(req.body)
    .then( dbSecurityResponse => {
        return User.findOneAndUpdate({ _id: req.body.id}, { $push: { securityResponse: dbSecurityResponse._id }} , { new: true});
    })
    .then((dbUser) => {
        res.status(200).json(dbUser);
    })
    .catch((err) => {
        res.status(400).send(err.message);
    });
}

//Function to display the saved data
//And print the id of the created security response
const getUserSecurityResponse = (req, res) => {
    User.findOne({ username: req.params.id})
   // User.findOne({ _id: req.body.id})
    .then( dbUser => {
        res.status(200).json(dbUser);
    })
    .catch( err => {
        res.status(400).send(err.message);
    });
}

//Function to be able to update the security question, and when updating it, an alert appears that was 
//successfully updated
const updateSecurityResponse = (req, res) => {
    SecurityResponse.findOneAndUpdate({ _id: req.body.id }, { description: req.body.description })
    .then( () => {
        SecurityResponse.findOne({ _id: req.body.id})
        .then( updatedSecurityResponse => { 
            if(updatedSecurityResponse == null){
                return res.status(400).send({
                    message: "description not found"});    
            }else{
                return res.status(200).send({
                    message: "description successfully updated"});
            }
        })
        .catch(err => { console.log("server error")});
    })
    .catch( err => {
        res.status(500).send(err);
    });
}

//Function to delete the security question, deleting it with 
//the unique id of the security answer
const deleteSecurityResponse = (req, res) => {
    SecurityResponse.findOneAndDelete({ _id: req.body.id })
    .then( deletedSecurityResponse => {
        if(deletedSecurityResponse == null){
            return res.status(400).send({
                message: "description not found"});
        }else{
            return res.status(200).send({
                message: "description successfully deleted"});    
        }
    })
    .catch( err => {
        res.status(500).send(err.message);
    });
}

//To export the functions
module.exports = { addSecurityResponse, getUserSecurityResponse, updateSecurityResponse, deleteSecurityResponse}