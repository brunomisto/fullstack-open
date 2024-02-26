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

module.exports = { errorHandler };
