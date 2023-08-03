const express = require('express');
const mongoose = require('mongoose');
const appRouter = require('./routes/index');
const HTTP_ERRORS = require('./errors/errorCodes');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: '64cb6b6c4bbadc7736d65718',
  };
  next();
});
app.use(appRouter);
app.use('/*', (req, res) => {
  res.status(HTTP_ERRORS.NOT_FOUND).send({ message: 'Задан некорректный URL' });
});

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.listen(PORT, () => {
});
