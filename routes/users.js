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

usersRouter.post('/signin', login);
usersRouter.post('/signup', createUser);
usersRouter.get('/me', auth, getUserInfo);
usersRouter.get('/', auth, getUsers);
usersRouter.get('/:userId', auth, getUserById);
usersRouter.post('/', auth, createUser);
usersRouter.patch('/me', auth, updateProfileUser);
usersRouter.patch('/me/avatar', auth, updateAvatarUser);

module.exports = usersRouter;
