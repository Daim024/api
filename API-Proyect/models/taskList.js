const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const TaskListSchema = new Schema({
    title: {
        type: String
    },
    status: {
        type: Boolean,
        default: false
    },
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: "task"
    }]
});
  
const TaskListModel = mongoose.model("taskList", TaskListSchema);
  
module.exports = TaskListModel;