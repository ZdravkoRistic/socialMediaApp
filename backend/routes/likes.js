const {Router} = require("express")
const verifyToken = require("../midleweare/verifyToken");
const addLike = require("../controler/likeControler/addLike");
const removeLike = require("../controler/likeControler/removeLike");
const router = new Router()

router.post("/addRemove/:postId", verifyToken, addLike, removeLike)

module.exports = router