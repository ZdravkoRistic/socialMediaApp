const {Router} = require("express")
const router = new Router()

router.get("/", require("../contoller/userContoler/getAllUsers"))

router.post("/add", require("../contoller/userContoler/addUsers"))

router.put("/update/:id/:name", require("../contoller/userContoler/updateUsers"))

module.exports = router;