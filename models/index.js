'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Models
db.Division = require("../models/Division")(sequelize, Sequelize);
db.JobTitle = require("../models/JobTitle")(sequelize, Sequelize);
db.Employee = require("../models/Employee")(sequelize, Sequelize);
db.User = require("../models/User")(sequelize, Sequelize);
db.RefreshToken = require("../models/RefreshToken")(sequelize, Sequelize);
db.Setting = require("../models/Setting")(sequelize, Sequelize);
db.AbsenceData = require("../models/AbsenceData")(sequelize, Sequelize);


// Relations division -> job title
db.Division.hasMany(db.JobTitle, { as: "jobTitles" });
db.JobTitle.belongsTo(db.Division, {
  foreignKey: "division_id",
  as: "division",
});

// Relations job title -> employee
db.JobTitle.hasMany(db.Employee, { as: "employees" });
db.Employee.belongsTo(db.JobTitle, {
  foreignKey: "job_title_id",
  as: "jobTitles",
});

// Relations employee -> user
db.Employee.hasMany(db.User, { as: "employee_data" });
db.User.belongsTo(db.Employee, {
  foreignKey: "employee_id",
  as: "employee",
});

// Relations employee -> user
db.User.hasMany(db.AbsenceData, { as: "user_data" });
db.AbsenceData.belongsTo(db.User, {
  foreignKey: "user_id",
  as: "user",
});

module.exports = db;
