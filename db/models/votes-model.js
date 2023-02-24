const db = require('../connection');

exports.changeVote = (newVotes, review_id) => {
  return db
    .query(
      `UPDATE reviews
    SET votes = votes + $1
    WHERE review_id = $2
    RETURNING *;`,
      [newVotes, review_id]
    )
    .then((res) => {
      return res.rows[0];
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};
