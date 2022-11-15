const Router = require('express')
const router = new Router()
const likeRouter = require('./likeRouter')
const genreRouter = require('./genreRouter')
const authorizationRouter = require('./authorizationRouter')

router.use('/genre', genreRouter)
router.use('/like', likeRouter)
router.use('/auth', authorizationRouter)

module.exports = router
