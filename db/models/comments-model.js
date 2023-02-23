const db = require('../connection');

exports.fetchCommentsByReviewId = (review_id) => {
  return db
    .query(
      `SELECT * FROM comments
    WHERE comments.review_id = $1;`,
      [review_id]
    )
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};
