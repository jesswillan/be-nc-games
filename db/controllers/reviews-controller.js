const {fetchReviews} = require('../reviews-model');

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
