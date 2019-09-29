// Add any other authorization methods other than local/jwt
const router = require('express').Router()
const { auth, local } = require('../../../controllers/authController')

// API route '/api/v1/auth/logout'
router.route('/logout').get(auth, (req, res) => {
  // use passport's built in logout method
  // req.logout()
  res.clearCookie('jwt', { httpOnly: true })
  res.redirect('/')
})

// API route '/api/v1/auth/login'
router.route('/login').post(local)

// API route '/api/v1/auth'
router.route('/').get(auth, (req, res) => {
  res.json(res.locals.user)
})

/* Routes for after Google authentication is enabled
// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve redirecting
//   the user to google.com.  After authorization, Google will redirect the user
//   back to this application at /auth/google/callback
router
  .route('/auth/google')
  .get(passport.authenticate('google', { scope: 'https://www.google.com/m8/feeds' }))

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router
  .route('/auth/google/callback')
  .get(passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
    res.redirect('/')
  })
*/

module.exports = router
