const { Division } = require("../../../models");
const Validator = require("fastest-validator");

module.exports = async (req, res) => {
  const v = new Validator();

  const schemaValidation = {
    name: "string|optional: true",
    description: "string|optional: true",
  };

  if (!req.body.name && !req.body.description) {
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
  const division = await Division.findByPk(id);

  if (!division) {
    return res.status(404).json({
      status: "error",
      message: "division not found",
    });
  }

  const { name, description } = req.body;
  await division.update({
    name,
    description,
  });

  return res.json({
    status: "success",
    data: {
      id: division.id,
      name,
      description,
    },
  });
};
