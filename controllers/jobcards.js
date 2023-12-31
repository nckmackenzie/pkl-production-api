const { QueryTypes } = require('sequelize');
const Jobcard = require('../models/jobcard');
const JobcardHour = require('../models/jobcardhour');
// const Jobcardtask = require('../models/jobcardTask');
// const Jobcardtaskuser = require('../models/jobcardTaskUser');
// const Jobcardtasktime = require('../models/jobcardTaskTime');
const { getJobCardSql } = require('../models/raw_queries/jobcards');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catch-async');
const db = require('../utils/database');
const {
  filteredFields,
  replaceEmptyStringsWithNull,
} = require('../utils/utils');

const allowedFields = [
  'jobcard_no',
  'raised_date',
  'client',
  'sales_person',
  'subject',
  'value',
  'expected_end_date',
  'closed',
  'closed_date',
];

const createJobcard = catchAsync(async (req, res, next) => {
  const { details } = req.body;
  const { hours } = req.body;
  if (
    !details.jobcard_no ||
    !details.raised_date ||
    !details.client ||
    !details.sales_person
  ) {
    return next(new AppError('Provide all required fields', 400));
  }

  const formattedDetails = replaceEmptyStringsWithNull(details);
  const formattedHours = replaceEmptyStringsWithNull(hours);
  const cleanedHours = filteredFields(
    formattedHours,
    'yard',
    'joinery',
    'machinery',
    'carving',
    'sanding',
    'polishing',
    'upholstery',
    'cnc',
    'finishing'
  );

  const headerFiltered = filteredFields(
    { ...formattedDetails },
    'jobcard_no',
    'value',
    'raised_date',
    'client',
    'subject',
    'sales_person'
  );

  try {
    await db.transaction(async t => {
      const jobcard = await Jobcard.create(
        { ...headerFiltered },
        { transaction: t }
      );

      await JobcardHour.create(
        { jobcard_id: jobcard.id, ...cleanedHours },
        { transaction: t }
      );
      return jobcard;
    });

    res.status(201).json({ status: 'success' });
  } catch (error) {
    throw new AppError('Could not create jobcard', 500);
  }
});

const getJobCards = catchAsync(async (req, res, next) => {
  const jobcards = await db.query(getJobCardSql(), { type: QueryTypes.SELECT });
  res.status(200).json({ status: 'success', data: jobcards });
});

const getOpenJobCards = catchAsync(async (req, res, next) => {
  const jobcards = await Jobcard.findAll({
    where: { closed: false },
    order: [['jobcard_no', 'ASC']],
  });
  res.status(200).json({ status: 'success', data: jobcards });
});

module.exports = { createJobcard, getJobCards, getOpenJobCards };
