const {changeVote} = require('../models/votes-model');

exports.updateVote = (req, res, next) => {
  const newVotes = req.body.inc_votes;
  const {review_id} = req.params;
  changeVote(newVotes, review_id).then((review) => {
    res.status(200).send({review})
  })
  .catch((err) => {
    next(err)
  });
}