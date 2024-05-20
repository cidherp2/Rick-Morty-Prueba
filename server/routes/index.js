const router = require("express").Router()
const apiRoutes = require("./api")

router.use('/exam/api',apiRoutes)

module.exports = router
