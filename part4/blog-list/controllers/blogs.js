const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');

const Blog = require('../models/blog');
const User = require('../models/user');

// const logger = require('../utils/logger');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  });
  response.json(blogs);
});

blogsRouter.post('/', async (request, response, next) => {
  try {
    const { token } = request;
    if (!token) {
      return response
        .status(400)
        .json({ error: 'missing authorization header' });
    }

    const userToken = jwt.verify(token, process.env.SECRET);
    if (!userToken) {
      return response
        .status(400)
        .json({ error: 'failed authentication' });
    }

    const user = await User.findById(userToken.id);

    const blogObject = {
      ...request.body,
      user: user.id,
    };

    const blog = new Blog(blogObject);

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog);
    await user.save();

    return response.status(201).json(savedBlog);
  } catch (error) {
    return next(error);
  }
});

blogsRouter.delete('/:id', async (request, response) => {
  const deletedNote = await Blog.findByIdAndDelete(request.params.id);
  response.json(deletedNote);
});

blogsRouter.put('/:id', async (request, response) => {
  const newBlog = request.body;
  const { id } = request.params;
  const updatedBlog = await Blog.findByIdAndUpdate(id, newBlog, { new: true });
  response.json(updatedBlog);
});

module.exports = blogsRouter;
