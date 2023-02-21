exports.handle500Statuses = (err, req, res, next) => {
  res.status(500).send({msg : 'We messed up, sorry (internal sesrver error'})
}