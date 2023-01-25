const express = require("express");
const userRoutes = express.Router();

userRoutes.get("/", function (req, res) {
  res.send("Hello World");
});

module.exports = userRoutes;
