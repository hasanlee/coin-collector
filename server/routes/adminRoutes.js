const express = require("express");
const adminRoutes = express.Router();
const {
  addNewCoin,
  addNewComposition,
  addNewCountry,
  addNewQuality,
  addNewType,
  updateCoin,
  updateComposition,
  updateCountry,
  updateQuality,
  updateType,
  deleteCoin,
  deleteComposition,
  deleteCountry,
  deleteQuality,
  deleteType,
} = require("../controllers/coin");

adminRoutes.get("/", (req, res) => {
  res.json(req.user);
});

//#region POST
adminRoutes.post("/coin/", (req, res, next) => {
  addNewCoin(req, res, next);
});

adminRoutes.post("/composition/", (req, res, next) => {
  addNewComposition(req, res, next);
});

adminRoutes.post("/country/", (req, res, next) => {
  addNewCountry(req, res, next);
});

adminRoutes.post("/quality/", (req, res, next) => {
  addNewQuality(req, res, next);
});

adminRoutes.post("/type/", (req, res, next) => {
  addNewType(req, res, next);
});
//#endregion
//#region PUT
adminRoutes.put("/coin/:id", (req, res, next) => {
  updateCoin(req, res, next);
});

adminRoutes.put("/composition/:id", (req, res, next) => {
  updateComposition(req, res, next);
});

adminRoutes.put("/country/:id", (req, res, next) => {
  updateCountry(req, res, next);
});

adminRoutes.put("/quality/:id", (req, res, next) => {
  updateQuality(req, res, next);
});

adminRoutes.put("/type/:id", (req, res, next) => {
  updateType(req, res, next);
});
//#endregion
//#region DELETE
adminRoutes.delete("/coin/:id", (req, res, next) => {
  deleteCoin(req, res, next);
});

adminRoutes.delete("/composition/:id", (req, res, next) => {
  deleteComposition(req, res, next);
});

adminRoutes.delete("/country/:id", (req, res, next) => {
  deleteCountry(req, res, next);
});

adminRoutes.delete("/quality/:id", (req, res, next) => {
  deleteQuality(req, res, next);
});

adminRoutes.delete("/type/:id", (req, res, next) => {
  deleteType(req, res, next);
});
//#endregion
//#region Dashboard

//#endregion

module.exports = adminRoutes;
