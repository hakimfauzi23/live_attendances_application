const { AbsenceData, Setting } = require("../../../models");
const Validator = require("fastest-validator");
const { Op } = require("sequelize");
const clockIn = require("./clockIn");
module.exports = async (req, res) => {
  const v = new Validator();

  const schemaValidation = {
    clock_out: "string|empty:false",
    coordinate_clock_out: "string|empty:false",
  };

  const validate = v.validate(req.body, schemaValidation);
  if (validate.length) {
    return res.status(400).json({
      status: "error",
      message: validate,
    });
  }

  const { date, clock_out, coordinate_clock_out } = req.body;
  const user_id = req.active_user.data.user_id;

  let absenceData = await AbsenceData.findOne({
    where: {
      [Op.and]: [{ user_id: user_id }, { date: date }],
    },
  });

  if (!absenceData) {
    return res.status(404).json({
      status: "error",
      message: "absence data not found",
    });
  }

  if(absenceData.clock_out !== null) {
    return res.status(404).json({
        status: "error",
        message: "user already clock-out",
      });  
  }
  const clock_out_setting = await Setting.findOne({
    where: {
      name: "clock-out",
    },
  });

  req.body.clock_out_status = "ONTIME";
  if (clock_out_setting.value > clock_out) {
    req.body.clock_out_status = "TOO-EARLY";
  }

  await absenceData.update({
    clock_out: clock_out,
    coordinate_clock_out: coordinate_clock_out,
    clock_out_status: req.body.clock_out_status,
  });

  return res.json({
    status: "success",
    data: absenceData,
  });
};
