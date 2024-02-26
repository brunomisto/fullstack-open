const assert = require('node:assert');
const {
  test, beforeEach, after, describe,
} = require('node:test');

const supertest = require('supertest');
const mongoose = require('mongoose');

const User = require('../models/user');
const app = require('../app');
const helper = require('./test_helper');

const api = supertest(app);

describe('user api', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    await Promise.all(helper.users.map((user) => (
      api
        .post('/api/users')
        .send(user)
    )));
  });

  test('correct amount of users is getting added', async () => {
    const response = await api.get('/api/users');
    assert.strictEqual(response.body.length, helper.users.length);
  });

  test('valid new users are created', async () => {
    await api
      .post('/api/users')
      .send({
        username: 'coolguy',
        password: '12345',
        name: 'Cool guy',
      })
      .expect(200);

    const response = await api.get('/api/users');
    assert.strictEqual(response.body.length, helper.users.length + 1);
  });

  test('invalid users are not created', async () => {
    let result;
    result = await api
      .post('/api/users')
      .send({
        username: 'fo',
        password: '12345',
        name: 'foo',
      })
      .expect(400);

    assert.strictEqual(result.body.error, 'usernames must be at least 3 characters long');

    result = await api
      .post('/api/users')
      .send({
        username: 'coolguy',
        password: '12',
        name: 'Cool guy',
      })
      .expect(400);

    assert.strictEqual(result.body.error, 'password must be at least 3 characters long');

    result = await api
      .post('/api/users')
      .send({
        username: 'bruno',
        password: '1234',
        name: 'Bruno',
      })
      .expect(400);

    assert.strictEqual(result.body.error, 'usernames must be unique');

    result = await api
      .get('/api/users')
      .expect(200);

    assert.strictEqual(result.body.length, helper.users.length);
  });

  after(async () => {
    await mongoose.connection.close();
  });
});
