const { Router } = require("express");
const verifyToken = require("../midleweare/verifyToken");
const router = new Router();

router.get("/", require("../controler/tagControler/allTags.js"));

module.exports = router;
