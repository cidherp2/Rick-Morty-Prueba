const router = require("express").Router()
const user = require ("./userRoutes")
const favorites = require ("./favoriteRoutes")

router.use("/user",user)
router.use("/favorites",favorites)

module.exports = router