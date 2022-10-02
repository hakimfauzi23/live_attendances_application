const Validator = require("fastest-validator");
const jwt = require("jsonwebtoken");
const {
  JWT_KEY,
  JWT_KEY_REFRESH_TOKEN,
  JWT_ACCESS_TOKEN_EXPIRED,
  JWT_REFRESH_TOKEN_EXPIRED,
} = process.env;

module.exports = async (req, res) => {
  const v = new Validator();
  const schema = {
    email: "email|empty:false",
    refresh_token: "string|empty:false",
  };

  const validate = v.validate(req.body, schema);
  if (validate.length) {
    return res.status(400).json({
      status: "error",
      message: validate,
    });
  }

  const { refresh_token, email } = req.body;

  jwt.verify(refresh_token, JWT_KEY_REFRESH_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        status: "error",
        message: err.message,
      });
    }

    if (email !== decoded.data.email) {
      return res.status(400).json({
        status: "error",
        message: "email is not valid",
      });
    }

    const token = jwt.sign({ data: decoded.data }, JWT_KEY, {
      expiresIn: JWT_ACCESS_TOKEN_EXPIRED,
    });

    return res.json({
      status: "success",
      data: token,
    });
  });
};
