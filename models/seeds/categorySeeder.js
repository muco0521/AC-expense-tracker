const db = require('../../config/mongoose')
const Category = require('../category')
const SEED_CATEGORY = {
  家居物業: '<i class="fa-solid fa-house"></i>',
  交通出行: '<i class="fa-solid fa-van-shuttle"></i>',
  休閒娛樂: '<i class="fa-solid fa-face-grin-beam"></i>',
  餐飲食品: '<i class="fa-solid fa-utensils"></i>',
  其他: '<i class="fa-solid fa-pen"></i>',
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