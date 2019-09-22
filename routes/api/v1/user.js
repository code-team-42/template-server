const router = require('express').Router()
const { createUser, updatePassword } = require('../../../controllers/userController')
const { auth } = require('../../../controllers/authController')
const hasPermission = require('../../../middleware/hasPermission')

// API route '/api/v1/user'
router.route('/').post(createUser)

router.use(auth)

// API route '/api/v1/user/{userId}/updatePassword'
router.route('/:userId/updatePassword').put(hasPermission, updatePassword)

module.exports = router
