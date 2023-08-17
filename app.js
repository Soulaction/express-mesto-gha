const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const appRouter = require('./routes/index');
const HTTP_ERRORS = require('./errors/errorCodes');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(appRouter);
app.use('/*', (req, res) => {
  res.status(HTTP_ERRORS.NOT_FOUND)
    .send({ message: 'Задан некорректный URL' });
});

app.use((err, req, res, next) => {
  const {
    statusCode = 500,
    message,
  } = err;

  res.status(statusCode)
    .send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });

  next();
});

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.listen(PORT, () => {
});
