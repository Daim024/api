const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    modules: [{
        type: Schema.Types.ObjectId,
        ref: "module"
    }],
    task: [{
        type: Schema.Types.ObjectId,
        ref: "task"
    }],
    event: [{
        type: Schema.Types.ObjectId,
        ref: "event"
    }],
    securityResponse: [{
        type: String,
        required: true,
        unique: true,
        ref: "securityResponse",
    }]
    
});

UserSchema.pre("save", async function (next) {
    const user = this;
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
    next();
});
  
UserSchema.methods.isValidPassword = async function (password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
    return compare;
};
  
const UserModel = mongoose.model("user", UserSchema);
  
module.exports = UserModel;