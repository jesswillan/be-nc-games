const express = require('express');
const app = express();
const {getCategories} = require('./controllers/categories-controller');

app.get(`/api/categories`, getCategories);

module.exports = app;
