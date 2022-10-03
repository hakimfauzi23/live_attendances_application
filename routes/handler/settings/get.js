const Sqlize = require("sequelize");
const { Setting } = require("../../../models");

module.exports = async (req, res) => {
  const attributes = ["id", "name", "description","value"];
  const id = req.params.id;

  const setting = await Setting.findByPk(id, {
    attributes: attributes,
  });

  if (!setting) {
    return res.status(404).json({
      status: "error",
      message: "setting not found",
    });
  }

  return res.json({
    status: "success",
    data: setting,
  });
};
