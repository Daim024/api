const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const NoteSchema = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    status: {
        type: Boolean,
        default: false
    }
});
  
const NoteModel = mongoose.model("note", NoteSchema);
  
module.exports = NoteModel;