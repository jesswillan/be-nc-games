const express = require('express');
const app = express();
const {getCategories} = require('./controllers/categories-controller');
const {getReviews, getReviewById} = require('./controllers/reviews-controller');
const {
  handle500Statuses,
  handleInvalidPath,
  handleCustomErrors,
} = require('./controllers/error-handling-controller');

app.get(`/api/categories`, getCategories);

app.get(`/api/reviews`, getReviews);

app.get(`/api/reviews/:review_id`, getReviewById);

app.all('*', handleInvalidPath);

app.use(handleCustomErrors);

app.use(handle500Statuses);

module.exports = app;
