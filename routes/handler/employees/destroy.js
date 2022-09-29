const { Employee } = require("../../../models");

module.exports = async (req, res) => {
  const id = req.params.id;

  const employee = await Employee.findByPk(id, { attributes: ["id"] });

  if (!employee) {
    return res
      .status(404)
      .json({ status: "error", message: "employee not found" });
  }

  await Employee.destroy({
    where: { id },
  });

  return res.json({
    status: "success",
    message: `successfully deleted Employee with ID: ${id}`,
  });
};
