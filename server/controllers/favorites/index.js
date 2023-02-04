const { connection } = require("../../db");
const { trycatch } = require("../../utils/trycatch");
const { fileUpload } = require("../../utils/fileUpload");

const favorite_coin = trycatch(async (req, res, next) => {
  const { user, params } = req;
  await (
    await connection
  )
    .query("CALL favorite_coin(?,?)", [user.id, params.id])
    .then(([data]) => {
      return res.status(200).json(data.affectedRows);
    })
    .catch((err) => {
      throw new Error(err);
    });
});

const remove_favorite = trycatch(async (req, res, next) => {
  const { user, params } = req;
  await (
    await connection
  )
    .query("DELETE FROM favorites WHERE userId=? AND coinId=?", [
      user.id,
      params.id,
    ])
    .then(([data]) => {
      return res.status(200).json(data.affectedRows);
    })
    .catch((err) => {
      throw new Error(err);
    });
});

const favorites = trycatch(async (req, res, next) => {
  await (
    await connection
  )
    .query("CALL favorited_coins(?)", [req.user.id])
    .then(([data]) => {
      return res.status(200).json(data[0]);
    })
    .catch((err) => {
      throw new Error(err);
    });
});
const check_favorited = trycatch(async (req, res, next) => {
  const { user, params } = req;
  await (
    await connection
  )
    .query("SELECT check_user_favorited(?,?) as favorited", [
      user.id,
      params.id,
    ])
    .then(([data]) => {
      return res.status(200).json(data[0]);
    })
    .catch((err) => {
      throw new Error(err);
    });
});
const totalFavorites = trycatch(async (req, res, next) => {
  await (
    await connection
  )
    .query("SELECT COUNT(*) as count FROM favorites")
    .then(([data]) => {
      return res.status(200).json(data[0]);
    })
    .catch((err) => {
      throw new Error(err);
    });
});
module.exports = {
  favorite_coin,
  remove_favorite,
  favorites,
  check_favorited,
  totalFavorites,
};
