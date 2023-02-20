const db = require('../db/connection')

exports.fetchReviews = () => {
  return db.query(`SELECT * FROM reviews`).then((res) => {
    return res.rows
  })
}