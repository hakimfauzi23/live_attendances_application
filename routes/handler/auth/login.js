const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User, RefreshToken } = require("../../../models");
const Validator = require("fastest-validator");
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
    password_hash: "string|empty:false",
  };

  const validate = v.validate(req.body, schema);
  if (validate.length) {
    return res.status(400).json({
      status: "error",
      message: validate,
    });
  }

  const user = await User.findOne({
    attributes: ["id", "employee_id", "role", "password_hash"],
    include: [
      {
        association: "employee",
        attributes: ["id", "name", "email", "phone_number"],
        where: { email: req.body.email },
        include: [
          {
            association: "jobTitles",
            attributes: ["name"],
            include: [
              {
                association: "division",
                attributes: ["name"],
              },
            ],
          },
        ],
      },
    ],
  });

  if (!user) {
    return res.status(404).json({
      status: "error",
      message: "user not found",
    });
  }

  const isValidPassword = await bcrypt.compare(
    req.body.password_hash,
    user.password_hash
  );

  if (!isValidPassword) {
    return res.status(404).json({
      status: "error",
      message: "user not found",
    });
  }

  const data = {
    user_id: user.id,
    employee_id: user.employee.id,
    name: user.employee.name,
    email: user.employee.email,
    phone_number: user.employee.phone_number,
    role: user.role,
    job_title: user.employee.jobTitles,
  };

  const token = jwt.sign({ data }, JWT_KEY, {
    expiresIn: JWT_ACCESS_TOKEN_EXPIRED,
  });
  const refreshToken = jwt.sign({ data }, JWT_KEY_REFRESH_TOKEN, {
    expiresIn: JWT_REFRESH_TOKEN_EXPIRED,
  });

  await RefreshToken.create({
    token: refreshToken,
    user_id: user.id,
  });

  return res.json({
    status: "success",
    data: {
      token,
      refresh_token: refreshToken,
    },
  });
};
