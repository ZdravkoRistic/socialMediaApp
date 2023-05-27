const {Router} = require("express")
const verifyToken = require("../midleweare/verifyToken");
const router = new Router()

router.get("/", require("../controler/userControler/getAllUsers"))

router.post("/add", require("../controler/userControler/addUser"))

router.put("/update/:id", verifyToken, require("../controler/userControler/updateUser"))

module.exports = router
