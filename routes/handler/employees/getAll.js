const Sqlize = require("sequelize");
const { Employee } = require("../../../models");

module.exports = async (req, res) => {
  const name = req.query.name;
  let condition = name ? { name: { [Sqlize.Op.like]: `%${name}%` } } : null;
  const attributes = ["id", "name", "date_of_birth", "email", "phone_number"];
  const include = [
    {
      association: "jobTitles",
      attributes: ["name"],
      include: [
        {
          association: "division",
          attributes: ["name"],
        },
      ],
    },
  ];

  const employees = await Employee.findAll({
    attributes: attributes,
    include: include,
    where: condition,
  });

  return res.json({
    status: "success",
    data: employees,
  });
};
