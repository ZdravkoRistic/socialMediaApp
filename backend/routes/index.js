const express = require("express")
const router = new express.Router()

router.use("/user", require("./user"))
router.use("/auth", require("./auth"))

module.exports = router