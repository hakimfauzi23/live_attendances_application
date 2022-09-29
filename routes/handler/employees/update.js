const { Employee, JobTitle } = require("../../../models");
const Validator = require("fastest-validator");

module.exports = async (req, res) => {
  const v = new Validator();

  const schemaValidation = {
    name: "string|optional:true",
    date_of_birth: "string|optional:true",
    job_title_id: "number|optional:true",
    email: "email|optional:true",
    phone_number: "string|optional:true",
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
  const { name, date_of_birth, job_title_id, email, phone_number } = req.body;

  const employee = await Employee.findByPk(id, {
    attributes: ["id", "name", "job_title_id"],
  });
  if (!employee) {
    return res.status(404).json({
      status: "error",
      message: "employee not found",
    });
  }

  if (job_title_id) {
    const isJobExists = await JobTitle.findByPk(job_title_id, {
      attributes: ["id", "name", "division_id"],
    });
    if (!isJobExists) {
      return res.status(404).json({
        status: "error",
        message: "job title not found",
      });
    }
  }

  if (email) {
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
  }

  if (phone_number) {
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
  }

  await employee.update({
    name,
    date_of_birth,
    job_title_id,
    email,
    phone_number,
  });

  return res.json({
    status: "success",
    data: employee,
  });
};
