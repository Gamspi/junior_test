const Router = require('express')
const { Search } = require('../controllers/controller')

const router = new Router()

router.post('/word', Search.find)

module.exports = router
