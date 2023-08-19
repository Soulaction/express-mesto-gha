const cardsRouter = require('express')
  .Router();
const {
  celebrate,
  Joi,
} = require('celebrate');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardsRouter.get('/', getCards);
cardsRouter.post('/', celebrate({
  params: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    avatar: Joi.string().required().pattern(/(http|https):\/\/(www.)?[-a-zA-Z0-9._~:/?#@!$&'()*,+;[]=]+#?/),
  }),
}), createCard);
cardsRouter.delete('/:cardId', deleteCard);
cardsRouter.put('/:cardId/likes', likeCard);
cardsRouter.delete('/:cardId/likes', dislikeCard);

module.exports = cardsRouter;
