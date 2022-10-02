const Validator = require("fastest-validator");
const bcrypt = require("bcrypt");
const { User } = require("../../../models");

module.exports = async (req, res) => {
  const v = new Validator();

  const schema = {
    current_password: "string|empty:false",
    new_password: "string|empty:false|min:6",
    confirm_password: "string|empty:false|min:6",
  };
  const validate = v.validate(req.body, schema);
  if (validate.length) {
    return res.status(400).json({
      status: "error",
      message: validate,
    });
  }

  const userId = req.active_user.data.user_id;
  const { current_password, new_password, confirm_password } = req.body;
  const user = await User.findOne({
    where: { id: userId },
    attributes: ["id","password_hash"],
  });

  const isValidPassword = await bcrypt.compare(
    current_password,
    user.password_hash
  );

  if (!isValidPassword) {
    return res.status(403).json({
      status: "error",
      message: "current password is not valid",
    });
  }

  if (new_password !== confirm_password) {
    return res.status(400).json({
      status: "error",
      message: "confirm password must be same with new password",
    });
  }

  if (current_password === new_password) {
    return res.status(400).json({
      status: "error",
      message: "new password can't be same with current password",
    });
  }

  const password_hash = await bcrypt.hash(new_password, 10);
  await user.update({
    password_hash: password_hash,
  });

  return res.json({
    status: "success",
    message: "password has been changed successfully",
  });
};
