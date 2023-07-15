const router = require('express').Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/new', (req, res) => {
  Category.find()
    .lean()
    .then((categories) => res.render('new', { categories }))
    .catch((e) => console.log(e))
})


router.post('/', (req, res) => {
  const userId = req.user._id
  const newRecord = req.body
  newRecord.userId = userId
  return Record.create(newRecord)
    .then(() => res.redirect('/'))
    .catch((e) => console.log(e))
})

module.exports = router