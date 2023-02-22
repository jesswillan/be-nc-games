const express = require('express');
const app = express();
const {getCategories} = require('./controllers/categories-controller');
const {getReviews, getReviewById} = require('./controllers/reviews-controller');
const {
  handle500Statuses,
  handle404NonExistentPaths,
} = require('./controllers/error-handling-controller');

app.get(`/api/categories`, getCategories);

app.get(`/api/reviews`, getReviews);

app.get(`/api/reviews/:review_id`, getReviewById);

app.use(handle404NonExistentPaths);

app.use(handle500Statuses);

module.exports = app;
