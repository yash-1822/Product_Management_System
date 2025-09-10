const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  user:{
    type: String,
    required: [true, "userName is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
  }
});



module.exports = mongoose.model("User", UserSchema);
