const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const SecurityResponseSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
});
  
const SecurityResponseModel = mongoose.model("securityResponse", SecurityResponseSchema);
  
module.exports = SecurityResponseModel;
