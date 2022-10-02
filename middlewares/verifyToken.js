const jwt = require("jsonwebtoken");
const { JWT_KEY } = process.env;

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  jwt.verify(token, JWT_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: err.message });
    }

    req.active_user = decoded;
    console.log(req.active_user)
    return next();
  });
};
