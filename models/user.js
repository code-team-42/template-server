const bcrypt = require('bcrypt')

const saltRounds = 10

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: 'user'
      }
    },
    {
      underscored: true
    }
  )

  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password)
  }

  User.beforeSave(user => {
    if (!user.changed('password')) return
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(saltRounds), null)
  })

  // eslint-disable-next-line no-unused-vars
  User.associate = function(models) {}

  return User
}
