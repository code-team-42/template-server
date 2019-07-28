const db = require('../models');

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
    res.json({ msg: 'Signed in' });
};

exports.signOut = (req, res, next) => {
    req.logout();
    res.json({ msg: 'Signed out' });
};
