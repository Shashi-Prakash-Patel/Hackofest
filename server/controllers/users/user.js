const { hash, compare } = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserModel = require("../../models/user.js");

const UserRegister = async (req, res) => {
  const { name, aadhar, gender, address, phone, password } = req.body;
  const hashPassword = await hash(password, 10);

  const userDoc = new UserModel({
    name: name,
    aadhar: aadhar,
    gender: gender,
    address: address,
    phone: phone,
    password: hashPassword,
    image: req.file.filename,
  });

  await userDoc.save();

  res
    .status(200)
    .json({ status: "Success", message: "Register successful Please login" });
};

const UserLogin = async (req, res) => {
  const { aadhar, password } = req.body;

  const userData = await UserModel.findOne({ aadhar: aadhar });
  userData.password = null;

  const token = jwt.sign(
    { _id: userData._id, aadhar: userData.aadhar },
    process.env.SECRET
  );

  res.status(200).json({
    status: "Success",
    message: "Login successful",
    token: token,
    user: userData,
  });
};

module.exports = { UserRegister, UserLogin };
