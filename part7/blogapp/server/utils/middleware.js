const jwt = require('jsonwebtoken');

// eslint-disable-next-line no-unused-vars
const errorHandler = (error, request, response, next) => {
  response.status(400).json({ error: error.message });
};

const tokenExtractor = (request, response, next) => {
  const header = request.get('Authorization');
  request.token = header
    ? header.replace('Bearer ', '')
    : null;
  next();
};

const userExtractor = (request, response, next) => {
  request.user = request.token
    ? jwt.verify(request.token, process.env.SECRET)
    : null;

  next();
};

module.exports = { errorHandler, tokenExtractor, userExtractor };
