const {model, Schema} = require('mongoose');

const UserSchema = new Schema({});

const UserModel = model("user", UserSchema);

module.exports = UserModel;