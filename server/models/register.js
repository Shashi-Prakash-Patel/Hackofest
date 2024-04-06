const { model, Schema } = require("mongoose");

const UserSchema = new Schema(
  {
    name: { type: String, require: true },
    aadhar: { type: Number, require: true, unique: true },
    gender: { type: String, require: true },
    address: { type: String, require: true },
    phone: { type: String, require: true },
    password: { type: String, require: true },
    image: { type: String, require: true },
  },
  { timestamps: true }
);

const RegisterUserModel = model("register", UserSchema);

module.exports = RegisterUserModel;
