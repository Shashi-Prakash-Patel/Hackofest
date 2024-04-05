const { hash, compare } = require('bcrypt');
const UserModel = require("../models/user.js"); 

/** User Register Middleware **/
const UserRegisterFieldData = async (req, res, next) => {
  const { name, adhar, gender, address, phone } = req.body;
};

/** User Login Middleware **/
const UserLoginFieldData = async (req, res, next) => {
  const { adhar, password } = req.body;

  if (adhar && password) {
    const userData = await UserModel.findOne({ adhar: adhar });

    if (userData) {
      const isMatch = await compare(password, userData.password);
      if (isMatch) {
        next();
      } else {
        res
          .status(201)
          .json({ status: "failed", message: "Your password is wrong" });
      }
    } else {
      res.status(201).json({ status: "failed", message: "Please register" });
    }
  } else {
    res
      .status(201)
      .json({ status: "failed", message: "All field are required" });
  }
};

module.exports = { UserRegisterFieldData, UserLoginFieldData };
