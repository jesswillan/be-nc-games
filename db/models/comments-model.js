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

exports.insertComment = (username, body, review_id) => {
  return db.query(
    `INSERT INTO comments (author, body, review_id) 
    VALUES 
    ($1, $2, $3) RETURNING *;`, [username, body, review_id]
  )
  .then((res) => {
    console.log(res.rows[0], '<<res.rows')
    return res.rows[0];
  })
 
};
