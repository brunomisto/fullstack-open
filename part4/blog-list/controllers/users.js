const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

usersRouter.post('/', async (request, response) => {
  const { username, password, name } = request.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const userToSave = new User({
    username,
    name,
    password: hashedPassword,
  });

  const savedUser = await userToSave.save();
  response.json(savedUser);
});

usersRouter.get('/', async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

module.exports = usersRouter;
