const blogsRouter = require("express").Router();

const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });
  response.json(blogs);
});

blogsRouter.post("/", async (request, response, next) => {
  try {
    if (!request.user) {
      return response
        .status(400)
        .json({ error: "you need authentication to create blogs" });
    }

    const user = await User.findById(request.user.id);

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

blogsRouter.delete("/:id", async (request, response, next) => {
  if (request.user === null) {
    return response
      .status(401)
      .json({ error: "you need authentication to delete notes" });
  }

  try {
    const blog = await Blog.findById(request.params.id);

    if (!blog) {
      return response.status(400).json({ error: "blog not found" });
    }

    if (blog.user.toString() !== request.user.id) {
      return response.status(401).json({ error: "you're not the blog owner" });
    }

    const blogDeletion = await blog.deleteOne();
    return response.json(blogDeletion);
  } catch (error) {
    return next(error);
  }
});

blogsRouter.put("/:id", async (request, response) => {
  const newBlog = request.body;
  const { id } = request.params;
  const updatedBlog = await Blog.findByIdAndUpdate(id, newBlog, { new: true });
  response.json(updatedBlog);
});

blogsRouter.post("/:id/comments", async (request, response) => {
  const comment = request.body.content;
  const { id } = request.params;
  const blog = await Blog.findById(id);
  blog.comments = [...blog.comments, comment];
  blog.save();
  response.json(comment);
});

module.exports = blogsRouter;
