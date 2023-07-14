const router = require('express').Router()
const bcrypt = require('bcryptjs')
const passport = require('passport')
const User = require('../../models/user')


router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: 'login'
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: 'All fields are required.' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: 'Password and confirmPassword must be the same.' })
  }
  if (errors.length) {
    return res.render('register', { errors, ...req.body})
  }

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
        .then(() => res.redirect('/'))
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