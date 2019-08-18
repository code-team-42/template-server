const db = require('../models');
const passport = require('passport');
const jwt = require('jsonwebtoken');

exports.createUser = (req, res, next) => {
    let { email, password } = req.body;
    email = email.toLowerCase();
    db.User.create({ email, password })
        .then(user => {
            console.log(user);
            res.json({ msg: 'User created' });
        })
        .catch(next);
};

exports.updatePassword = (req, res, next) => {
    db.User.findById(req.params.userId)
        .then(user => {
            user.password = req.body.password;
            return user.save();
        })
        .then(user => {
            res.json({ msg: 'Password changed' });
        })
        .catch(next);
};

exports.signIn = (req, res, next) => {
    passport.authenticate('local', (err, user) => {
        if (err || !user) {
            return res.status(401).json({ msg: 'Failed to sign in' });
        }
        const { id, email, role } = user;
        const token = jwt.sign(
            { user: { id, email }, role },
            process.env.AUTH_SECRET,
            {
                expiresIn: 10
            }
        );
        res.cookie('jwt', token, { httpOnly: true });
        return res.json({ user: { id, email }, role });
    })(req, res, next);
};

exports.signOut = (req, res, next) => {
    res.json({ msg: 'Signed out' });
};

exports.auth = (req, res, next) => {
    res.json(req.user);
};
