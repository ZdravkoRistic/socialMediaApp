const {Router} = require("express")
const router = new Router()

router.post("/register", require("../controler/authControler/register"))
router.post("/login", require("../controler/authControler/login"))

module.exports = router