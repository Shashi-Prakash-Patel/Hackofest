const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const UserRoute = require("./routes/UserRoute");

const app = express();

const CORS = {
  origin: "http://localhost:3000",
  Credential: true,
  method: ["GET", "POST", "PATCH", "PUT", "DELETE"],
};

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "uploads")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser(process.env.SECRET));
app.use(cors(CORS));
app.options("*", cors(CORS));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  next();
});

app.get("/", async (req, res) => {
  res.status(200).json({ message: "LATEST NEWS" });
});

app.use("/user", UserRoute);

module.exports = app;
