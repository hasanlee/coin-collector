const express = require("express");
const userRoutes = express.Router();
const { login, register } = require("../services/auth");

userRoutes.get("/", function (req, res) {
  res.send("Hello World");
});

userRoutes.post("/auth", (req, res, next) => {
  login(req, res, next);
});

userRoutes.post("/auth/register", (req, res, next) => {
  register(req, res, next);
});

module.exports = userRoutes;
