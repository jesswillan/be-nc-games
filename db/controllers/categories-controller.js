const {fetchCategories} = require('../models/categories-model');
exports.getCategories = (req, res, next) => {
  const body = req.body;
  fetchCategories(body)
    .then((categories) => {
      res.status(200).send({categories});
    })
    .catch((err) => {
      next(err);
    });
};
