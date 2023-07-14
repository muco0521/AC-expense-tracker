const router = require('express').Router()

router.get('/', (req, res) => {
  return res.send('expense-tracker project.')
})

module.exports = router