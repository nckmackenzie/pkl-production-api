const dotenv = require('dotenv');

//uncaught exceptions
process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

// config env file
dotenv.config({ path: './config.env' });

const app = require('./app');

// const db = require('./utils/database');

//db connection
// db.authenticate()
//   .then(() => {
//     console.log('DB Connected');
//   })
//   .catch(err => {
//     console.error(`Error 💥: ${err.original.sqlMessage}`);
//     // throw new AppError(err.original.sqlMessage, 500);
//   });
// // console.error(`Error 💥: ${err.original.sqlMessage}`);

// db.sync().catch(err => {
//   console.error(err);
// });

//sync tables
const port = process.env.PORT || 8000;

// Listening
const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

//handle unhandled rejections
process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

//HANDLE SIGTERM FROM HEROKU
process.on('SIGTERM', () => {
  console.log('✋ SIGTERM RECEIVED: Shutting down gracefully');
  server.close(() => {
    console.log('💥 process terminated');
  });
});
