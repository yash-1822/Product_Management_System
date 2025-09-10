require("dotenv").config();
const bcrypt = require("bcryptjs");

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("mongodb connected successfully");
  })
  .catch((err) => {
    console.log("Mongodb connected error...",err.message);
    process.exit(1);
  });
