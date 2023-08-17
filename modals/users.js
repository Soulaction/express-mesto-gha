const validator = require('validator');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const { Promise } = require('mongoose');
const AuthError = require('../errors/auth-error');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Не верный формат email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    required: true,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthError('Не правильный логин, либо пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new AuthError('Не правильный логин, либо пароль'));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
