const { connection } = require("../../db");
const { trycatch } = require("../../utils/trycatch");
const { fileUpload } = require("../../utils/fileUpload");

//const funcTemplate = trycatch(async (req, res, next) => {});
const like_coin = trycatch(async (req, res, next) => {
  const { user, params } = req;
  await (
    await connection
  )
    .query("CALL like_coin(?,?)", [user.id, params.id])
    .then(([data]) => {
      return res.status(200).json(data.affectedRows);
    })
    .catch((err) => {
      throw new Error(err);
    });
});

const dislike_coin = trycatch(async (req, res, next) => {
  const { user, params } = req;
  await (
    await connection
  )
    .query("DELETE FROM likes WHERE userId=? AND coinId=?", [
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

const like_count = trycatch(async (req, res, next) => {
  await (
    await connection
  )
    .query("SELECT COUNT(*) as count FROM likes WHERE coinId= ?", [
      req.params.id,
    ])
    .then(([data]) => {
      return res.status(200).json(data[0]);
    })
    .catch((err) => {
      throw new Error(err);
    });
});
const check_liked = trycatch(async (req, res, next) => {
  const { user, params } = req;
  await (
    await connection
  )
    .query("SELECT check_user_like(?,?) as liked", [user.id, params.id])
    .then(([data]) => {
      return res.status(200).json(data[0]);
    })
    .catch((err) => {
      throw new Error(err);
    });
});
const totalLikes = trycatch(async (req, res, next) => {
  await (
    await connection
  )
    .query("SELECT COUNT(*) as count FROM likes")
    .then(([data]) => {
      return res.status(200).json(data[0]);
    })
    .catch((err) => {
      throw new Error(err);
    });
});
module.exports = {
  like_coin,
  dislike_coin,
  like_count,
  check_liked,
  totalLikes,
};
