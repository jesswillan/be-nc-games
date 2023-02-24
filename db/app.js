const express = require('express');
const app = express();
const {getCategories} = require('./controllers/categories-controller');
const {getReviews, getReviewById} = require('./controllers/reviews-controller');
const {getCommentsByReviewId, postComment} = require('./controllers/comments-controller');
const {updateVote} = require('./controllers/votes-controller')
const {
  handleInvalidPath,
  handlePSQLErrors,
  handleCustomErrors,
  handle500Statuses,
} = require('./controllers/error-handling-controller');

app.use(express.json())

app.get(`/api/categories`, getCategories);

app.get(`/api/reviews`, getReviews);

app.get(`/api/reviews/:review_id`, getReviewById);

app.get(`/api/reviews/:review_id/comments`, getCommentsByReviewId);

app.post(`/api/reviews/:review_id/comments`, postComment)

app.patch(`/api/reviews/:review_id`, updateVote)

app.all('*', handleInvalidPath);

app.use(handlePSQLErrors);

app.use(handleCustomErrors);

app.use(handle500Statuses);

module.exports = app;
