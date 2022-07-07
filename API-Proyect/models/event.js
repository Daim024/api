const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const EventSchema = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    day: {
        type: Number
    },
    month: {
        type: Number
    },
    year: {
        type: Number
    },
    hour:{
        type: Number
    },
    minute:{
        type: Number
    },
    event: [{
        type: Schema.Types.ObjectId,
        ref: "event"
    }]
});

const EventModel = mongoose.model("event", EventSchema);
module.exports = EventModel;