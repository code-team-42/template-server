const db = require('../models');
const passport = require('passport');
const jwt = require('jsonwebtoken');

exports.createUser = (req, res, next) => {
  let { email, password } = req.body;
  email = email.toLowerCase();
  db.User.create({ email, password })
    .then(user => {
      res.json({ msg: 'User created' });
    })
    .catch(next);
};

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
      res.json({ msg: 'Password changed' });
    })
    .catch(next);
};

exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err || !user) {
      return res.status(401).json({ msg: 'Failed to sign in' });
    }
    const { id, email, role } = user;
    const token = jwt.sign(
      { user: { id, email }, role },
      process.env.AUTH_SECRET
    );
    res.cookie('jwt', token, { httpOnly: true });
    return res.json({ user: { id, email }, role });
  })(req, res, next);
};

exports.logout = (req, res, next) => {
  res.json({ msg: 'Signed out' });
};

exports.auth = (req, res, next) => {
  res.json(req.user);
};
