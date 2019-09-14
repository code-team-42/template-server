const passport = require('passport')
const jwt = require('jsonwebtoken')
const db = require('../models')

exports.createUser = (req, res, next) => {
  const { email, password } = req.body
  db.User.create({ email: email.toLowerCase(), password })
    .then(user => {
      res.json({ msg: 'User created', user })
    })
    .catch(next)
}

exports.updatePassword = (req, res, next) => {
  db.User.Update(
    { password: req.body.password },
    {
      where: {
        id: req.params.userId
      }
    }
  )
    .then(user => {
      res.json({ msg: `${user.email} password updated` })
    })
    .catch(next)
}

// Authenticates user using local strategy and assigns JWT token to cookie
exports.login = (req, res, next) => {
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
