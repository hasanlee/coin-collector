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
  if (!user) throw new Error("User not found");

  //Check password
  const passwordIsValid = bcrypt.compareSync(password, user.password);
  if (!passwordIsValid) throw new Error("Incorrect password.");

  // Generate an access token
  const accessToken = jwt.sign(
    {
      id: user.id,
      username: user.username,
      fullname: user.fullname,
      email: user.email,
      avatarId: user.avatarId,
      roleId: user.roleId,
    },
    process.env.JWT_SECRET_TOKEN,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );
  res.json({
    accessToken,
    expiredAt: new Date(jwt.decode(accessToken).exp * 1000),
  });
});

const logout = trycatch(async (req, res, next) => {
  console.log(req);
});

//Register new User
const register = trycatch(async (req, res) => {
  const { username, password, email } = req.body;
  const hashPass = bcrypt.hashSync(password, 10);
  await (
    await connection
  )
    .query("INSERT INTO users (username, password,email) VALUES  (?,?,?)", [
      username,
      hashPass,
      email,
    ])
    .then(([data]) => {
      return res.status(200).json(data.insertId);
    })
    .catch((err) => {
      throw new Error(err);
    });
});

module.exports = { login, register };
