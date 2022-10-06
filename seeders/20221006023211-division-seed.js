"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "divisions",
      [
        {
          name: "HUMAN CAPITAL AND GERNERAL AFFAIR",
          description: "For human resource business and development",
        },
        {
          name: "IT DEVELOPMENT",
          description: "Core of this company, many great development are here.",
        },
        {
          name: "IT INFRASTRUCTURE",
          description: "Provides mans infrastructure",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("divisions", null, {});
  },
};
