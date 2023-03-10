const {fetchReviews, fetchReviewById} = require('../models/reviews-model');
const {fetchCategories} = require('../models/categories-model');

exports.getReviews = (req, res, next) => {
  const {category} = req.query;

  fetchReviews(category)
    .then((reviews) => {
      res.status(200).send({reviews});
    })
    .catch((err) => {
      next(err);
    });
};

exports.getReviewById = (req, res, next) => {
  const {review_id} = req.params;
  fetchReviewById(review_id)
    .then((review) => {
      res.status(200).send({review});
    })
    .catch((err) => {
      next(err);
    });
};
