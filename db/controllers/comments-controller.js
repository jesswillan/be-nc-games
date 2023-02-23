const {fetchCommentsByReviewId, insertComment} = require('../models/comments-model');
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

exports.postComment = (req, res, next) => {
  const {username, body} = req.body;
  const {review_id} = req.params;
  insertComment(username, body, review_id)
  .then((comment) => {
    console.log
    res.status(201).send({comment})
  })
  .catch((err) => {
    next(err)
  })
}