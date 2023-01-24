const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET_TOKEN, (err, user) => {
      if (err) {
        const error = new Error("Forbidden!");
        error.status = 403;
        throw error;
        //return res.status(403).json({ error: true, message: "Access denied!" });
      }

      req.user = user;
      next();
    });
  } else {
    const error = new Error("Unauthorized!");
    error.status = 401;
    throw error;
    //res.status(401).json({ error: true, message: "Unauthorized" });
  }
};

module.exports = { auth };
