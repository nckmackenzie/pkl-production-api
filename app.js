const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const hpp = require('hpp');
const cors = require('cors');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const userRoutes = require('./routes/user-routes');
const jobcardRoutes = require('./routes/jobcard');
const taskRoutes = require('./routes/task');
const generalRoutes = require('./routes/index');
const AppError = require('./utils/AppError');
const globalErrorHandler = require('./controllers/error-controller');
const verifyToken = require('./controllers/token-verify');

const app = express();

app.use(cors());

app.options('*', cors());

// Set security HTTP headers
app.use(helmet());

//limit no of requests
// Limit requests from same API
// const limiter = rateLimit({
//   max: 100,
//   windowMs: 60 * 60 * 1000,
//   message: 'Too many requests from this IP, please try again in an hour!',
// });
// app.use('/api', limiter);

//cookie parser
app.use(cookieParser());

// body parser
app.use(express.json());

// Data sanitization against XSS
// app.use(xss());

app.use(hpp());

app.use(compression());

app.use(verifyToken);

// routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/jobcards', jobcardRoutes);
app.use('/api/v1/tasks', taskRoutes);
app.use('/api/v1', generalRoutes);

//if no routes found
app.all('*', (req, res, next) => {
  next(new AppError(`No routes found for ${req.originalUrl}`, 404));
});

//global error handling middleware
app.use(globalErrorHandler);

module.exports = app;
