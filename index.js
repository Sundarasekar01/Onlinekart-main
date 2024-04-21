const express = require("express");
const app = express();
const mongoose = require("mongoose");
const connection = mongoose.connection;
const nocache = require("nocache");
const mongoSanitize = require("express-mongo-sanitize");

const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");
const forgotPassword = require("./routes/forgotPassword");



require("dotenv").config();
mongoose.set("strictQuery", false);

DB = process.env.DBURL;
mongoose.connect(DB);
connection.once("open", () => {
  console.log("connection is successfull");
});


app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(nocache());
app.use(mongoSanitize());

app.set("view engine", "ejs");

app.use("/", userRoute);
app.use("/admin", adminRoute);
app.use("/forgot", forgotPassword);

// app.all("*", (req, res) => {
//   res.render("error");
// });

app.listen(2308, function () {
  console.log("server is running at 2308");
});
