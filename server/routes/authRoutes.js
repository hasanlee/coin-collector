const express = require("express");
const authRoutes = express.Router();
const { login, register } = require("../controllers/auth");

authRoutes.post("/", (req, res, next) => {
  login(req, res, next);
});

authRoutes.post("/login", (req, res, next) => {
  login(req, res, next);
});

authRoutes.post("/register", (req, res, next) => {
  register(req, res, next);
});

module.exports = authRoutes;
