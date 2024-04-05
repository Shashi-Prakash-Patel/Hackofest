const { compare } = require("bcrypt");
const UserModel = require("../models/user.js");

/** User Register Middleware **/
const UserRegisterFieldData = async (req, res, next) => {
  const { name, aadhar, gender, address, phone, password } = req.body;

  if (name && aadhar && gender && address && phone && password && req.file) {
    const UserData = await UserModel.findOne({ aadhar: aadhar });
    if (!UserData) {
      next();
    } else {
      res.status(400).json({
        status: "failed",
        message: "Your adhar number is already register",
      });
    }
  } else {
    res
      .status(400)
      .json({ status: "failed", message: "All field are required" });
  }
};

/** User Login Middleware **/
const UserLoginFieldData = async (req, res, next) => {
  const { aadhar, password } = req.body;

  if (aadhar && password) {
    const userData = await UserModel.findOne({ aadhar: aadhar });

    if (userData) {
      const isMatch = await compare(password, userData.password);
      if (isMatch) {
        next();
      } else {
        res
          .status(400)
          .json({
            status: "failed",
            message: "Your password or aadhar number is wrong",
          });
      }
    } else {
      res.status(400).json({ status: "failed", message: "Please register" });
    }
  } else {
    res
      .status(400)
      .json({ status: "failed", message: "All field are required" });
  }
};

module.exports = { UserRegisterFieldData, UserLoginFieldData };
