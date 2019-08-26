const router = require('express').Router();
const {
  createUser,
  updatePassword
} = require('../../controllers/userController');
const hasPermission = require('../../middleware/hasPermission');
const passport = require('passport');

//API route '/api/user'
router.route('/').post(createUser);

router.use(passport.authenticate('jwt', { session: false }));

//API route '/api/user/{userId}/updatePassword'
router.route('/:userId/updatePassword').put(hasPermission, updatePassword);

module.exports = router;
