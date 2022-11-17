const Router = require('express')
const { DownloadFile } = require('../controllers/controller')

const router = new Router()

router.get('/download', DownloadFile.download)

module.exports = router
