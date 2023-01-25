const express = require("express");
const userRoutes = express.Router();
const {
  getAllCoins,
  getAllCoinsView,
  getAllCompositions,
  getAllCountries,
  getAllQualities,
  getAllTypes,
  getCoinById,
  getCoinByIdView,
  addNewCountry,
} = require("../services/coin");

userRoutes.get("/", function (req, res) {
  res.status(200).send({ error: false, message: "Coin Collector API v 1.0" });
});

userRoutes.get("/coins", function (req, res, next) {
  getAllCoins(req, res, next);
});

userRoutes.get("/compositions", function (req, res, next) {
  getAllCompositions(req, res, next);
});

userRoutes.get("/countries", function (req, res, next) {
  getAllCountries(req, res, next);
});

userRoutes.get("/qualities", function (req, res, next) {
  getAllQualities(req, res, next);
});

userRoutes.get("/types", function (req, res, next) {
  getAllTypes(req, res, next);
});

userRoutes.get("/coins/:id", function (req, res, next) {
  getCoinById(req, res, next);
});

module.exports = userRoutes;
