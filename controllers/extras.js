const Department = require('../models/departments');
const User = require('../models/user');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catch-async');

exports.getDepartments = catchAsync(async (req, res, next) => {
  const departments = await Department.findAll({
    attributes: ['id', 'name', 'production_flow'],
  });
  res.status(200).json({ status: 'success', data: departments });
});

exports.getStaff = catchAsync(async (req, res, next) => {
  const { deptId } = req.params;

  if (!deptId) return next(new AppError('Department not specified', 400));

  const users = await User.findAll({
    attributes: ['id', 'name', 'user_id', 'department_id', 'role'],
    where: { department_id: deptId },
    order: [['name', 'DESC']],
  });

  res.status(200).json({ status: 'success', data: users });
});
