module.exports = function(req, res, next) {
  if (
    res.locals.payload.user.id === parseInt(req.params.userId, 10) ||
    res.locals.payload.role === 'admin'
  ) {
    return next()
  }
  return res.status(403).json({ msg: 'You do not have authorization for this action' })
}
