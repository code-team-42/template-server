const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy

const db = require('../models')

passport.use(
  'local',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false
    },
    (email, password, done) => {
      email = email.toLowerCase()
      console.log(email, password)
      db.User.findOne({ where: { email } })
        .then(user => {
          if (!user) {
            return done(null, false, {
              message: 'Incorrect email.'
            })
          }
          if (!user.validPassword(password)) {
            return done(null, false, {
              message: 'Incorrect password.'
            })
          }
          return done(null, user)
        })
        .catch(err => done(err))
    }
  )
)

const opts = {
  jwtFromRequest: req => {
    let token = null
    if (req && req.cookies) {
      token = req.cookies.jwt
    }
    return token
  },
  secretOrKey: process.env.AUTH_SECRET
}
passport.use(
  'jwt',
  new JwtStrategy(opts, (token, done) => {
    console.log(token)
    return done(null, token)
  })
)

module.exports = passport
