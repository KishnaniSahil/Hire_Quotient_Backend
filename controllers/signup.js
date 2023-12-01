const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const signup = async (req, res) => {
  try {
    //Fetching The Data
    const { username, password, email, name, profilePicture } = req.body;
    //Checking If User Already Exist in Db
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User Already Exist",
      });
    }
    //Hashing The Password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      return res.status(500).json({
        success: true,
        message: "Error in Hashing",
      });
    }
    //Creating New User
    const user = await User.create({
      username,
      password: hashedPassword,
      email,
      name,
      profilePicture,
    });
    res.status(200).json({
      success: true,
      message: "Signup Successfull",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "User Cannot Be Created",
    });
  }
};

module.exports = { signup };
