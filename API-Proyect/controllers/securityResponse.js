const mongoose = require('mongoose');
const User = require('../models/user');
const SecurityResponse = require('../models/securityResponse');

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


module.exports = { addSecurityResponse, getUserSecurityResponse, updateSecurityResponse, deleteSecurityResponse}
