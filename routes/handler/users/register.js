const Validator = require("fastest-validator");
const bcrypt = require("bcrypt");
const { User, Employee } = require("../../../models");

module.exports = async (req, res) => {
  const v = new Validator();
  const schema = {
    employee_id: "number|empty:false",
    password_hash: "string|min:6",
    role: { type: "enum", values: ["ADMIN", "HR", "EMPLOYEE"] },
  };

  const validate = v.validate(req.body, schema);
  if (validate.length) {
    return res.status(400).json({
      status: "error",
      message: validate,
    });
  }

  let { employee_id, password_hash, role } = req.body;

  const employeeData = await Employee.findByPk(employee_id, {
    attributes: ["id", "name", "email", "phone_number"],
    include: [
      {
        association: "jobTitles",
        attributes: ["name"],
        include: [
          {
            association: "division",
            attributes: ["name"],
          },
        ],
      },
    ],
  });
  if (!employeeData) {
    return res.status(404).json({
      status: "error",
      message: "employee is not found",
    });
  }

  const isUserExist = await User.findOne({
    where: { employee_id: employee_id },
    attributes: ["id"],
  });
  if (isUserExist) {
    return res.status(409).json({
      status: "error",
      message: "user is already exist",
    });
  }

  data = {
    employee_id: employee_id,
    password_hash: await bcrypt.hash(password_hash, 10),
    role: role,
  };

  const newUser = await User.create(data);

  if (!role) {
    role = "EMPLOYEE";
  }

  employeeData.role = role;
  return res.json({
    status: "success",
    data: { employee_data: employeeData, role: role },
  });
};
