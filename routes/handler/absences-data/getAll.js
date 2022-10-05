const { AbsenceData, Setting } = require("../../../models");
const SQL = require("sequelize");

module.exports = async (req, res) => {
  month = req.query.month ?? new Date().getMonth() + 1;
  year = req.query.year ?? new Date().getFullYear();
  const attributes = [
    "date",
    "clock_in",
    "clock_out",
    "coordinate_clock_in",
    "coordinate_clock_out",
    "clock_in_status",
    "clock_out_status",
  ];
  const include = [
    {
      association: "user",
      attributes: ["id", "role"],
      include: [
        {
          association: "employee",
          attributes: ["id", "name", "email"],
          include: [
            {
              association: "jobTitles",
              attributes: ["name"],
            },
          ],
        },
      ],
    },
  ];

  const absencesData = await AbsenceData.findAndCountAll({
    attributes,
    include,
    where: {
      date: SQL.where(SQL.fn("MONTH", SQL.col("date")), parseInt(month)),
      [SQL.Op.and]: SQL.where(SQL.fn("YEAR", SQL.col("date")), parseInt(year)),
    },
    order: [["date", "DESC"]],
  });

  return res.json({
    status: "success",
    data: absencesData,
  });
};
