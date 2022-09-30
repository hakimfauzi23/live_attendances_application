const Validator = require("fastest-validator");
const bcrypt = require("bcrypt");
const { User, Employee } = require("../../../models");

module.exports = async (req, res) => {
  const v = new Validator();
  const schema = {
    password_hash: "string|min:6|optional",
    role: { type: "enum", values: ["ADMIN", "HR", "EMPLOYEE"], optional: true },
  };

  if (Object.entries(req.body).length === 0) {
    return res.status(400).json({
      status: "error",
      message: "request body empty",
    });
  }

  const validate = v.validate(req.body, schema);
  if (validate.length) {
    return res.status(400).json({
      status: "error",
      message: validate,
    });
  }

  const id = req.params.id;
  let { password_hash, role } = req.body;

  const user = await User.findOne({
    where: { id: id },
    attributes: ["id", "employee_id", "role"],
  });

  if (!user) {
    return res.status(404).json({
      status: "error",
      message: "user is not found",
    });
  }

  if (!password_hash) {
    password_hash = user.password;
  }

  if (password_hash) {
    password_hash = await bcrypt.hash(password_hash, 10);
  }

  await user.update({
    role: role,
    password_hash: password_hash,
  });

  if (!role) {
    role = "EMPLOYEE";
  }

  return res.json({
    status: "success",
    data: user,
  });
};
