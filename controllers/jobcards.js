const Jobcard = require('../models/jobcard');
const JobcardHour = require('../models/jobcardhour');
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

module.exports = { createJobcard };
