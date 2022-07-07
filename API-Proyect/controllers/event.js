const mongoose = require('mongoose');
const User = require('../models/user');
const Event = require('../models/event');

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

const getEvent = (req, res) => {
    Event.findOne({ username: req.params.id})
    //User.findOne({ username: req.body.username})
    .populate({
        path: 'event',
        populate: {
            path: 'event'
        }
    })
    .then( dbUser => {
        res.status(200).json(dbUser);
    })
    .catch( err => {
        res.status(400).send(err.message);
    });
}

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

module.exports = { addEvent, getEvent, updateEvent, deleteEvent }
