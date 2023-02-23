const {fetchCommentsByReviewId} = require('../models/comments-model');
const {fetchReviewById} = require('../models/reviews-model');

exports.getCommentsByReviewId = (req, res, next) => {
  const {review_id} = req.params;
  const promises = [
    fetchCommentsByReviewId(review_id),
    fetchReviewById(review_id),
  ];

  Promise.all(promises)
    .then(([comments]) => {
      res.status(200).send({comments});
    })
    .catch((err) => {
      next(err);
    });
};
