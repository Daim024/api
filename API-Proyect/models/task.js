const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const TaskSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }
});
  
const TaskModel = mongoose.model("task", TaskSchema);
  
module.exports = TaskModel;