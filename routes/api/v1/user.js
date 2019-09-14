const router = require('express').Router()
const passport = require('passport')
const { createUser, updatePassword } = require('../../../controllers/userController')
const hasPermission = require('../../../middleware/hasPermission')

// API route '/api/v1/user'
router.route('/').post(createUser)

router.use(passport.authenticate('jwt', { session: false }))

// API route '/api/v1/user/{userId}/updatePassword'
router.route('/:userId/updatePassword').put(hasPermission, updatePassword)

module.exports = router
