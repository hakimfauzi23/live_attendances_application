const Sqlize = require("sequelize");
const { Division } = require("../../../models");

module.exports = async (req, res) => {
  const name = req.query.name;
  let condition = name ? { name: { [Sqlize.Op.like]: `%${name}%` } } : null;
  let attributes = ["id", "name", "description"];

  const divisions = await Division.findAll({
    where: condition,
    attributes: attributes,
  });

  return res.json({
    status: "success",
    data: divisions,
  });
};
