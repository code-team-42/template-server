const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const db = require('../models');

passport.use(
    'local',
    new LocalStrategy(
        {
            usernameField: 'email'
        },
        (email, password, done) => {
            email = email.toLowerCase();
            db.User.findOne({ email }).then(function(user) {
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

passport.serializeUser((user, cb) => {
    cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
    db.User.findById(id)
        .then(user => {
            cb(null, user);
        })
        .catch(err => {
            cb(err, null);
        });
});

module.exports = passport;
