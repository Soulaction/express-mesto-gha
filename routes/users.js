const usersRouter = require('express')
  .Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateProfileUser,
  updateAvatarUser,
} = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/:userId', getUserById);
usersRouter.post('/', createUser);
usersRouter.patch('/me', updateProfileUser);
usersRouter.patch('/me/avatar', updateAvatarUser);

module.exports = usersRouter;
