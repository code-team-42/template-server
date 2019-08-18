const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const jwt = require('jsonwebtoken');

const db = require('../models');

passport.use(
    'local',
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            session: false
        },
        (email, password, done) => {
            email = email.toLowerCase();
            db.User.findOne({ email }).then(user => {
                if (!user) {
                    return done(null, false, {
                        message: 'Incorrect email.'
                    });
                } else if (!user.validPassword(password)) {
                    return done(null, false, {
                        message: 'Incorrect password.'
                    });
                }
                return done(null, user);
            });
        }
    )
);

const opts = {
    jwtFromRequest: req => {
        let token = null;
        if (req && req.cookies) {
            token = req.cookies['jwt'];
        }
        return token;
    },
    secretOrKey: process.env.AUTH_SECRET
};
passport.use(
    'jwt',
    new JwtStrategy(opts, (token, done) => {
        console.log(token);
        console.log(Math.floor(Date.now() / 1000));
        return done(null, token);
    })
);

module.exports = passport;
