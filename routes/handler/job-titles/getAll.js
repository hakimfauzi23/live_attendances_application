const Sqlize = require("sequelize");
const { JobTitle } = require("../../../models");

module.exports = async (req, res) => {
  const name = req.query.name;
  let condition = name ? { name: { [Sqlize.Op.like]: `%${name}%` } } : null;
  let attributes = ["id", "name", "description"];

  const jobTitles = await JobTitle.findAll({
    where: condition,
    attributes: attributes,
    include: [
      { association: "division", attributes: ["id", "name", "description"] },
    ],
  });

  return res.json({
    status: "success",
    data: jobTitles,
  });
};
