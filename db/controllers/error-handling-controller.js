const {response} = require('../app');

exports.handle404NonExistentPaths = (req, res, next) => {
  res.status(404).send({msg: 'Path Not Found'});
};

exports.handle500Statuses = (err, req, res, next) => {
  console.log(err, '<<500 err');
  res.status(500).send({msg: 'We messed up, sorry (internal sesrver error'});
};
