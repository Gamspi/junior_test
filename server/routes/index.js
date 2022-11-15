const Router = require('express')
const router = new Router()
const likeRouter = require('./likeRouter')
const genreRouter = require('./genreRouter')

router.use('/genre', genreRouter)
router.use('/like', likeRouter)

module.exports = router
