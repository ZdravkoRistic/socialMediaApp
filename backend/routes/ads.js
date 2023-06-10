const {Router} = require("express")
const verifyToken = require("../midleweare/verifyToken");
const router = new Router()

/***** GET *****/
router.get("/", require("../controler/adsControler/getAllAds"))

/***** POST *****/
router.post("/add", verifyToken, require("../controler/adsControler/addAds"))
router.post("/paymentInit",verifyToken, require("../controler/adsControler/paymentInit"))
module.exports = router