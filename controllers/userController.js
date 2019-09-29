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
  db.User.update(
    { password: req.body.password },
    {
      where: {
        id: req.params.userId
      },
      individualHooks: true
    }
  )
    .then(updated => {
      if (!updated) return res.json({ msg: 'Password not updated' })
      return res.json({ msg: 'Password updated' })
    })
    .catch(next)
}
