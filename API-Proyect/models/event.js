const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const EventSchema = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    date: {
        type: String
    },
    time: {
        type: String
    },
    event: [{
        type: Schema.Types.ObjectId,
        ref: "event"
    }]
});

const EventModel = mongoose.model("event", EventSchema);
module.exports = EventModel;