const { model, Schema } = require("mongoose");

const User = new Schema(
  {
    name: { type: String, require: true },
    phone: { type: String, require: true, unique: true },
    password: { type: String, require: true },
  },
  { timestamps: true }
);

const UserLoginModel = model("login", User);

module.exports = UserLoginModel;
