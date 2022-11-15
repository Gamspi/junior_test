const Router = require('express')
const { GenreController } = require('../controllers/controller')

const router = new Router()

router.get('/', GenreController.filter)

module.exports = router
