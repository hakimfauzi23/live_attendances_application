"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "job_titles",
      [
        {
          division_id: 2,
          name: "Backend Engineer",
          description: "Manage or create an API(s)",
        },
        {
          division_id: 2,
          name: "Frontend Engineer",
          description: "Slicing and convert into source code a mockup UI",
        },
        {
          division_id: 3,
          name: "DevOps Engineer",
          description: "Manage VPS, and Cloud, and make sure it safe to use",
        },
        {
          division_id: 1,
          name: "Human Capital",
          description:
            "Manage Human resource things such as salary and attendances",
        },
        {
          division_id: 1,
          name: "Talent Acquistion",
          description:
            "Find and recruiting new talent for good deeds of company",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("job_titles", null, {});
  },
};
