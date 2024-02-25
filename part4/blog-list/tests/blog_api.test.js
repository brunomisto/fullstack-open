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

  after(async () => {
    await mongoose.connection.close();
  });
});
