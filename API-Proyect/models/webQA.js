const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const WebQASchema = new Schema({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
});
  
const WebQAModel = mongoose.model("webQA", WebQASchema);
  
module.exports = WebQAModel;