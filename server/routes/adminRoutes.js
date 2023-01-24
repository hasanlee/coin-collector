const express = require("express");
const adminRoutes = express.Router();

adminRoutes.get("/", (req, res) => {
  res.send("Auth");
});

module.exports = adminRoutes;
