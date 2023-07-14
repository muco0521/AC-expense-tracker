module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    console.log('please login first')
    res.redirect('/users/login')
  }
}