const router = require('express').Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const category = require('../../models/category')

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
            if (category._id.toString() === record.categoryId.toString()) {
              return category
            }
          })
          res.render('edit', { record, categories, category })
        })
        .catch((e) => console.log(e))
    })
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

router.put('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  const editedRecord = req.body
  return Record.findOneAndUpdate({ _id, userId }, editedRecord)
    .then(() => res.redirect('/'))
    .catch((e) => console.log(e))
})

router.delete('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  console.log(_id)
  return Record.findOne({ _id, userId })
    .then((record) => record.deleteOne())
    .then(() => res.redirect('/'))
    .catch((e) => console.log(e))
})

module.exports = router