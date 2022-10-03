const { Setting } = require("../../../models");
const Validator = require("fastest-validator");

module.exports = async (req, res) => {
  const v = new Validator();

  const { name, description, value } = req.body;

  const schemaValidation = {
    name: "string|empty:false",
    description: "string|empty:false",
    value: "string|empty:false",
  };

  const validate = v.validate(req.body, schemaValidation);
  if (validate.length) {
    return res.status(400).json({
      status: "error",
      message: validate,
    });
  }

  const newSetting = await Setting.create({
    name: name,
    description: description,
    value: value,
  });

  return res.json({
    status: "success",
    data: newSetting,
  });
};
