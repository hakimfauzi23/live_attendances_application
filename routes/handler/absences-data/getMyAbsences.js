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

  const myAbsences = await AbsenceData.findAndCountAll({
    attributes,
    where: {
      date: SQL.where(SQL.fn("MONTH", SQL.col("date")), parseInt(month)),
      [SQL.Op.and]: SQL.where(SQL.fn("YEAR", SQL.col("date")), parseInt(year)),
      user_id: req.active_user.data.user_id,
    },
    order: [["date", "DESC"]],
  });

  return res.json({
    status: "success",
    data: myAbsences,
  });
};
