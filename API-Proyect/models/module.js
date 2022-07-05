const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ModuleSchema = new Schema({
    title: {
        type: String
    },
    status: {
        type: Boolean,
        default: false
    },
    notes: [{
        type: Schema.Types.ObjectId,
        ref: "note"
    }]
});
  
const ModuleModel = mongoose.model("module", ModuleSchema);
  
module.exports = ModuleModel;