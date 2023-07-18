const router = require('express').Router()
const home = require('./modules/home')
const users = require('./modules/users')
const records = require('./modules/records')
const filter = require('./modules/filter')
const { authenticator } = require('../middleware/auth')

router.use('/users', users)
router.use('/records', authenticator, records)
router.use('/filter', authenticator, filter)
router.use('/', authenticator, home)

module.exports = router