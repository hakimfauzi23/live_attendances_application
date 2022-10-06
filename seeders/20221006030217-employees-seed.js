"use strict";
// import { faker } from "@faker-js/faker";
const { faker } = require("@faker-js/faker");
module.exports = {
  async up(queryInterface, Sequelize) {
    faker.setLocale("id_ID");
    const fakeEmployees = 20;
    let data = [];
    for (let i = 0; i < fakeEmployees; i++) {
      data.push({
        name: faker.name.fullName(),
        date_of_birth: faker.date.past(10, "2001-01-01T00:00:00.000Z"),
        job_title_id: faker.datatype.number({ min: 1, max: 5 }),
        email: faker.internet.email(),
        phone_number: faker.phone.number(),
      });
    }
    data.push(
      ...[
        {
          name: "EMPLOYEE",
          date_of_birth: faker.date.past(10, "2001-01-01T00:00:00.000Z"),
          job_title_id: 4,
          email: "employee@mail.com",
          phone_number: faker.phone.number(),
        },
        {
          name: "ADMIN",
          date_of_birth: faker.date.past(10, "2001-01-01T00:00:00.000Z"),
          job_title_id: 4,
          email: "admin@mail.com",
          phone_number: faker.phone.number(),
        },
        {
          name: "HR",
          date_of_birth: faker.date.past(10, "2001-01-01T00:00:00.000Z"),
          job_title_id: 4,
          email: "hr@mail.com",
          phone_number: faker.phone.number(),
        },
      ]
    );
    return queryInterface.bulkInsert("employees", data, {});
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
