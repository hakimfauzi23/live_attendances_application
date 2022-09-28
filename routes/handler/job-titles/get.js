const Sqlize = require("sequelize");
const { JobTitle } = require("../../../models");

module.exports = async (req, res) => {
  const attributes = ["id", "name", "description"];
  const id = req.params.id;

  const jobTitle = await JobTitle.findByPk(id, {
    attributes: attributes,
    include: [
      { association: "division", attributes: ["id", "name", "description"] },
    ],
  });

  if (!jobTitle) {
    return res.status(404).json({
      status: "error",
      message: "job title not found",
    });
  }

  return res.json({
    status: "success",
    data: jobTitle,
  });
};
