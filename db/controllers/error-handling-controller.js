exports.handleInvalidPath = (req, res) => {
  console.log('404 Error');
  res.status(404).send({msg: 'Not Found'});
};

exports.handlePSQLErrors = (err, req, res, next) => {
  if (err.code === '22P02') {
    res.status(400).send({msg: 'Bad Request'});
  }
  if (err.code === '23503') {
    res.status(404).send({msg: 'Not Found'});
  }
  if (err.code === '23502') {
    res.status(400).send({msg: 'Bad Request'});
  }
  next(err);
};

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.msg) {
    console.log(err, '<<< Custom Error');
    res.status(err.status).send({msg: err.msg});
  } else {
    next(err);
  }
};

exports.handle500Statuses = (err, req, res, next) => {
  console.log(err, '<<< 500 Error');
  res.status(500).send({msg: 'Server Error'});
};
