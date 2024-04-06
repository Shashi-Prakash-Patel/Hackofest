const express = require("express");

const uploads = require("./uploads");

/** MiddleWare **/
const {
  UserRegisterFieldData,
  UserLoginFieldData,
} = require("../middlewares/users/user");


/** Controller **/
const { UserRegister, UserLogin } = require("../controllers/users/user");

const router = express.Router();

router.post("/register", UserRegisterFieldData, uploads.single("file"), UserRegister);
router.post("/login", UserLoginFieldData, UserLogin);

module.exports = router;
