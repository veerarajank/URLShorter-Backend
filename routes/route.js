const router = require('express').Router()
const controller = require('../controllers/controller')
require('dotenv').config()

// route to the original url based on urlId
router.get('/:urlId', controller.routeOriginal)

// encode original url to short url
router.post('/encode', controller.convertOriginalToShort)

// decode short url to original url
router.post('/decode', controller.convertShortToOriginal)

module.exports = router
