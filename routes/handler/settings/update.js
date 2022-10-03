const { Setting } = require("../../../models");
const Validator = require("fastest-validator");

module.exports = async (req, res) => {
  const v = new Validator();

  const schemaValidation = {
    name: "string|optional: true",
    description: "string|optional: true",
    value: "string|optional: true",
  };

  if (Object.entries(req.body).length === 0) {
    return res.status(400).json({
      status: "error",
      message: "request body empty",
    });
  }

  const validate = v.validate(req.body, schemaValidation);
  if (validate.length) {
    return res.status(400).json({
      status: "error",
      message: validate,
    });
  }

  const id = req.params.id;
  const setting = await Setting.findByPk(id);

  if (!setting) {
    return res.status(404).json({
      status: "error",
      message: "setting not found",
    });
  }

  const { name, description, value } = req.body;
  await setting.update({
    name,
    description,
    value,
  });

  return res.json({
    status: "success",
    data: {
      id: setting.id,
      name,
      description,
      value,
    },
  });
};
