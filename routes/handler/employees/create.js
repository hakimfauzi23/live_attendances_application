const { Employee, JobTitle } = require("../../../models");
const Validator = require("fastest-validator");

module.exports = async (req, res) => {
  const v = new Validator();

  const { name, date_of_birth, job_title_id, email, phone_number } = req.body;

  const schemaValidation = {
    name: "string|empty:false",
    date_of_birth: "string|empty:false",
    job_title_id: "number|empty:false",
    email: "email|empty:false",
    phone_number: "string|empty:false",
  };

  const validate = v.validate(req.body, schemaValidation);
  if (validate.length) {
    return res.status(400).json({
      status: "error",
      message: validate,
    });
  }

  const isJobExists = await JobTitle.findByPk(job_title_id, {
    attributes: ["id", "name", "division_id"],
  });
  if (!isJobExists) {
    return res.status(404).json({
      status: "error",
      message: "job title not found",
    });
  }

  const isEmailExists = await Employee.findOne({
    where: { email: email },
    attributes: ["id", "name", "job_title_id"],
  });
  if (isEmailExists) {
    return res.status(400).json({
      status: "error",
      message: "email already registered",
    });
  }

  const isPhoneNumberExists = await Employee.findOne({
    where: { phone_number: phone_number },
    attributes: ["id", "name", "job_title_id"],
  });
  if (isPhoneNumberExists) {
    return res.status(400).json({
      status: "error",
      message: "phone number already registered",
    });
  }

  const newEmployee = await Employee.create({
    name: name,
    date_of_birth: date_of_birth,
    job_title_id: job_title_id,
    email: email,
    phone_number: phone_number,
  });

  return res.json({
    status: "success",
    data: newEmployee,
  });
};
