const { DataTypes } = require('sequelize');
const db = require('../utils/database');
const Jobcardtask = require('./jobcardTask');

const Jobcardtasktime = db.define(
  'Jobcardtasktime',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    task_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Jobcardtask,
        key: 'id',
      },
      validate: {
        notNull: { msg: 'Select task' },
      },
    },
    paused_on: {
      type: DataTypes.DATE,
      timezone: false,
      allowNull: false,
      validate: {
        notNull: { msg: 'Select paused date' },
      },
    },
    resumed_on: {
      type: DataTypes.DATE,
      timezone: false,
      allowNull: true,
    },
    remarks: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    is_start: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: 'jobcardtasktimes',
    timestamps: false,
  }
);

module.exports = Jobcardtasktime;
