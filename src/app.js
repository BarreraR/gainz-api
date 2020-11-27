require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const errorHandler = require('./error-handler');
const validateBearerToken = require('./validate-bearer-token');
const recordsRouter = require('./records/records-router');
const routinesRouter = require('./routines/routines-router');
const exercisesRouter = require('./exercises/exercises-router');
const usersRouter = require('./users/users-router');
const authRouter = require('./auth/auth-router');


const app = express();

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());
// app.use(validateBearerToken);

app.use('/records', recordsRouter);
app.use('/routines', routinesRouter);
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);


app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// error handler middleware
app.use(errorHandler);

module.exports = app;