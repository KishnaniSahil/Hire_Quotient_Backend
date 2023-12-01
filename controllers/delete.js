const mongoose = require("mongoose");
const User = require("../models/User");
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "User Deleted",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "User Cannot Be Deleted",
    });
  }
};
module.exports = { deleteUser };
