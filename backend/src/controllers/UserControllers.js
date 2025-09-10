const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/UserSchema")
const { default: AppError } = require("../utils/errorHandler");


const register = async (req, res, next) => {
  console.log("Request body:", req.body);
  try {
    const { user, password } = req.body;

    // Validation checks
    if (!user || !password) {
      return next(new AppError("Credentials are required", 400));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      user,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({
      message: "User registered successfully",
      user
    });

  } catch (err) {
    console.error("Error in register:", err);
    return next(err);
  }
};


const login = async (req, res, next) => {
  try {
    const { user, password } = req.body;

    const userDetails = await User.findOne({ user });
    if (!userDetails) {
      return next(new AppError("User not found", 400));
    }

    const isMatch = await bcrypt.compare(password, userDetails.password);
    if (!isMatch) {
      return next(new AppError("Incorrect password", 400));
    }

    const tokenData = {
      _id: userDetails._id,
      user: userDetails.user,
    };

    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "8h",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        user: userDetails.user,
      },
      expires: new Date(Date.now() + 1000 * 60 * 60 * 8),
      success: true,
      error: false,
    });
  } catch (err) {
    console.error("Login error:", err);
    return next(err);
  }
};

module.exports = { register, login };