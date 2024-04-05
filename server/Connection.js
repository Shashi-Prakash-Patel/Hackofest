const mongoose = require('mongoose');

const Connection = () => {
  mongoose
    .connect("mongodb://localhost:27017/hackofest")
    .then(() => console.log("Mongodb connected"))
    .catch(() => console.log("Mongodb not connected"));
};

module.exports = Connection;