const { User } = require("../../../models");

module.exports = async (req, res) => {
  const id = req.params.id;

  const user = await User.findByPk(id, { attributes: ["id", "employee_id"] });

  if (!user) {
    return res.status(404).json({ status: "error", message: "user not found" });
  }

  const employee_id = user.employee_id;
  await User.destroy({
    where: { id },
  });

  return res.json({
    status: "success",
    message: `successfully deleted User with Employee ID: ${employee_id}`,
  });
};
