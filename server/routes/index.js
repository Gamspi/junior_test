const Router = require('express')
const router = new Router()
const likeRouter = require('./likeRouter')
const genreRouter = require('./genreRouter')
const authorizationRouter = require('./authorizationRouter')
const filterRouter = require('./filterRouter')
const searchRouter = require('./searchRouter')

router.use('/genre', genreRouter)
router.use('/like', likeRouter)
router.use('/auth', authorizationRouter)
router.use('/filter', filterRouter)
router.use('/search', searchRouter)

module.exports = router
