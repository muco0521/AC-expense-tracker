const bcrypt = require('bcryptjs')
const db = require('../../config/mongoose')
const User = require("../user")
const Record = require('../record')
const Category = require('../category')
const { seedUser, seedRecord } = require('./data')

db.once('open', async () => {
  try {
    await Promise.all(
      seedUser.map(async (user) => {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(user.password, salt)
        user.password = hash
        const createdUser = await User.create(user)
        
        const usersRecords = user.userRecords.map((elem) => {
          seedRecord[elem].userId = createdUser._id
          return seedRecord[elem]
        })
        
        const records = []
        for (const record of usersRecords) {
          const category = await Category.findOne({ name: record.category, }).lean()
          record.categoryId = category._id
          records.push(record)
        }
        await Record.create(records)
      })
    )
    console.log('record created!')
    process.exit()
  } catch (error) {
    console.error(error)
  }
})