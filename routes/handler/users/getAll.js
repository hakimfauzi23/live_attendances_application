const { User } = require("../../../models");
const Pagination = require("../../../helpers/Pagination");

module.exports = async (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = Pagination.getPagination(page, size);
  const attributes = ["id", "role"];
  const include = [
    {
      association: "employee",
      attributes: ["id", "name", "email", "phone_number"],
      include: [
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
      ],
    },
  ];
  const data = await User.findAndCountAll({
    attributes: attributes,
    include: include,
    limit,
    offset,
  });

  const users = Pagination.getPagingData(data, page, limit);
  return res.json({
    status: "success",
    data: users,
  });
};
