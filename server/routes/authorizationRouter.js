const Router = require('express')
const { Authorization } = require('../controllers/controller')

const router = new Router()

router.post('/authorization', Authorization.auth)

module.exports = router
