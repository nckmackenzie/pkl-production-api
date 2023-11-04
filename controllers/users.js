const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catch-async');
const User = require('../models/user');
const AppError = require('../utils/AppError');

function signAndSend(user, res, status) {
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: 3600,
  });

  res.status(status || 200).json({ status: 'success', user, token });
}

const createUser = catchAsync(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    user_id: req.body.user_id,
    password: req.body.password,
    role: req.body.role,
  });

  res.status(201).json({ status: 'success', data: user });
});

const login = catchAsync(async (req, res, next) => {
  //   res.json({ message: req.body });
  if (!req.body.user_id || !req.body.password) {
    return next(new AppError('Provide both user id and password', 400));
  }

  const user = await User.findOne({
    attributes: ['id', 'user_id', 'name', 'role', 'password'],
    where: { user_id: req.body.user_id },
  });
  if (!user || !(await user.verifyPassword(req.body.password, user.password))) {
    return next(new AppError('Invalid user id or password', 401));
  }

  user.password = undefined; //exclude from response

  signAndSend(user, res, 200);
});

module.exports = { createUser, login };
