const express = require("express");
const app = express();
const connect = require("./config/dbConnect");
const user = require("./routes/user");
const cookieParser = require("cookie-parser");
require("dotenv").config();
connect();
app.use(cookieParser());
app.use(express.json());
app.use("/api/v1", user);

app.listen(3000, () => {
  console.log("Server is running on the port 3000");
});
