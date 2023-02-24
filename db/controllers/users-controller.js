const {fetchUsers} = require('../models/users-model');

exports.getUsers = (req, res, next) => {
  const body = req.body;
  fetchUsers(body)
    .then((users) => {
      res.status(200).send({users});
    })
    .catch((err) => {
      next(err);
    });
};
