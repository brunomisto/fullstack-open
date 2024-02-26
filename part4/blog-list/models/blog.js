/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  url: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
});

blogSchema.set('toJSON', {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id;
    delete returnObject._id;
    delete returnObject.__v;
  },
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
