const { DataTypes } = require('sequelize');
const db = require('../utils/database');
const Jobcard = require('./jobcard');
const Department = require('./departments');

const Jobcardtask = db.define(
  'Jobcardtask',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    jobcard_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Jobcard,
        key: 'id',
      },
      validate: {
        notNull: { msg: 'Jobcard is required' },
      },
    },
    department_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Department,
        key: 'id',
      },
      validate: {
        notNull: { msg: 'Department is required' },
      },
    },
    started: {
      type: DataTypes.DATE,
      timezone: false,
      allowNull: true,
    },
    ended: {
      type: DataTypes.DATE,
      timezone: false,
      allowNull: true,
    },
    hours_stopped: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    completed_on: {
      type: DataTypes.DATE,
      timezone: false,
      allowNull: true,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM,
      values: ['ongoing', 'paused', 'completed'],
      defaultValue: 'ongoing',
    },
    created_at: {
      type: DataTypes.DATE,
      timezone: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'jobcardtasks',
    timestamps: false,
  }
);

module.exports = Jobcardtask;
