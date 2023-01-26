const express = require("express");
const userRoutes = express.Router();
const { auth } = require("../middlewares/auth");
const {
  getAllCoins,
  getAllCoinsView,
  getAllCompositions,
  getAllCountries,
  getAllQualities,
  getAllTypes,
  getCoinById,
  getCoinByIdView,
} = require("../controllers/coin");
const {
  favorite_coin,
  favorites,
  check_favorited,
  remove_favorite,
} = require("../controllers/favorites");
const {
  like_coin,
  like_count,
  check_liked,
  dislike_coin,
} = require("../controllers/like_coin");

//#region No auth required
userRoutes.get("/", function (req, res) {
  res.status(200).send({ error: false, message: "Coin Collector API v 1.0" });
});

userRoutes.get("/coins", function (req, res, next) {
  getAllCoins(req, res, next);
});

userRoutes.get("/allcoins", function (req, res, next) {
  getAllCoinsView(req, res, next);
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
//#endregion
//#region Auth required
userRoutes.post("/like/:id", auth, function (req, res, next) {
  like_coin(req, res, next);
});

userRoutes.delete("/dislike/:id", auth, function (req, res, next) {
  dislike_coin(req, res, next);
});

userRoutes.get("/likes/:id", auth, function (req, res, next) {
  like_count(req, res, next);
});

userRoutes.get("/liked/:id", auth, function (req, res, next) {
  check_liked(req, res, next);
});

userRoutes.post("/favorite/:id", auth, function (req, res, next) {
  favorite_coin(req, res, next);
});

userRoutes.delete("/favorite/:id", auth, function (req, res, next) {
  remove_favorite(req, res, next);
});

userRoutes.get("/favorites/:id", auth, function (req, res, next) {
  favorites(req, res, next);
});

userRoutes.get("/favorited/:id", auth, function (req, res, next) {
  check_favorited(req, res, next);
});
//#endregion
module.exports = userRoutes;
