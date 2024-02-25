/* eslint-disable import/no-extraneous-dependencies */

const assert = require('node:assert');
const {
  test, beforeEach, after, describe,
} = require('node:test');

const supertest = require('supertest');
const mongoose = require('mongoose');

const Blog = require('../models/blog');
const app = require('../app');
const helper = require('./test_helper');
const logger = require('../utils/logger');

const api = supertest(app);

describe('blog api', () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    logger.info('deleted all blogs');
    await Blog.insertMany(helper.blogs);
    logger.info('inserted pre-defined blogs');
  });

  test('correct amount of blogs is returned in /api/blogs', async () => {
    const response = await api.get('/api/blogs');
    assert.strictEqual(response.body.length, helper.blogs.length);
  });

  test('unique indentifier is called id', async () => {
    const response = await api.get('/api/blogs');
    const [firstBlog] = response.body;
    assert(Object.prototype.hasOwnProperty.call(firstBlog, 'id'));
  });

  test('blog is added to database', async () => {
    const newBlog = {
      title: 'cool blog',
      author: 'bruno',
      url: 'https://coolblog.com',
      likes: 3,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/blogs');
    assert.strictEqual(response.body.length, helper.blogs.length + 1);

    const urls = response.body.map((blog) => blog.url);
    assert(urls.includes('https://coolblog.com'));
  });

  test('likes are defaulted to 0 when omitted', async () => {
    const newBlog = {
      title: 'cool blog',
      author: 'bruno',
      url: 'https://coolblog.com',
    };

    const response = await api
      .post('/api/blogs')
      .send(newBlog);

    assert.deepStrictEqual(response.body.likes, 0);
  });

  after(async () => {
    await mongoose.connection.close();
  });
});
