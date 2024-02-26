const loginRouter = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const logger = require('../utils/logger');

loginRouter.post('/', async (request, response, next) => {
  try {
    logger.info(request.body);
    const { username, password } = request.body;
    const user = await User.findOne({ username });

    const passwordCorrect = user
      ? await bcrypt.compare(password, user.password)
      : false;

    if (!passwordCorrect || !user) {
      return response
        .status(400)
        .json({ error: 'invalid username/password' });
    }

    const token = jwt.sign({
      username: user.username,
      id: user.id,
    }, process.env.SECRET);

    return response.json({
      token,
      username: user.username,
      name: user.name,
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = loginRouter;
