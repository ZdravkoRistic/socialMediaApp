const {Router} = require("express")
const verifyToken = require("../midleweare/verifyToken");
const router = new Router()

//GET
router.get("/all", require("../controler/postControler/allPosts"))
router.get("/search", require("../controler/postControler/searchPost"))

//DELETE
router.delete("/singlePost/:id", verifyToken, require("../controler/postControler/deletePost"))

module.exports = router
