const mongoose = require("mongoose");
require("dotenv").config();

const connect = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Db Connection Successfull");
    })
    .catch((error) => {
      console.error(error);
      console.log("DB Connection Issue");
      process.exit(1);
    });
};
module.exports = connect;
