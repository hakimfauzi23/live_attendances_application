module.exports = (sequelize, DataTypes) => {
  const Setting = sequelize.define("setting", {
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    value: {
      type: DataTypes.STRING,
    },
    createdAt: {
      field: "created_at",
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      field: "updated_at",
      type: DataTypes.DATE,
      allowNull: false,
    },
  });
  return Setting;
};
