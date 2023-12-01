// require("dotenv").config();
// const jwt = require("jsonwebtoken");
// const secretKey = process.env.JWT_SECRET; // Replace with your actual secret key

// const authenticateMiddleware = (req, res, next) => {
//   const token = req.header("Authorization");

//   if (!token) {
//     return res
//       .status(401)
//       .json({ success: false, message: "Unauthorized: Missing token" });
//   }

//   try {
//     const decoded = jwt.verify(token, secretKey);
//     req.user = decoded.user; // Attach the decoded user to the request object
//     next();
//   } catch (error) {
//     return res
//       .status(401)
//       .json({ success: false, message: "Unauthorized: Invalid token" });
//   }
// };
// module.exports = { authenticateMiddleware };
const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = async (req, res, next) => {
  try {
    // const token = req.body.token;
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token Missing",
      });
    }

    //verifying the token
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decode;
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "token is invalid",
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Something Went Wrong,While verifying the token",
    });
  }
};
module.exports = { auth };
