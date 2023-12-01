const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const login = async (req, res) => {
  try {
    let { username, password } = req.body;
    if (!username || !password) {
      return res.satus(400).json({
        success: false,
        mewsage: "Please FIll All the details carefully",
      });
    }
    let user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({
        success: false,
        mewsage: "User does not exist",
      });
    }
    const payload = {
      username: user.username,
      id: user._id,
    };
    if (await bcrypt.compare(password, user.password)) {
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      /* The line `user = user.toObject();` is converting the `user` object to a plain JavaScript
      object. */
      user = user.toObject();
      user.token = token;
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).json({
        success: true,
        token,
        user,
        message: "User Loged in successfully",
      });
    } else {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Login Failed",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "User Cannot Be Loged In",
    });
  }
};
module.exports = { login };
