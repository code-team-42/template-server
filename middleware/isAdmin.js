module.exports = function(req, res, next) {
  if (res.locals.user.role === 'admin') {
    return next()
  }
  return res.status(403).json({ msg: 'You do not have authorization for this action' })
}
