const Sqlize = require("sequelize");
const { Setting } = require("../../../models");

module.exports = async (req, res) => {
  const name = req.query.name;
  let condition = name ? { name: { [Sqlize.Op.like]: `%${name}%` } } : null;
  let attributes = ["id", "name", "description","value"];

  const settings = await Setting.findAll({
    where: condition,
    attributes: attributes,
  });

  return res.json({
    status: "success",
    data: settings,
  });
};
