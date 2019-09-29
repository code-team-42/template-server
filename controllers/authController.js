const passport = require('passport')
const jwt = require('jsonwebtoken')

// Verifies if a user it authenticated using passport's built in method
// eslint-disable-next-line no-unused-vars
// exports.auth = (req, res, next) => {
//   if (req.isAuthenticated()) return next()
//   return res.status(401).send({ msg: 'Not authorized' })
// }

// Authenticates user using passport local strategy and assigns JWT to cookie
exports.local = (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err || !user) {
      return res.status(401).json({ msg: 'Failed to sign in' })
    }
    const { id, email, role } = user
    const token = jwt.sign({ user: { id, email }, role }, process.env.AUTH_SECRET)
    res.cookie('jwt', token, { httpOnly: true })
    return res.json({ user: { id, email }, role })
  })(req, res, next)
}

// Authenticates user using passport JWT and adds the decoded token to the res.locals.payload for use in middleware
exports.auth = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({ msg: 'Failed ' })
    }
    res.locals.payload = user
    return next()
  })(req, res, next)
}
