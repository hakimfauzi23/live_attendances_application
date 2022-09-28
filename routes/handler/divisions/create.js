const { Division } = require("../../../models");
const Validator = require("fastest-validator");

module.exports = async (req, res) => {
  const v = new Validator();

  const name = req.body.name;
  const description = req.body.description;

  const schemaValidation = {
    name: "string|empty:false",
    description: "string|empty:false",
  };

  const validate = v.validate(req.body, schemaValidation);
  if (validate.length) {
    return res.status(400).json({
      status: "error",
      message: validate,
    });
  }

  const newDivision = await Division.create({
    name: name,
    description: description,
  });

  return res.json({
    status: "success",
    data: {
      id: newDivision.id,
      name: newDivision.name,
      description: newDivision.description,
    },
  });
};
