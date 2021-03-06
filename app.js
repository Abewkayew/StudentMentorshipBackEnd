let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cors = require('cors');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
const studentRouter = require('./routes/student.route');
const blogRouter = require('./routes/blog.route');
const teacherRouter = require('./routes/teacher.route');
const evaluatorRouter = require('./routes/evaluator.route');
const supervisorRouter = require('./routes/supervisor.route');
const logRouter = require('./routes/log.route');
const reportRouter = require('./routes/report.route');
const commentRouter = require('./routes/comment.route');

let app = express();

mongoose.Promise = global.Promise;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.DB, { useNewUrlParser: true }).then(
    () => {
      console.log("Database is connected");
    },
    err => {
      console.log("Can not connect to the database" + err);
    }
);
// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/student', studentRouter);
app.use('/blog', blogRouter);
app.use('/teacher', teacherRouter);
app.use('/evaluator', evaluatorRouter);
app.use('/supervisor', supervisorRouter);
app.use('/log', logRouter);
app.use('/report', reportRouter);
app.use('/comment', commentRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
