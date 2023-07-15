const db = require('../../config/mongoose')
const Category = require('../category')
const SEED_CATEGORY = {
  家居物業: 'fa-house',
  交通出行: 'fa-van-shuttle',
  休閒娛樂: 'fa-face-grin-beam',
  餐飲食品: 'fa-utensils',
  其他: 'fa-pen',
}

const categories = []
for (const category in SEED_CATEGORY) {
  categories.push({
    name: category,
    icon: SEED_CATEGORY[category]
  })
}

db.once('open', async () => {
  try {
    await Promise.all(
      categories.map(async (category) => {
        await Category.create(category)
      })
    )
    console.log('done')
    process.exit()
  } catch (error) {
    console.error(error)
  }
})