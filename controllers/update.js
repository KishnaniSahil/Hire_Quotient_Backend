const mongoose = require("mongoose");
const User = require("../models/User");
const update = async (req, res) => {
  try {
    const id = req.params.id;
    const { username, email, name, profilePicture } = req.body;

    const update = await User.findByIdAndUpdate(
      { _id: id },
      { username, email, name, profilePicture, updatedAt: Date.now() }
    );
    res.status(200).json({
      success: true,
      data: update,
      message: "Update Successfull",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "User Cannot Be Created",
    });
  }
};
module.exports = { update };
