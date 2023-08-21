const express = require('express');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const appRouter = require('./routes/index');
const handlerError = require('./middlewares/handler-errors');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});
app.use(express.json());
app.use(cookieParser());
app.use(appRouter);
app.use(errors());
app.use(handlerError);

app.listen(PORT, () => {
});
