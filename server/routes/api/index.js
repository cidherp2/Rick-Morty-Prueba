const router = require("express").Router()
const user = require ("./userRoutes")
const favorites = require ("./favoriteRoutes")
const tags = require ("./tagRoutes")

router.use("/user",user)
router.use("/favorites",favorites)
router.use("/tags", tags)

module.exports = router