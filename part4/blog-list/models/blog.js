const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

blogSchema.set('toJSON', {
  transform: (document, returnObject) => {
    const transformedObject = { ...returnObject };
    delete transformedObject._id;
    delete transformedObject.__v;
    return transformedObject;
  },
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
