const express = require('express');
const app = express();
const {getCategories} = require('./controllers/categories-controller');
const {getReviews} = require('./controllers/reviews-controller');
const {
  handle500Statuses,
  handle404NonExistentPaths,
} = require('./models/error-handling-controller');

app.get(`/api/categories`, getCategories);

app.get(`/api/reviews`, getReviews);

app.use(handle404NonExistentPaths);

app.use(handle500Statuses);

module.exports = app;
