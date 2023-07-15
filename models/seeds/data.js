const seedUser = [
  {
    name: 'user1',
    email: 'user1@example.com',
    password: '12345678',
    userRecords: [0, 2, 4]
  },
  {
    name: 'user2',
    email: 'user2@example.com',
    password: '12345678',
    userRecords: [1, 3, 5]
  },
]

const seedRecord = [
  {
    name: '晚餐',
    date: '2023-07-01',
    amount: 100,
    category: '餐飲食品'
  },
  {
    name: '食材',
    date: '2023-07-02',
    amount: 200,
    category: '餐飲食品'
  },
  {
    name: '看電影',
    date: '2023-07-03',
    amount: 300,
    category: '休閒娛樂'
  },
  {
    name: '衛生紙',
    date: '2023-07-04',
    amount: 400,
    category: '家居物業'
  },
  {
    name: '火車',
    date: '2023-07-05',
    amount: 500,
    category: '交通出行'
  },
  {
    name: '紅包',
    date: '2023-07-06',
    amount: 600,
    category: '其他'
  },
]

module.exports = { seedUser, seedRecord }