const {fetchReviews, fetchReviewById} = require('../models/reviews-model');

exports.getReviews = (req, res, next) => {
  const body = req.body;
  fetchReviews(body)
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
      if (err.status === 404) {
        res.status(404).send({msg: err.msg})
      } else
      next(err);
    });
};
