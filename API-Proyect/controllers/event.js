//Importing dependency
const mongoose = require('mongoose');
const User = require('../models/user');
const Event = require('../models/event');

//Adding function to add an event where the title, description, date and time parameters are entered.
//Where what will print will be an event with a unique id
const addEvent = (req, res) => {
    Event.create(req.body)
    .then( dbEvent => {
        return User.findOneAndUpdate({ _id: req.body.id}, { $push: { event: dbEvent._id }} , { new: true});
    })
    .then((dbUser) => {
        res.status(200).json(dbUser);
    })
    .catch((err) => {
        res.status(400).send(err.message);
    });
}

//Function to display the saved data
//And print the id of the created events
const getEvent = (req, res) => {
    User.findOne({ username: req.params.id})
    //User.findOne({ username: req.body.username})
    .then( dbUser => {
        res.status(200).json(dbUser);
    })
    .catch( err => {
        res.status(400).send(err.message);
    });
}

//Function to update event data, with the parameters that you want to change and print that the event was 
//successfully updated
const updateEvent = (req, res) => {
    Event.findOneAndUpdate({ _id: req.body.id }, { title: req.body.title, description: req.body.description,
                                                   date: req.body.date, time: req.body.time})
    .then( () => {
        Event.findOne({ _id: req.body.id})
        .then( updatedEvent => { 
            if(updatedEvent == null){
                return res.status(400).send({
                    message: "Event not found"});    
            }else{
                return res.status(200).send({
                    message: "Event successfully updated"});
            }
        })
        .catch(err => { console.log("server error")});
    })
    .catch( err => {
        res.status(500).send(err);
    });
}


//Function to delete an event where the id of the event to be deleted 
//is entered, and it prints a message that it was successfully deleted
const deleteEvent = (req, res) => {
    Event.findOneAndDelete({ _id: req.body.id })
    .then( deletedEvent => {
        if(deletedEvent == null){
            return res.status(400).send({
                message: "Event not found"});
        }else{
            return res.status(200).send({
                message: "Event successfully deleted"});    
        }
    })
    .catch( err => {
        res.status(500).send(err.message);
    });
}

//To export the functions
module.exports = { addEvent, getEvent, updateEvent, deleteEvent }
