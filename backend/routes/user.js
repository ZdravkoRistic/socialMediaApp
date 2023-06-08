const {Router} = require("express")
const verifyToken = require("../midleweare/verifyToken");
const router = new Router()

/***** GET *****/
router.get("/", require("../controler/userControler/getAllUsers"))
router.get("/:id", require("../controler/userControler/getSingleUser"))

/***** POST *****/
router.post("/add", require("../controler/userControler/addUser"))

/***** PUT *****/
// router.put("/update", verifyToken, require("../controler/userControler/updateUser"))
router.put("/update/:userId", verifyToken, require("../controler/userControler/updateUser"))

/***** DELETE *****/
router.delete("/delete/:userId", verifyToken, require("../controler/userControler/deleteUser"))

module.exports = router
