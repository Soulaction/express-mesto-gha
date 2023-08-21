const {
  celebrate,
  Joi,
} = require('celebrate');
const usersRouter = require('express')
  .Router();
const auth = require('../middlewares/auth');

const {
  getUsers,
  getUserById,
  updateProfileUser,
  updateAvatarUser,
  getUserInfo,
} = require('../controllers/users');

usersRouter.get('/me', auth, getUserInfo);
usersRouter.get('/', auth, getUsers);
usersRouter.get('/:userId', auth, celebrate({
  params: Joi.object()
    .keys({
      userId: Joi.string()
        .required()
        .length(24),
    }),
}), getUserById);
usersRouter.patch('/me', auth, celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string()
        .required()
        .min(2)
        .max(30),
      about: Joi.string()
        .required()
        .min(2)
        .max(30),
    }),
}), updateProfileUser);
usersRouter.patch('/me/avatar', auth, celebrate({
  body: Joi.object()
    .keys({
      avatar: Joi.string()
        .required()
        .pattern(/https?:\/\/(www.)?[-a-zA-Z0-9_~:/?#@!$&'()*,+;=]+\.[-a-zA-Z0-9_~:/?#@!$&'()*,+;=]+#?/),
    }),
}), updateAvatarUser);

module.exports = usersRouter;
