const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');

const Blog = require('../models/blog');
const User = require('../models/user');

const logger = require('../utils/logger');

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

blogsRouter.delete('/:id', async (request, response, next) => {
  if (request.token === null) {
    return response
      .status(401)
      .json({ error: 'you need authentication to delete notes' });
  }

  try {
    const { userId } = jwt.verify(request.token, process.env.SECRET);
    const blog = await Blog.findById(request.params.id);

    if (!blog) {
      return response
        .status(400)
        .json({ error: 'blog not found' });
    }

    logger.info(blog);
    if (blog.user.toString() !== userId) {
      return response
        .status(401)
        .json({ error: 'you\'re not the blog owner' });
    }

    const deletedBlog = await blog.deleteOne();
    return response.json(deletedBlog);
  } catch (error) {
    return next(error);
  }
});

blogsRouter.put('/:id', async (request, response) => {
  const newBlog = request.body;
  const { id } = request.params;
  const updatedBlog = await Blog.findByIdAndUpdate(id, newBlog, { new: true });
  response.json(updatedBlog);
});

module.exports = blogsRouter;
