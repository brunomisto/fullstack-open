const blogsRouter = require('express').Router();
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
    const randomUser = await User.findOne({});
    logger.info(randomUser);

    const blogObject = {
      ...request.body,
      user: randomUser.id,
    };
    logger.info(blogObject);

    const blog = new Blog(blogObject);
    logger.info(blog);

    const savedBlog = await blog.save();
    randomUser.blogs = randomUser.blogs.concat(savedBlog);
    await randomUser.save();

    response.status(201).json(savedBlog);
  } catch (error) {
    next(error);
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
