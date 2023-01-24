const express = require("express");
const userRoutes = express.Router();

userRoutes.get("/", function (req, res) {
  res.send("Hello World");
});

userRoutes.post("/auth", (req, res) => {});

module.exports = userRoutes;
