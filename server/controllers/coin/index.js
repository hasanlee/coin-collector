const { connection } = require("../../db");
const { trycatch } = require("../../utils/trycatch");
const { fileUpload } = require("../../utils/fileUpload");
const moment = require("moment");

//const funcTemplate = trycatch(async (req, res, next) => {});
//#region Get Data from DB
const getAllCoins = trycatch(async (req, res, next) => {
  await (
    await connection
  )
    .query("SELECT * FROM coins;")
    .then(([rows]) => {
      return res.status(200).json(rows);
    })
    .catch((err) => {
      throw new Error(err);
    });
});
const getAllCoinsView = trycatch(async (req, res, next) => {
  const {
    s,
    type,
    country,
    quality,
    yearMin,
    yearMax,
    priceMin,
    priceMax,
    perPage,
    page,
  } = req.query;
  await (
    await connection
  )
    .query(
      `SELECT * FROM AllCoinsDetailed WHERE 1=1 ${
        s
          ? `AND (coinName LIKE '%${s}%' OR 
      shortDescription LIKE '%${s}%' OR 
      description = '%${s}%') `
          : ``
      }
      ${country ? ` AND issuedByCountry = '${country}'` : ``}
      ${quality ? ` AND quality = '${quality}'` : ``}
      ${yearMin ? ` AND year >= '${yearMin}'` : ``}
      ${yearMax ? ` AND year <= '${yearMax}'` : ``}
      ${priceMin ? ` AND price >= '${priceMin}'` : ``}
      ${priceMax ? ` AND price <= '${priceMax}'` : ``}
      ${type ? ` AND type = '${type}'` : ``}
      ORDER BY coinName LIMIT ${perPage || 9999} OFFSET ${page | 0};`
    )
    .then(([rows]) => {
      return res.status(200).json(rows);
    })
    .catch((err) => {
      throw new Error(err);
    });
});
const getCoinById = trycatch(async (req, res, next) => {
  await (
    await connection
  )
    .query("SELECT * FROM AllCoinsDetailed WHERE coinId = ?;", [req.params.id])
    .then(([rows]) => {
      if (rows.length > 0) return res.status(200).json(rows[0]);
      return res
        .status(404)
        .json({ error: true, message: "Coin not found.", status: 404 });
    })
    .catch((err) => {
      throw new Error(err);
    });
});
const getCoinByIdView = trycatch(async (req, res, next) => {
  await (
    await connection
  )
    .query("SELECT * FROM coins WHERE id = ?;", [req.params.id])
    .then(([rows]) => {
      return res.status(200).json(rows);
    })
    .catch((err) => {
      throw new Error(err);
    });
});
const getAllCountries = trycatch(async (req, res, next) => {
  const { s } = req.query;
  await (
    await connection
  )
    .query(`SELECT * FROM countries ${s ? `WHERE name LIKE '%${s}%'` : ``};`)
    .then(([rows]) => {
      return res.status(200).json(rows);
    })
    .catch((err) => {
      throw new Error(err);
    });
});
const getAllCompositions = trycatch(async (req, res, next) => {
  const { s } = req.query;
  await (
    await connection
  )
    .query(`SELECT * FROM compositions ${s ? `WHERE name LIKE '%${s}%'` : ``};`)
    .then(([rows]) => {
      return res.status(200).json(rows);
    })
    .catch((err) => {
      throw new Error(err);
    });
});
const getAllQualities = trycatch(async (req, res, next) => {
  const { s } = req.query;
  await (
    await connection
  )
    .query(`SELECT * FROM qualities ${s ? `WHERE name LIKE '%${s}%'` : ``};`)
    .then(([rows]) => {
      return res.status(200).json(rows);
    })
    .catch((err) => {
      throw new Error(err);
    });
});
const getAllTypes = trycatch(async (req, res, next) => {
  const { s } = req.query;
  await (
    await connection
  )
    .query(`SELECT * FROM types ${s ? `WHERE name LIKE '%${s}%'` : ``};`)
    .then(([rows]) => {
      return res.status(200).json(rows);
    })
    .catch((err) => {
      throw new Error(err);
    });
});
const getSimilarCoins = trycatch(async (req, res, next) => {
  await (
    await connection
  )
    .query("CALL similar_coins(?)", [req.params.id])
    .then(([rows]) => {
      return res.status(200).json(rows[0]);
    })
    .catch((err) => {
      throw new Error(err);
    });
});
//#endregion
//#region Insert data to DB
const addNewCoin = trycatch(async (req, res, next) => {
  let frontImg = req.files?.file1 ? fileUpload(req.files.file1) : null;
  let backImg = req.files?.file2 ? fileUpload(req.files.file2) : null;
  const data = {
    ...req.body,
    created_by: req.user.id,
  };
  if (frontImg) {
    data.imageUrl_front = frontImg;
  }
  if (backImg) {
    data.imageUrl_back = backImg;
  }
  await (
    await connection
  )
    .query("INSERT INTO coins SET ?", [data])
    .then(([data]) => {
      return res.status(200).json(data.insertId);
    })
    .catch((err) => {
      throw new Error(err);
    });
});
const addNewCountry = trycatch(async (req, res, next) => {
  await (
    await connection
  )
    .query("INSERT INTO countries SET ?", [req.body])
    .then(([data]) => {
      return res.status(200).json(data.insertId);
    })
    .catch((err) => {
      throw new Error(err);
    });
});
const addNewComposition = trycatch(async (req, res, next) => {
  await (
    await connection
  )
    .query("INSERT INTO compositions SET ?", [req.body])
    .then(([data]) => {
      return res.status(200).json(data.insertId);
    })
    .catch((err) => {
      throw new Error(err);
    });
});
const addNewQuality = trycatch(async (req, res, next) => {
  await (
    await connection
  )
    .query("INSERT INTO qualities SET ?", [req.body])
    .then(([data]) => {
      return res.status(200).json(data.insertId);
    })
    .catch((err) => {
      throw new Error(err);
    });
});
const addNewType = trycatch(async (req, res, next) => {
  await (
    await connection
  )
    .query("INSERT INTO types SET ?", [req.body])
    .then(([data]) => {
      return res.status(200).json(data.insertId);
    })
    .catch((err) => {
      throw new Error(err);
    });
});
//#endregion
//#region Update
const updateCoin = trycatch(async (req, res, next) => {
  let frontImg = req.files?.file1 ? fileUpload(req.files.file1) : null;
  let backImg = req.files?.file2 ? fileUpload(req.files.file2) : null;
  const data = {
    ...req.body,
    updated_by: req.user.id,
    updated_at: moment().format("YYYY-MM-DD HH:mm:ss"),
  };
  if (frontImg) {
    data.imageUrl_front = frontImg;
  }
  if (backImg) {
    data.imageUrl_back = backImg;
  }
  await (
    await connection
  )
    .query("UPDATE coins SET ? WHERE id=? ", [data, req.params.id])
    .then(([data]) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      throw new Error(err);
    });
});
const updateCountry = trycatch(async (req, res, next) => {
  await (
    await connection
  )
    .query("UPDATE countries SET ? WHERE id=? ", [req.body, req.params.id])
    .then(([data]) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      throw new Error(err);
    });
});
const updateComposition = trycatch(async (req, res, next) => {
  await (
    await connection
  )
    .query("UPDATE compositions SET ? WHERE id=? ", [req.body, req.params.id])
    .then(([data]) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      throw new Error(err);
    });
});
const updateQuality = trycatch(async (req, res, next) => {
  await (
    await connection
  )
    .query("UPDATE qualities SET ? WHERE id=? ", [req.body, req.params.id])
    .then(([data]) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      throw new Error(err);
    });
});
const updateType = trycatch(async (req, res, next) => {
  await (
    await connection
  )
    .query("UPDATE types SET ? WHERE id=? ", [req.body, req.params.id])
    .then(([data]) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      throw new Error(err);
    });
});
//#endregion
//#region Delete
const deleteCoin = trycatch(async (req, res, next) => {
  await (
    await connection
  )
    .query(
      "SELECT * FROM coins WHERE id=?; UPDATE coins SET deleted=1 WHERE id=? ",
      [req.params.id, req.params.id]
    )
    .then(([data]) => {
      if (data[1].affectedRows) {
        res.status(200).json({ message: "Deleted", data: data[0] });
      } else {
        res.status(200).json({ message: "Nothing deleted", data: data[0] });
      }
    })
    .catch((err) => {
      throw new Error(err);
    });
});
const deleteCountry = trycatch(async (req, res, next) => {
  await (
    await connection
  )
    .query(
      "SELECT * FROM countries WHERE id=?; DELETE FROM countries WHERE id=? ",
      [req.params.id, req.params.id]
    )
    .then(([data]) => {
      if (data[1].affectedRows) {
        res.status(200).json({ message: "Deleted", data: data[0] });
      } else {
        res.status(200).json({ message: "Nothing deleted", data: data[0] });
      }
    })
    .catch((err) => {
      throw new Error(err);
    });
});
const deleteComposition = trycatch(async (req, res, next) => {
  await (
    await connection
  )
    .query(
      "SELECT * FROM compositions WHERE id=?; DELETE FROM compositions WHERE id=? ",
      [req.params.id, req.params.id]
    )
    .then(([data]) => {
      if (data[1].affectedRows) {
        res.status(200).json({ message: "Deleted", data: data[0] });
      } else {
        res.status(200).json({ message: "Nothing deleted", data: data[0] });
      }
    })
    .catch((err) => {
      throw new Error(err);
    });
});
const deleteQuality = trycatch(async (req, res, next) => {
  await (
    await connection
  )
    .query(
      "SELECT * FROM qualities WHERE id=?; DELETE FROM qualities WHERE id=? ",
      [req.params.id, req.params.id]
    )
    .then(([data]) => {
      if (data[1].affectedRows) {
        res.status(200).json({ message: "Deleted", data: data[0] });
      } else {
        res.status(200).json({ message: "Nothing deleted", data: data[0] });
      }
    })
    .catch((err) => {
      throw new Error(err);
    });
});
const deleteType = trycatch(async (req, res, next) => {
  await (
    await connection
  )
    .query("SELECT * FROM types WHERE id=?; DELETE FROM types WHERE id=? ", [
      req.params.id,
      req.params.id,
    ])
    .then(([data]) => {
      if (data[1].affectedRows) {
        res.status(200).json({ message: "Deleted", data: data[0] });
      } else {
        res.status(200).json({ message: "Nothing deleted", data: data[0] });
      }
    })
    .catch((err) => {
      throw new Error(err);
    });
});
//#endregion
const increaseView = trycatch(async (req, res, next) => {
  const { params } = req;
  await (
    await connection
  )
    .query("SELECT increase_coin_view(?) as view_count", [params.id])
    .then(([data]) => {
      return res.status(200).json(data[0]);
    })
    .catch((err) => {
      throw new Error(err);
    });
});
const getViewCount = trycatch(async (req, res, next) => {
  const { params } = req;
  await (
    await connection
  )
    .query("SELECT view_count FROM coin_views WHERE coinId=?", [params.id])
    .then(([data]) => {
      return res.status(200).json(data[0]);
    })
    .catch((err) => {
      throw new Error(err);
    });
});
const totalCoinViews = trycatch(async (req, res, next) => {
  await (
    await connection
  )
    .query("SELECT SUM(view_count) as count from coin_views")
    .then(([data]) => {
      return res.status(200).json(data[0]);
    })
    .catch((err) => {
      throw new Error(err);
    });
});
const totalCoins = trycatch(async (req, res, next) => {
  await (
    await connection
  )
    .query("SELECT COUNT(*) as count FROM coins")
    .then(([data]) => {
      return res.status(200).json(data[0]);
    })
    .catch((err) => {
      throw new Error(err);
    });
});
module.exports = {
  getAllCoins,
  getAllCoinsView,
  getCoinById,
  getCoinByIdView,
  getAllCountries,
  getAllCompositions,
  getAllQualities,
  getAllTypes,
  addNewCoin,
  addNewCountry,
  addNewComposition,
  addNewQuality,
  addNewType,
  updateCoin,
  updateCountry,
  updateComposition,
  updateQuality,
  updateType,
  deleteCoin,
  deleteCountry,
  deleteComposition,
  deleteQuality,
  deleteType,
  increaseView,
  getViewCount,
  getSimilarCoins,
  totalCoinViews,
  totalCoins,
};
