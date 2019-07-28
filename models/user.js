const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const saltRounds = 10;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})+$/,
            'Please fill a valid email address'
        ]
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
        required: true
    }
});

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.pre('save', function(next) {
    let user = this;

    if (!user.isModified('password')) return next();

    user.password = bcrypt.hashSync(
        user.password,
        bcrypt.genSaltSync(saltRounds),
        null
    );
    return next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
