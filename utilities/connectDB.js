const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://localhost:27017/codecaty");
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = connectDB;
