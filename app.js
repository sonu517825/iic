const express = require("express");
const logger = require("morgan");
const fileUpload = require('express-fileupload');

const routers = require("./routes/routes");

const app = express();

app.use(fileUpload())
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// db
require("./database/mongodb");

app.use("/api", routers);

// console.log({
//   name: JSON.stringify({
//     firstName: "Sonu",
//     lastName: "Verma",
//   }),
// });

app.use(function (req, res, next) {
  return res.status(404).send("Not found");
});

module.exports = app;
