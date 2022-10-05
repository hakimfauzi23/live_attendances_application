"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "absences_data",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        date: {
          allowNull: false,
          type: Sequelize.DATEONLY,
          defaultValue: Sequelize.NOW,
        },
        clock_in: {
          allowNull: true,
          type: Sequelize.TIME,
        },
        clock_out: {
          allowNull: true,
          type: Sequelize.TIME,
        },
        coordinate_clock_in: {
          allowNull: true,
          type: Sequelize.STRING,
        },
        coordinate_clock_out: {
          allowNull: true,
          type: Sequelize.STRING,
        },
        clock_in_status: {
          allowNull: true,
          type: Sequelize.STRING,
        },
        clock_out_status: {
          allowNull: true,
          type: Sequelize.STRING,
        },
      },
      { timestamps: false }
    );

    await queryInterface.addConstraint("absences_data", {
      type: "foreign key",
      name: "ABSENCE_DATA_USER_ID",
      fields: ["user_id"],
      references: {
        table: "users",
        field: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("absences_data");
  },
};
