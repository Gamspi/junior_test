const Router = require('express')
const { Filter } = require('../controllers/controller')

const router = new Router()

router.post('/sounds', Filter.filter)

module.exports = router
