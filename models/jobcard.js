const { DataTypes } = require('sequelize');
const db = require('../utils/database');
// const Jobcardhour = require('./jobcardhour');

const Jobcard = db.define(
  'Jobcard',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    jobcard_no: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: 'job card no is required',
        },
      },
    },
    raised_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Date created is required',
        },
      },
    },
    client: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Client is required' },
      },
    },
    sales_person: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Sales person is required' },
      },
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Subject is required' },
      },
    },
    value: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      allowNull: true,
      validate: {
        min: 0,
      },
    },
    expected_end_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    closed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    closed_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
    tableName: 'jobcards',
  }
);

// Jobcard.hasMany(Jobcardhour, { foreignKey: 'jobcard_id', onDelete: 'CASCADE' });

module.exports = Jobcard;
