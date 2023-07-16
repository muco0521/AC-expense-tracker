const router = require('express').Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', (req, res) => {
  const userId = req.user._id
  Category.find({})
    .lean()
    .then((categories) => {
      Record.find({ userId })
        .populate('categoryId')
        .lean()
        .then((records) => {
          let totalAmount = 0
          records.map((record) => {
            totalAmount += record.amount
            record.date = new Date(record.date).toISOString().slice(0, 10)
          })
          res.render('index', { categories, records, totalAmount })
        })
        .catch((e) => console.log(e))
    })
})

module.exports = router