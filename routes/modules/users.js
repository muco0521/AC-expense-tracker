const router = require('express').Router()
const bcrypt = require('bcryptjs')
const passport = require('passport')
const User = require('../../models/user')
const { userValidator } = require('../../middleware/validator')


router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: 'login',
  failureFlash: true
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', userValidator, (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []

  User.findOne({ email })
    .then(user => {
      if (user) {
        errors.push({ message: 'This Email already exist.'})
        return res.render('register', { errors, ...req.body })
      }

      return bcrypt
        .genSalt(10)
        .then((salt) => bcrypt.hash(password, salt))
        .then((hash) =>
          User.create({
            name,
            email,
            password: hash
          })
        )
        .then(() => {
          req.flash('success_msg', 'Registration success!')
          res.redirect('/users/login')
        })
        .catch((e) => console.log(e))
    })
  .catch((e) => console.log(e))
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', 'Logout successfully!')
  res.redirect('/users/login')
})

module.exports = router