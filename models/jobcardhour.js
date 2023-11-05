const { DataTypes } = require('sequelize');
const db = require('../utils/database');
const Jobcard = require('./jobcard');

const Jobcardhour = db.define(
  'Jobcardhour',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    jobcard_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Jobcard,
        key: 'id',
      },
    },
    yard: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    machinery: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    joinery: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    carving: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    sanding: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    polishing: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    upholstery: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    cnc: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    finishing: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    tableName: 'jobcardhours',
  }
);

// JobcardHour.belongsTo(Jobcard);

module.exports = Jobcardhour;
