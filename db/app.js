const express = require('express');
const app = express();
const {getCategories} = require('./controllers/categories-controller');
const { handle500Statuses } = require('./models/error-handling-controller');

app.get(`/api/categories`, getCategories);

app.use(handle500Statuses)

module.exports = app;
