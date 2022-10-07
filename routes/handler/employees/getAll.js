const Sqlize = require("sequelize");
const { Employee } = require("../../../models");
const Pagination = require("../../../helpers/Pagination");

module.exports = async (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = Pagination.getPagination(page, size);
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

  const data = await Employee.findAndCountAll({
    attributes: attributes,
    include: include,
    where: condition,
    limit,
    offset,
  });

  const employees = Pagination.getPagingData(data, page, limit);

  return res.json({
    status: "success",
    data: employees,
  });
};
