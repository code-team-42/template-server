const router = require('express').Router();
const {
    createUser,
    updatePassword
} = require('../../controllers/userController');
const hasPermission = require('../../middleware/hasPermission');

//API route '/api/user/{userId}/updatePassword'
router.route('/:userId/updatePassword').put(hasPermission, updatePassword);

//API route '/api/user'
router.route('/').post(createUser);

module.exports = router;
