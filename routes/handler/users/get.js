const { User } = require("../../../models");

module.exports = async (req, res) => {
  const id = req.params.id;
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

  const user = await User.findByPk(id, {
    attributes: attributes,
    include: include,
  });

  if (!user) {
    return res.status(404).json({
      status: "error",
      message: "user not found",
    });
  }

  return res.json({
    status: "success",
    data: user,
  });
};
