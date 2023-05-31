const express = require("express")
const router = new express.Router()

router.use("/user", require("./user"))
router.use("/auth", require("./auth"))
router.use("/posts", require("./posts"))
router.use("/likes", require("./likes"))
router.use("/tags", require("./tags"))
router.use("/comments", require("./comments"))



module.exports = router