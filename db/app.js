const express = require('express');
const app = express();
const {getCategories} = require('./controllers/categories-controller');
const {getReviews} = require('./reviews-controller')
const { handle500Statuses } = require('./models/error-handling-controller');

app.get(`/api/categories`, getCategories);

app.get(`/api/reviews`, getReviews)

app.use(handle500Statuses)

module.exports = app;
