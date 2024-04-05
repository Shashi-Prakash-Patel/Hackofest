const { hash, compare } = require("bcrypt");
const jwt = require("jsonwebtoken");

import UserModel from "../../models/user.js";

const UserRegister = async (req, res) => {
  const { name, adhar, gender, address, phone } = req.body;
};

const UserLogin = async (req, res) => {
  const { adhar, password } = req.body;

  const userData = await UserModel.findOne({ adhar: adhar });
  const token = jwt.sign(
    { adhar: userData.adhar, _id: userData._id },
    process.env.SECRET
  );

  res
    .status(200)
    .json({ status: "Success", message: "Login successful", token: token });
};

module.exports = { UserRegister, UserLogin };
