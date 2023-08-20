const express = require('express');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const appRouter = require('./routes/index');
const HTTP_ERRORS = require('./errors/errorCodes');
const handlerError = require('./middlewares/handler-errors');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(appRouter);
app.use('/*', (req, res) => {
  res.status(HTTP_ERRORS.NOT_FOUND)
    .send({ message: 'Задан некорректный URL' });
});
app.use(errors());
app.use(handlerError);

app.listen(PORT, () => {
});
