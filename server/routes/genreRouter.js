const Router = require('express')
const GenreController = require('../controllers/genreController')

const router = new Router()

router.get('/', GenreController.filter)

module.exports = router
