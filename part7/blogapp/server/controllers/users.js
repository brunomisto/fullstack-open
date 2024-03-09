const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

usersRouter.post("/", async (request, response, next) => {
  try {
    const { username, password, name } = request.body;

    if (password.length < 3) {
      response.status(400);
      response.json({ error: "password must be at least 3 characters long" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userToSave = new User({
      username,
      name,
      password: hashedPassword,
    });

    const savedUser = await userToSave.save();
    response.json(savedUser);
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    url: 1,
    title: 1,
    author: 1,
    id: 1,
  });
  response.json(users);
});

module.exports = usersRouter;
