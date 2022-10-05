module.exports = (sequelize, DataTypes) => {
  const AbsenceData = sequelize.define(
    "AbsenceData",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: sequelize.NOW,
      },
      clock_in: {
        type: DataTypes.TIME,
        allowNull: true,
      },
      clock_out: {
        type: DataTypes.TIME,
        allowNull: true,
      },
      coordinate_clock_in: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      coordinate_clock_out: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      clock_in_status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      clock_out_status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "absences_data",
      timestamps: false,
    }
  );

  return AbsenceData;
};
