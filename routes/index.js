const router = require('express').Router();
const {
  celebrate,
  Joi,
} = require('celebrate');
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const auth = require('../middlewares/auth');
const {
  login,
  createUser,
} = require('../controllers/users');

router.use('/users', usersRouter);
router.use('/cards', auth, cardsRouter);
router.post('/signin', celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string()
        .required()
        .email(),
      password: Joi.string()
        .required(),
    }),
}), login);
router.post('/signup', celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string()
        .required()
        .email(),
      password: Joi.string()
        .required(),
      name: Joi.string()
        .min(2)
        .max(30),
      about: Joi.string()
        .min(2)
        .max(30),
      avatar: Joi.string()
        .pattern(/(http|https):\/\/(www.)?[-a-zA-Z0-9._~:/?#@!$&'()*,+;=]+#?/),
    }),
}), createUser);

module.exports = router;
