const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { token } = req.cookies;
  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401)
      .send({ message: 'Необходима авторизация' });
  }

  const tokenClean = token.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(tokenClean, 'some-secret-key');
  } catch (e) {
    return res.status(401)
      .send({ message: 'Необходима авторизация' });
  }

  req.user = payload;
  return next();
};
