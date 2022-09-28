const { JobTitle, Division } = require("../../../models");
const Validator = require("fastest-validator");

module.exports = async (req, res) => {
  const id = req.params.id;
  const v = new Validator();

  if (Object.entries(req.body).length === 0) {
    return res.status(400).json({
      status: "error",
      message: "request body empty",
    });
  }

  const schemaValidation = {
    name: "string|optional: true",
    description: "string|optional: true",
    division_id: "number|optional: true",
  };

  const validate = v.validate(req.body, schemaValidation);
  if (validate.length) {
    return res.status(400).json({
      status: "error",
      message: validate,
    });
  }

  const jobTitle = await JobTitle.findByPk(id, {
    attributes: ["id", "name", "description", "division_id"],
  });

  if (!jobTitle) {
    return res.status(404).json({
      status: "error",
      message: "job title not found",
    });
  }

  const { name, description, division_id } = req.body;

  if (division_id) {
    const division = await Division.findByPk(division_id);
    if (!division) {
      return res.status(404).json({
        status: "error",
        message: "division not found",
      });
    }
  }

  await jobTitle.update({
    name,
    description,
    division_id,
  });

  return res.json({
    status: "success",
    data: {
      id: jobTitle.id,
      name,
      description,
      division_id: division_id,
    },
  });
};
