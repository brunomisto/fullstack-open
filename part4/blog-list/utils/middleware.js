// eslint-disable-next-line no-unused-vars
const errorHandler = (error, request, response, next) => {
  switch (error.name) {
    case 'ValidationError':
      return response
        .status(400)
        .json({ error: 'usernames must be at least 3 characters long' });

    case 'MongoServerError':
      return response
        .status(400)
        .json({ error: 'usernames must be unique' });

    default:
      return response.status(400).json({ error: error.message });
  }
};

const tokenExtractor = (request, response, next) => {
  const header = request.get('Authorization');
  request.token = header
    ? header.replace('Bearer ', '')
    : null;
  next();
};

module.exports = { errorHandler, tokenExtractor };
