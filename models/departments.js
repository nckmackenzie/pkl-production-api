const { DataTypes } = require('sequelize');
const db = require('../utils/database');

const Department = db.define(
  'Department',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    production_flow: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: 'departments',
    timestamps: false,
  }
);

module.exports = Department;
