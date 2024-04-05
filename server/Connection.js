import mongoose from "mongoose";

const Connection = () => {
  mongoose
    .connect("mongodb://localhost:27017/test")
    .then(() => console.log("Mongodb connected"))
    .catch(() => console.log("Mongodb not connected"));
};

export default Connection;