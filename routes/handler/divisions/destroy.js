const { Division } = require("../../../models");

module.exports = async (req, res) => {
  const id = req.params.id;

  const division = await Division.findByPk(id);

  if (!division) {
    return res
      .status(404)
      .json({ status: "error", message: "division not found" });
  }

  const divisionName = division.name;
  await Division.destroy({
    where: { id },
  });

  return res.json({
    status: "success",
    message: `successfully deleted ${divisionName} Division`,
  });
};
