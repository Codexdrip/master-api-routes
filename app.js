const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const cfbcRouter = require("./routes/cfbc/cfbc");
//const DB = require("./db/dbConnector");

const app = express();
const mongoDB = `mongodb://${process.env.DBUSER}:${process.env.DBPASS}@ds019916.mlab.com:19916/cfbc`;

mongoose
  .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("connection succesful"))
  .catch(err => console.error(err));

app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/cfbc", cfbcRouter);

module.exports = app;
