const { Divsion, JobTitle, Division } = require("../../../models");
const Validator = require("fastest-validator");

module.exports = async (req, res) => {
  const v = new Validator();

  const name = req.body.name;
  const description = req.body.description;
  const division_id = req.body.division_id;

  const schemaValidation = {
    name: "string|empty:false",
    description: "string|empty:false",
    division_id: "number|empty:false",
  };

  const validate = v.validate(req.body, schemaValidation);
  if (validate.length) {
    return res.status(400).json({
      status: "error",
      message: validate,
    });
  }

  const division = await Division.findByPk(division_id);
  if (!division) {
    return res.status(404).json({
      status: "error",
      message: "division not found",
    });
  }

  const newJobTitle = await JobTitle.create({
    name: name,
    description: description,
    division_id: division_id,
  });

  return res.json({
    status: "success",
    data: {
      id: newJobTitle.id,
      name: newJobTitle.name,
      description: newJobTitle.description,
      division: division.name,
    },
  });
};
