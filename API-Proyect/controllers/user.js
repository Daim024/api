const mongoose = require('mongoose');
const { findOneAndReplace } = require('../models/user');
const User = require('../models/user');

const addUser = (req, res) => {
    User.create(req.body)
    .then( dbUser => {
        res.status(200).json(dbUser)
    })
    .catch( err => {
        res.status(400).send(err.message)
    });
}

//TASK: Mod to receive only one param
const updateUser = (req, res) => {
    User.findOneAndUpdate({ _id: req.body.id }, { username: req.body.username, email: req.body.email })
    .then(() => {
        User.findOne({ _id: req.body.id})
        .then((updatedUser) => { 
            if (updatedUser == null) {
                return res.status(400).send({
                message: "User not found"
                });        
            } else {
                return res.status(200).send({
                message: "User successfully updated"
                });
            }
        })
    })
    .catch( err => {
        res.status(400).send(err);
    });
}

const deleteUser = (req, res) => {
    User.findOneAndDelete({ _id: req.body.id })
    .then( deletedUser => {
        if(deletedUser == null){
            return res.status(400).send({
                message: "User not found"
            });
        }else{
            return res.status(200).send({
                message: "User successfully deleted"
            });
        }
    })
    .catch( err => {
        res.status(400).send(err.message);
    });
}

module.exports = { addUser, updateUser, deleteUser };
