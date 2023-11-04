const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  if (req.url === '/api/v1/users/login') {
    return next(); // Skip verification
  }
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split('Bearer')[1].trim();
  }
  // const token =
  //   req.headers.authorization &&
  //   req.headers.authorization.split('Bearer')[1].trim();

  if (!token) {
    return res
      .status(401)
      .json({ status: 'unauthenticated', message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ status: 'unauthenticated', error: err.message });
    }

    req.user_id = decoded.id;
    next();
  });
};
