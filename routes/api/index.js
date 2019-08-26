const router = require('express').Router();
const userRoutes = require('./user');
const { login, logout, auth } = require('../../controllers/userController');
const passport = require('../../config/passport');

//API route '/api/login'
router
  .route('/login')
  .post(passport.authenticate('local', { session: false }), login);

//API route '/api/logout'
router
  .route('/logout')
  .post(passport.authenticate('jwt', { session: false }), logout);

//API route 'api/auth'
router
  .route('/auth')
  .get(passport.authenticate('jwt', { session: false }), auth);

router.use('/user', userRoutes);

module.exports = router;
