const Sqlize = require("sequelize");
const { Division } = require("../../../models");

module.exports = async (req, res) => {
  const attributes = ["id", "name", "description"];
  const id = req.params.id;

  const division = await Division.findByPk(id, {
    attributes: attributes,
  });

  if (!division) {
    return res.status(404).json({
      status: "error",
      message: "division not found",
    });
  }

  return res.json({
    status: "success",
    data: division,
  });
};
