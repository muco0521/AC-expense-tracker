const router = require('express').Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const { recordValidator } = require('../../middleware/validator')

router.get('/new', (req, res) => {
  Category.find()
    .lean()
    .then((categories) => res.render('new', { categories }))
    .catch((e) => console.log(e))
})

router.get('/edit/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Record.findOne({ _id, userId })
    .lean()
    .then((record) => {
      record.date = new Date(record.date).toISOString().slice(0, 10)
      Category.find()
        .lean()
        .then((categories) => {
          const category = categories.find((category) => {
            return (category._id.toString() === record.categoryId.toString())
          })
          res.render('edit', { record, categories, category })
        })
        .catch((e) => console.log(e))
    })
    .catch((e) => console.log(e))
})

router.post('/', recordValidator, (req, res) => {
  const userId = req.user._id
  const newRecord = req.body
  newRecord.userId = userId
  return Record.create(newRecord)
    .then(() => {
      req.flash('success_msg', 'Your expenses create completed.')
      res.redirect('/')
    })
    .catch((e) => console.log(e))
})

router.put('/:id', recordValidator, (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Record.findOne({ _id, userId })
    .then((record) => {
      Object.assign(record, req.body)
      return record.save()
    })
    .then(() => {
      req.flash('success_msg', 'Your expenses update completed.')
      res.redirect('/')
    })
    .catch((e) => console.log(e))
})

router.delete('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Record.findOne({ _id, userId })
    .then((record) => record.deleteOne())
    .then(() => res.redirect('/'))
    .catch((e) => console.log(e))
})

module.exports = router