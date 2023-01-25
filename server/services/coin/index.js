const { connection } = require("./db");
const { trycatch } = require("../../utils/trycatch");

//const funcTemplate = trycatch(async (req, res, next) => {});

//Get Data from DB
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
const getAllCoinsCustom = trycatch(async (req, res, next) => {
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
const getCoinById = trycatch(async (req, res, next) => {
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
const getCoinByIdCustom = trycatch(async (req, res, next) => {
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
  await (
    await connection
  )
    .query("SELECT * FROM countries;")
    .then(([rows]) => {
      return res.status(200).json(rows);
    })
    .catch((err) => {
      throw new Error(err);
    });
});
const getAllCompositions = trycatch(async (req, res, next) => {
  await (
    await connection
  )
    .query("SELECT * FROM compositions;")
    .then(([rows]) => {
      return res.status(200).json(rows);
    })
    .catch((err) => {
      throw new Error(err);
    });
});
const getAllQualities = trycatch(async (req, res, next) => {
  await (
    await connection
  )
    .query("SELECT * FROM qualities;")
    .then(([rows]) => {
      return res.status(200).json(rows);
    })
    .catch((err) => {
      throw new Error(err);
    });
});
const getAllTypes = trycatch(async (req, res, next) => {
  await (
    await connection
  )
    .query("SELECT * FROM types;")
    .then(([rows]) => {
      return res.status(200).json(rows);
    })
    .catch((err) => {
      throw new Error(err);
    });
});

//Insert data to DB
const addNewCoin = trycatch(async (req, res, next) => {
  await (
    await connection
  )
    .query("INSERT INTO coins SET ?", [req.body])
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

//Update
const updateCoin = trycatch(async (req, res, next) => {
  await (
    await connection
  )
    .query("UPDATE coins SET ? WHERE id=? ", [req.body, req.params.id])
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

//Delete
const deleteCoin = trycatch(async (req, res, next) => {
  await (
    await connection
  )
    .query(
      "SELECT * FROM coins WHERE id=?; UPDATE coins SET 'deleted'=1 WHERE id=? ",
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

module.exports = {};
