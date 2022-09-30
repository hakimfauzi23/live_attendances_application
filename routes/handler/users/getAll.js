const { User } = require("../../../models");

module.exports = async (req, res) => {
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
  const users = await User.findAll({
    attributes: attributes,
    include: include,
  });

  return res.json({
    status: "success",
    data: users,
  });
};
