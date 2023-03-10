const db = require('../connection');
const {fetchCategories} = require('../models/categories-model');

exports.fetchReviews = (category, sort_by) => {
  const validCategoriesPromise = fetchCategories();

  return validCategoriesPromise.then((validCategories) => {
    const categoryArr = validCategories.map((category) => category.slug);
    if (category !== undefined && !categoryArr.includes(category)) {
      return Promise.reject({status: 404, msg: 'Not Found'});
    }
    let queryString = `SELECT reviews.owner, reviews.title, reviews.review_id, reviews.category, reviews.review_img_url, reviews.created_at, reviews.votes, reviews.designer, CAST(COUNT(comments.review_id) AS INT) AS comment_count
        FROM reviews
        LEFT JOIN comments
        ON reviews.review_id = comments.review_id`;
    const queryParams = [];

    if (category !== undefined) {
      queryString += ` WHERE category = $1`;
      queryParams.push(category);
    }
    if (sort_by === undefined) {
      queryString += ` GROUP BY reviews.review_id ORDER BY reviews.created_at DESC;`;
    }

    return db.query(queryString, queryParams).then((res) => {
      return res.rows;
    });
  });
};

exports.fetchReviewById = (review_id) => {
  return db
    .query(`SELECT * FROM reviews WHERE review_id = $1`, [review_id])
    .then((res) => {
      if (res.rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: 'Not Found',
        });
      }
      return res.rows[0];
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};
