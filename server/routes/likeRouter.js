const Router = require('express')
const { LikeController } = require('../controllers/controller')

const router = new Router()

router.post('/like', LikeController.handelLike)

module.exports = router
