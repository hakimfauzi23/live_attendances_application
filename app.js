var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var divisionsRouter = require('./routes/divisions');
var jobTitlesRouter = require('./routes/job-titles');
var employeesRouter = require('./routes/employee');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/divisions', divisionsRouter);
app.use('/job-titles', jobTitlesRouter);
app.use('/employees', employeesRouter);
app.use('/users', usersRouter);

module.exports = app;
