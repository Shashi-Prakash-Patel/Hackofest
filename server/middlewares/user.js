const { compare } = require("bcrypt");
const jwt = require("jsonwebtoken");

const RegisterUserModel = require("../models/register");
const UserLoginModel = require("../models/login");

/** User Register Middleware **/
const UserRegisterFieldData = async (req, res, next) => {
  const { name, aadhar, gender, address, phone, password } = req.body;

  if (name && aadhar && gender && address && phone && password && req.file) {
    const UserData = await RegisterUserModel.findOne({ aadhar: aadhar });
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
  const { name, phone, password } = req.body;

  if (name && phone && password) {
    const userData = await UserLoginModel.findOne({ phone: phone });

    if (userData) {
      const isMatch = compare(password, userData.password);
      if (isMatch) {
        userData.password = null;

        const token = jwt.sign(
          { _id: userData._id, phone: userData.phone },
          process.env.SECRET
        );

        res
          .status(200)
          .cookie("user", token, {
            expires: new Date(Date.now() + 900000000000000),
          })
          .json({
            status: "Success",
            message: "Login successful",
            Usertoken: token,
            user: userData,
          });
      } else {
        res.status(400).json({
          status: "failed",
          message: "Your password or aadhar number is wrong",
        });
      }
    } else {
      next();
    }
  } else {
    res
      .status(400)
      .json({ status: "failed", message: "All field are required" });
  }
};


/** News Uploaded Users **/
const NewsUploadMiddleWare = (req, res, next)=>{
  const newstoken = req.authentic.newstoken;
}

module.exports = { UserRegisterFieldData, UserLoginFieldData };
