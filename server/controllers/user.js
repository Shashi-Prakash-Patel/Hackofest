const { hash, compare } = require("bcrypt");
const jwt = require("jsonwebtoken");

const RegisterUserModel = require("../models/register");
const UserLoginModel = require("../models/login");

const UserRegister = async (req, res) => {
  const { name, aadhar, gender, address, phone, password } = req.body;
  const hashPassword = await hash(password, 10);

  const userDoc = new RegisterUserModel({
    name: name,
    aadhar: aadhar,
    gender: gender,
    address: address,
    phone: phone,
    password: hashPassword,
    image: req.file.filename,
  });

  const data = await userDoc.save();

  const token = jwt.sign({ _id: data._id, aadhar: aadhar }, process.env.SECRET);
  res
    .status(200)
    .cookie("newstoken", token, {
      expires: new Date(Date.now() + 900000000000000),
    })
    .json({
      status: "Success",
      message: "Register successful Please login",
      newstoken: token,
    });
};

const UserLogin = async (req, res) => {
  const { name, phone, password } = req.body;

  const userData = await UserLoginModel.findOne({ phone: phone });
  userData.password = null;

  const token = jwt.sign(
    { _id: userData._id, phone: userData.phone },
    process.env.SECRET
  );

  res
    .status(200)
    .cookie("user", token, { expires: new Date(Date.now() + 900000000000000) })
    .json({
      status: "Success",
      message: "Login successful",
      token: token,
      user: userData,
    });
};

module.exports = { UserRegister, UserLogin };
