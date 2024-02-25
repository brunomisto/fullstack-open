const errorHandler = (error, request, response, next) => {
  response.status(400);
  response.json({ error: error.message });
};

module.exports = { errorHandler };
