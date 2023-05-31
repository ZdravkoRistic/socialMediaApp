const {Router} = require("express")
const verifyToken = require("../midleweare/verifyToken");
const router = new Router()



router.delete("/:id",verifyToken, require("../controler/commentController/deleteCommentController"))

module.exports = router