const { AbsenceData, Setting } = require("../../../models");
const Validator = require("fastest-validator");
const { Op } = require("sequelize");
module.exports = async (req, res) => {
  const v = new Validator();

  const schemaValidation = {
    date: "string|empty:false",
    clock_in: "string|empty:false",
    coordinate_clock_in: "string|empty:false",
  };

  const validate = v.validate(req.body, schemaValidation);
  if (validate.length) {
    return res.status(400).json({
      status: "error",
      message: validate,
    });
  }

  const { date, clock_in, coordinate_clock_in } = req.body;
  const user_id = req.active_user.data.user_id;

  const isAlreadyClockIn = await AbsenceData.findOne({
    where: {
      [Op.and]: [{ user_id: user_id }, { date: date }],
    },
  });

  if (isAlreadyClockIn) {
    return res.status(409).json({
      status: "error",
      message: "user already clock in",
    });
  }

  const clock_in_setting = await Setting.findOne({
    where: {
      name: "clock-in",
    },
  });

  req.body.clock_in_status = "ONTIME";
  if (clock_in_setting.value < clock_in) {
    req.body.clock_in_status = "LATE";
  }

  const absenceData = await AbsenceData.create({
    user_id: user_id,
    date: date,
    clock_in: clock_in,
    coordinate_clock_in: coordinate_clock_in,
    clock_in_status: req.body.clock_in_status,
  });

  return res.json({
    status: "success",
    data: absenceData,
  });
};
