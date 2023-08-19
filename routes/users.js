const { celebrate, Joi } = require('celebrate');
const usersRouter = require('express')
  .Router();
const auth = require('../middlewares/auth');

const {
  getUsers,
  getUserById,
  createUser,
  updateProfileUser,
  updateAvatarUser,
  login,
  getUserInfo,
} = require('../controllers/users');

usersRouter.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
usersRouter.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/(http|https):\/\/(www.)?[-a-zA-Z0-9._~:/?#@!$&'()*,+;=]+#?/),
  }),
}), createUser);
usersRouter.get('/me', auth, getUserInfo);
usersRouter.get('/', auth, getUsers);
usersRouter.get('/:userId', auth, getUserById);
usersRouter.patch('/me', auth, celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateProfileUser);
usersRouter.patch('/me/avatar', auth, celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(/(http|https):\/\/(www.)?[-a-zA-Z0-9._~:/?#@!$&'()*,+;[]=]+#?/),
  }),
}), updateAvatarUser);

module.exports = usersRouter;
