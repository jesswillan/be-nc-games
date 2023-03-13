const express = require('express');
const app = express();
const cors = require('cors');
const {getCategories} = require('./db/controllers/categories-controller');
const {
  getReviews,
  getReviewById,
} = require('./db/controllers/reviews-controller');
const {
  getCommentsByReviewId,
  postComment,
} = require('./db/controllers/comments-controller');
const {updateVote} = require('./db/controllers/votes-controller');
const {getUsers} = require('./db/controllers/users-controller');
const {
  handleInvalidPath,
  handlePSQLErrors,
  handleCustomErrors,
  handle500Statuses,
} = require('./db/controllers/error-handling-controller');

app.use(express.json());

app.use(cors());

app.get(`/api/categories`, getCategories);

app.get(`/api/reviews`, getReviews);

app.get(`/api/reviews/:review_id`, getReviewById);

app.get(`/api/reviews/:review_id/comments`, getCommentsByReviewId);

app.post(`/api/reviews/:review_id/comments`, postComment);

app.patch(`/api/reviews/:review_id`, updateVote);

app.get(`/api/users`, getUsers);

app.all('*', handleInvalidPath);

app.use(handlePSQLErrors);

app.use(handleCustomErrors);

app.use(handle500Statuses);

module.exports = app;
