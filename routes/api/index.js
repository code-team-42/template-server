const router = require('express').Router();
const userRoutes = require('./user');
const { signIn, signOut } = require('../../controllers/userController');
const passport = require('../../config/passport');
const isAuthenticated = require('../../middleware/isAuthenticated');

//API route '/api/signIn'
router.route('/signIn').post(passport.authenticate('local'), signIn);

//API route '/api/signOut'
router.route('/signOut').post(isAuthenticated, signOut);

router.use('/user', userRoutes);

module.exports = router;
