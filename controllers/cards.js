const Cards = require('../modals/cards');
const HTTP_ERRORS = require('../errors/errorCodes');

module.exports.getCards = (req, res) => {
  Cards.find({})
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch((err) => {
      res.status(HTTP_ERRORS.ERROR_SERVER)
        .send({ message: `Произошла ошибка на сервере: ${err.message}` });
    });
};

module.exports.createCard = (req, res) => {
  const {
    name,
    link,
  } = req.body;
  Cards.create({
    name,
    link,
    owner: req.user._id,
  })
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(HTTP_ERRORS.ERROR_DATA)
          .send({ message: 'Переданы некорректные данные при создании карточки' });
        return;
      }
      res.status(HTTP_ERRORS.ERROR_SERVER)
        .send({ message: `Произошла ошибка на сервере: ${err.message}` });
    });
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;
  Cards.findByIdAndRemove(cardId)
    .then((card) => {
      if (card) {
        res.send({ data: card });
        return;
      }
      res.status(HTTP_ERRORS.NOT_FOUND)
        .send({ message: 'Карточка с указанным _id не найдена.' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(HTTP_ERRORS.ERROR_DATA)
          .send({ message: 'Некореетно переданный _id карточки' });
        return;
      }
      res.status(HTTP_ERRORS.ERROR_SERVER)
        .send({ message: `Произошла ошибка на сервере: ${err.message}` });
    });
};

module.exports.likeCard = (req, res) => {
  const { cardId } = req.params;
  Cards.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((card) => {
      if (card) {
        res.send({ data: card });
        return;
      }
      res.status(HTTP_ERRORS.NOT_FOUND)
        .send({ message: 'Передан несуществующий _id карточки.' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(HTTP_ERRORS.ERROR_DATA)
          .send({ message: 'Некореетно переданный _id карточки' });
        return;
      }
      res.status(HTTP_ERRORS.ERROR_SERVER)
        .send({ message: `Произошла ошибка на сервере: ${err.message}` });
    });
};

module.exports.dislikeCard = (req, res) => {
  const { cardId } = req.params;
  Cards.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((card) => {
      if (card) {
        res.send({ data: card });
        return;
      }
      res.status(HTTP_ERRORS.NOT_FOUND)
        .send({ message: 'Передан несуществующий _id карточки.' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(HTTP_ERRORS.ERROR_DATA)
          .send({ message: 'Некореетно переданный _id карточки' });
        return;
      }
      res.status(HTTP_ERRORS.ERROR_SERVER)
        .send({ message: `Произошла ошибка на сервере: ${err.message}` });
    });
};
