"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {

    return queryInterface.bulkInsert(
      "settings",
      [
        {
          name: `Clock In`,
          description: `Time For Clock in start`,
          value: `08:00`,
        },
        {
          name: `Clock Out`,
          description: `Time For Clock out start`,
          value: `16:30`,
        },
        {
          name: `Memo`,
          description: `Text for displaying in the frontend page`,
          value: `Welcome to the wfa absence!`,
        },
        {
          name: `Company Logo`,
          description: `Url that logo img is saved`,
          value: `https://prokonbms.com/wp-content/uploads/2017/09/untuk-mitra-kami-shell.png`,
        },
      ],
      {}
    );
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
