const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const blogsRouter = require('./controllers/blogs');
const logger = require('./utils/logger');
const config = require('./utils/config');
const middleware = require('./utils/middleware');

mongoose.set('strictQuery', false);
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to db');
  });

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/blogs', blogsRouter);
app.use(middleware.errorHandler);

module.exports = app;
