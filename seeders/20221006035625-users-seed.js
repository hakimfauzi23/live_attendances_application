"use strict";
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const employeeCounts = 21;
    let data = [];
    for (let i = 1; i <= employeeCounts; i++) {
      data.push({
        employee_id: i,
        password_hash: await bcrypt.hash("Admin!23", 10),
        role: "EMPLOYEE",
      });
    }
    data.push(
      ...[
        {
          employee_id: "22",
          password_hash: await bcrypt.hash("Admin!23", 10),
          role: "ADMIN",
        },
        {
          employee_id: "23",
          password_hash: await bcrypt.hash("Admin!23", 10),
          role: "HR",
        },
      ]
    );
    return queryInterface.bulkInsert("users", data, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
