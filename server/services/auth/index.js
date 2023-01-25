const { connection } = require("../../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { trycatch } = require("../../utils/trycatch");

//Login current user
const login = trycatch(async (req, res, next) => {
  const { username, password } = req.body;
  const [rows] = await (
    await connection
  ).execute(`SELECT * FROM users WHERE username = ?`, [username]);

  //Check user
  const user = rows[0];
  console.log(user);
  if (!user) throw new Error("User not found");

  //Check password
  const passwordIsValid = bcrypt.compareSync(password, user.password);
  if (!passwordIsValid) throw new Error("Incorrect password.");

  // Generate an access token
  const accessToken = jwt.sign(
    { username: user.username },
    process.env.JWT_SECRET_TOKEN
  );

  res.json({ accessToken });
});

//Register new User
const register = trycatch(async (req, res) => {
  const { username, password } = req.body;
  const hashPass = bcrypt.hashSync(password, 10);
  await (
    await connection
  )
    .query("INSERT INTO users (username, password) VALUES  (?,?)", [
      username,
      hashPass,
    ])
    .then(([data]) => {
      return res.status(200).json(data.insertId);
    })
    .catch((err) => {
      throw new Error(err);
    });
});

module.exports = { login, register };
