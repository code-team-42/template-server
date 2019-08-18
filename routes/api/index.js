const router = require('express').Router();
const userRoutes = require('./user');
const { signIn, signOut, auth } = require('../../controllers/userController');
const passport = require('../../config/passport');

//API route '/api/login'
router
    .route('/login')
    .post(passport.authenticate('local', { session: false }), signIn);

//API route '/api/logout'
router
    .route('/logout')
    .post(passport.authenticate('jwt', { session: false }), signOut);

//API route 'api/auth'
router
    .route('/auth')
    .get(passport.authenticate('jwt', { session: false }), auth);

router.use('/user', userRoutes);

module.exports = router;
