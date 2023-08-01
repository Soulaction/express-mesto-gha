const User = require('../modals/users');
const HTTP_ERRORS = require('../errors/errorCodes');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch((err) => {
      res.status(HTTP_ERRORS.ERROR_SERVER)
        .send({ message: `Произошла ошибка на сервере: ${err.message}` });
    });
};

module.exports.getUserById = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (user) {
        res.send({ data: user });
        return;
      }
      res.status(HTTP_ERRORS.NOT_FOUND)
        .send({ message: 'Пользователь по указанному _id не найден' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(HTTP_ERRORS.ERROR_DATA)
          .send({ message: 'Некореетно переданный _id пользователя' });
        return;
      }
      res.status(HTTP_ERRORS.ERROR_SERVER)
        .send({ message: `Произошла ошибка на сервере: ${err.message}` });
    });
};

module.exports.createUser = (req, res) => {
  const {
    name,
    about,
    avatar,
  } = req.body;
  User.create({
    name,
    about,
    avatar,
  })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(HTTP_ERRORS.ERROR_DATA)
          .send({ message: 'Переданы некорректные данные при создании пользователя' });
        return;
      }
      res.status(HTTP_ERRORS.ERROR_SERVER)
        .send({ message: `Произошла ошибка на сервере: ${err.message}` });
    });
};

module.exports.updateProfileUser = (req, res) => {
  const {
    name,
    about,
  } = req.body;
  User.findByIdAndUpdate(req.user._id, {
    name,
    about,
  }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (user) {
        res.send({ data: user });
        return;
      }
      res.status(HTTP_ERRORS.NOT_FOUND)
        .send({ message: 'Пользователь по указанному _id не найден' });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(HTTP_ERRORS.ERROR_DATA)
          .send({ message: 'Переданы некорректные данные при создании пользователя' });
        return;
      }
      res.status(HTTP_ERRORS.ERROR_SERVER)
        .send({ message: `Произошла ошибка на сервере: ${err.message}` });
    });
};

module.exports.updateAvatarUser = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (user) {
        res.send({ data: user });
        return;
      }
      res.status(HTTP_ERRORS.NOT_FOUND)
        .send({ message: 'Пользователь по указанному _id не найден' });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(HTTP_ERRORS.ERROR_DATA)
          .send({ message: 'Переданы некорректные данные при создании пользователя' });
        return;
      }
      res.status(HTTP_ERRORS.ERROR_SERVER)
        .send({ message: `Произошла ошибка на сервере: ${err.message}` });
    });
};
