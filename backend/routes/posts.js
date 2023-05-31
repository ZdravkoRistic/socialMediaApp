const {Router} = require("express")
const verifyToken = require("../midleweare/verifyToken");
const router = new Router()

router.get("/all", require("../controler/postControler/allPosts"))

module.exports = router