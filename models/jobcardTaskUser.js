const { DataTypes } = require('sequelize');
const db = require('../utils/database');
const User = require('./user');
const Jobcardtask = require('./jobcardTask');

const Jobcardtaskuser = db.define(
  'Jobcardtaskuser',
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
    staff_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
      validate: {
        notNull: { msg: 'Select staff' },
      },
    },
  },
  {
    timestamps: false,
    tableName: 'jobcardtaskusers',
  }
);

module.exports = Jobcardtaskuser;
