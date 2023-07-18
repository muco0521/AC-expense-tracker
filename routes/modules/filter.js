const router = require('express').Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', (req, res) => {
  const userId = req.user._id
  const categoryId = req.query.sort
 
  Category.find()
    .lean()
    .then((categories) => 
     Record.find({ userId, categoryId })
      .populate('categoryId')
      .lean()
      .then((records) => {
        let totalAmount = 0
        records.map((record) => {
          totalAmount += record.amount
          record.date = new Date(record.date).toISOString().slice(0, 10)
        })
        return res.render('index', { records, categories, totalAmount })
      })
      .catch((e) => console.log(e))
    )
})

module.exports = router