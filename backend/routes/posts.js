const { Router } = require("express");
const verifyToken = require("../midleweare/verifyToken");
const router = new Router();

//GET
router.get("/all", require("../controler/postControler/allPosts"));
router.get("/search", require("../controler/postControler/searchPost"));
router.get("/filter", require("../controler/postControler/filterPosts.js"));
router.get(
  "/singlePost/:id",
  require("../controler/postControler/getSinglePost")
);
router.get("/:userId", require("../controler/postControler/userPosts"));

//PUT
router.put(
  "/singlePost/:id",
  verifyToken,
  require("../controler/postControler/updatePost")
);

//POST
router.post('/add', verifyToken, require('../controler/postControler/addPost'))

//DELETE
router.delete(
  "/singlePost/:id",
  verifyToken,
  require("../controler/postControler/deletePost")
);

module.exports = router;
