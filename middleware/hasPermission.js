module.exports = function(req, res, next) {
  if (req.user.id === req.params.userId || req.user.role === 'admin') {
    return next()
  }
  return res.status(403).json({ msg: 'You do not have authorization for this action' })
}
