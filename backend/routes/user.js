const {Router} = require("express")
const verifyToken = require("../midleweare/verifyToken");
const router = new Router()

/***** GET *****/
router.get("/", require("../controler/userControler/getAllUsers"))

/***** POST *****/
router.post("/add", require("../controler/userControler/addUser"))

/***** PUT *****/
router.put("/update/:id", verifyToken, require("../controler/userControler/updateUser"))

/***** DELETE *****/

module.exports = router
