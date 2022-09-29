const Sqlize = require("sequelize");
const { Employee } = require("../../../models");

module.exports = async (req, res) => {
  const id = req.params.id;
  const attributes = [
    "id",
    "name",
    "date_of_birth",
    "job_title_id",
    "email",
    "phone_number",
  ];
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

  const employee = await Employee.findByPk(id, {
    attributes: attributes,
    include: include,
  });

  if (!employee) {
    return res.status(404).json({
      status: "error",
      message: "employee not found",
    });
  }

  return res.json({
    status: "success",
    data: employee,
  });
};
